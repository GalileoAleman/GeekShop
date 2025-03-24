"use client";

import { createUpdateProduct } from "@/actions";
import { Product, ProductImg } from "@/interfaces";
import { Category } from "@/interfaces/category.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
    product: Partial<Product> & {ProductImage?: ProductImg[]};
    categories: Category[];
}

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    inStock: number;
    tags: string;
    type: "anime" | "comic";
    categoryId: string;
    images?: FileList;
}

export const ProductAdminForm = ({product, categories}: Props) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: {isValid},
    } = useForm<FormInputs>({
            defaultValues: {
            ...product,
            tags: product.tags?.join(", "),
            images: undefined,
        },
    });

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData();
    
        const {images, ...productToSave} = data;

        if (product.id){
            formData.append("id", product.id ?? "");
        }
          
        formData.append("title", productToSave.title);
        formData.append("slug", productToSave.slug);
        formData.append("description", productToSave.description);
        formData.append("price", productToSave.price.toString());
        formData.append("inStock", productToSave.inStock.toString());
        formData.append("tags", productToSave.tags);
        formData.append("categoryId", productToSave.categoryId);
        formData.append("type", productToSave.type);
        
        if (images) {
            for (let i = 0; i < images.length; i++ ) {
                formData.append('images', images[i]);
            }
        }

        const {ok, product:updatedProduct} = await createUpdateProduct(formData);
    
        if (!ok) {
            alert('Producto no se pudo actualizar');
            return;
        }
    
        router.replace(`/admin/product/${updatedProduct?.slug}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md text-black bg-gray-50"
                    {...register("title", { required: true })}/>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md text-black bg-gray-50"
                    {...register("slug", { required: true })}/>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md text-black bg-gray-50"
                        {...register("description", { required: true })}></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Precio</span>
                    <input type="number" className="p-2 border rounded-md text-black bg-gray-50" 
                    {...register("price", { required: true, min: 0 })}/>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Stock</span>
                    <input type="number" className="p-2 border rounded-md text-black bg-gray-50" 
                    {...register("inStock", { required: true, min: 0 })}/>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md text-black bg-gray-50"
                    {...register("tags", { required: true })}/>
                </div>

                <div className="flex flex-col mb-2">
                        <span>Type</span>
                        <select className="p-2 border rounded-md text-black bg-gray-50"
                        {...register("type", { required: true })}>
                            <option value="">[Seleccione]</option>
                            <option value="anime">Anime</option>
                            <option value="comic">Comic</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-2">
                        <span>Categoria</span>
                        <select className="p-2 border rounded-md text-black bg-gray-50"
                        {...register("categoryId", { required: true })}>
                            <option value="">[Seleccione]</option>
                            {
                                categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                            ))
                            }
                        </select>
                    </div>
            </div>

            {/* Selector de fotos */}
            <div className="w-full">
                {/*Checkboxes*/}
                <div className="flex flex-col">
                    <div className="flex flex-col mb-2">
                        <span>Fotos</span>
                        <input 
                            type="file"
                            multiple 
                            className="p-2 border rounded-md text-black bg-gray-50" 
                            accept="image/png, image/jpeg, image/avif"
                            {...register('images')}/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {product.ProductImage?.map((image) => (
                            <div key={image.id}>
                                <Image
                                    alt={product.title ?? ""}
                                    src={`/geek-products/${image.url}`}
                                    width={300}
                                    height={300}
                                    className="rounded-t shadow-md"/>

                                <button
                                    type="button"
                                    className="btn-danger w-full rounded-b-xl">
                                        Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button className="btn-primary w-full">Guardar</button>
        </form>
    );
};
