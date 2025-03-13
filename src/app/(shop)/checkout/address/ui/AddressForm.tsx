'use client';

import { setUserAddress } from "@/actions/address/set-user-address";
import { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { delUserAddress } from "@/actions";

type FormInputs = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
    saveAddress: boolean;
}

interface Props {
    countries: Country[];
    userStoredAddress?: Partial<Address>;
}  

export const AddressForm = ({countries, userStoredAddress = {}}: Props) => {
    const router = useRouter();
    const setAddress = useAddressStore(state => state.setAddress);
    const address = useAddressStore(state => state.address);

    const {handleSubmit, register, formState: {isValid, errors}, reset} = useForm<FormInputs>({
        defaultValues: {
          ...(userStoredAddress as any),
          rememberAddress: false,
        },
        mode: "onBlur"
      });

    //   const {handleSubmit, register, formState: { isValid, errors }, reset} = useForm<FormInputs>({ mode: "onBlur" });


    useEffect(() => {
        if (address.firstName) {
          reset(address)
        }
      },[])
      
      const { data: session } = useSession({
        required: true,
      })
    
    const onSubmit = async( data: FormInputs ) => {
        setAddress(data);

        const {saveAddress, ...restAddress} = data;

        if (saveAddress) {
            await setUserAddress(restAddress, session!.user.id);
        } else {
            await delUserAddress(session!.user.id);
        }
    
        router.push('/checkout');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
            
            {/* Nombres */}
            <div className="flex flex-col mb-2">
                <span>Nombres</span>
                <input 
                    type="text" 
                    className={clsx(
                        "text-black p-2 border rounded-md bg-gray-50", 
                        { 'border-red-500': errors.firstName, 'border-green-600': !errors.firstName }
                    )}
                    {...register("firstName", { 
                        required: "El nombre es obligatorio",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                            message: "El nombre solo puede contener letras y espacios"
                        }
                    })}
                />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>

            {/* Apellidos */}
            <div className="flex flex-col mb-2">
                <span>Apellidos</span>
                <input 
                    type="text" 
                    className={clsx(
                        "text-black p-2 border rounded-md bg-gray-50", 
                        { 'border-red-500': errors.lastName, 'border-green-600': !errors.lastName }
                    )}
                    {...register("lastName", { 
                        required: "El apellido es obligatorio",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                            message: "El apellido solo puede contener letras y espacios"
                        }
                    })}
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>

            {/* Dirección */}
            <div className="flex flex-col mb-2">
                <span>Dirección</span>
                <input 
                    type="text" 
                    className={clsx("text-black p-2 border rounded-md bg-gray-50", 
                        { 'border-red-500': errors.address }
                    )}
                    {...register("address", { required: "La dirección es obligatoria" })}
                />
                {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>

            {/* Dirección 2 (opcional) */}
            <div className="flex flex-col mb-2">
                <span>Dirección 2 (opcional)</span>
                <input type="text" className="text-black p-2 border rounded-md bg-gray-50" {...register("address2")}/>
            </div>

            {/* Código postal */}
            <div className="flex flex-col mb-2">
                <span>Código postal</span>
                <input 
                    type="text" 
                    className={clsx("text-black p-2 border rounded-md bg-gray-50", 
                        { 'border-red-500': errors.zipCode }
                    )}
                    {...register("zipCode", { 
                        required: "El código postal es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El código postal debe contener solo números"
                        }
                    })}
                />
                {errors.zipCode && <span className="text-red-500 text-sm">{errors.zipCode.message}</span>}
            </div>

            {/* Ciudad */}
            <div className="flex flex-col mb-2">
                <span>Ciudad</span>
                <input 
                    type="text" 
                    className={clsx("text-black p-2 border rounded-md bg-gray-50", 
                        { 'border-red-500': errors.city }
                    )}
                    {...register("city", { 
                        required: "La ciudad es obligatoria",
                        pattern: {
                            value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                            message: "La ciudad solo puede contener letras y espacios"
                        }
                    })}
                />
                {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>

            {/* País */}
            <div className="flex flex-col mb-2">
                <span>País</span>
                <select 
                    className={clsx("text-black p-2 border rounded-md bg-gray-50", 
                        { 'border-red-500': errors.country }
                    )}
                    {...register("country", { required: "Debe seleccionar un país" })}
                >
                    <option value="">[ Seleccione ]</option>
                    {
                        countries.map(country => (
                            <option key={country.id} value={country.id}>{country.name}</option>
                        ))
                    }
                </select>
                {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col mb-2">
                <span>Teléfono</span>
                <input 
                    type="text" 
                    className={clsx("text-black p-2 border rounded-md bg-gray-50", 
                        { 'border-red-500': errors.phone }
                    )}
                    {...register("phone", { 
                        required: "El teléfono es obligatorio",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "El teléfono debe contener solo números"
                        }
                    })}
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>

            {/* Guardar dirección */}
            <div className="flex flex-col mb-2 sm:mt-1">
                <div className="inline-flex items-center mb-10">
                    <label className="relative flex cursor-pointer items-center rounded-full p-3" htmlFor="checkbox">
                        <input type="checkbox" id="checkbox" {...register("saveAddress")} />
                    </label>
                    <span>Guardar dirección</span>
                </div>

                <button type="submit" disabled={!isValid} className={clsx({
                    "btn-primary": isValid,
                    "btn-disabled": !isValid
                })}>
                    Siguiente
                </button>
            </div>
        </form>
    );
};
