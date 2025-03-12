'use client';

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';
import { login } from "@/actions";
import { registerUser } from "@/actions/auth/register";
import clsx from "clsx";

type FormInputs = {
    name: string;
    email: string;
    password: string;  
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { name, email, password } = data;

        // Server action
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLowerCase(), password);
        window.location.replace('/');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            
            {/* Nombre completo */}
            <label htmlFor="name">Nombre completo</label>
            <input
                className={clsx(
                    "text-black px-5 py-2 border bg-gray-50 border-gray-200 focus:outline-none rounded mb-1",
                    { 'border-red-500': errors.name }
                )}
                type="text"
                autoFocus 
                {...register('name', { required: "El nombre es obligatorio" })}
            />
            {errors.name && <span className="text-red-500 text-sm mb-2">{errors.name.message}</span>}

            {/* Correo electrónico */}
            <label htmlFor="email">Correo electrónico</label>
            <input
                className={clsx(
                    "text-black px-5 py-2 border bg-gray-50 border-gray-200 focus:outline-none rounded mb-1",
                    { 'border-red-500': errors.email }
                )}
                type="email"
                {...register('email', {
                    required: "El correo electrónico es obligatorio",
                    pattern: { value: /^\S+@\S+$/i, message: "Correo electrónico no válido" }
                })}
            />
            {errors.email && <span className="text-red-500 text-sm mb-2">{errors.email.message}</span>}

            {/* Contraseña */}
            <label htmlFor="password">Contraseña</label>
            <input
                className={clsx(
                    "text-black px-5 py-2 border bg-gray-50 border-gray-200 focus:outline-none rounded mb-1",
                    { 'border-red-500': errors.password }
                )}
                type="password"
                {...register('password', {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                })}
            />
            {errors.password && <span className="text-red-500 text-sm mb-2">{errors.password.message}</span>}

            {/* Mensaje de error general */}
            {errorMessage && <span className="text-red-500 text-sm my-2">{errorMessage}</span>}

            <button className="btn-primary">Crear cuenta</button>

            {/* Divisor */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/login" className="btn-secondary text-center">
                Ingresar
            </Link>
        </form>
    );
};
