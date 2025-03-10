export const revalidate = 604800;

import { notFound } from 'next/navigation';
import { titleFont } from '@/config/fonts';
import { ProductMobileSlideShow, ProductSlideShow } from '@/components';
import { getProductBySlug } from '@/actions';
import { Metadata } from 'next';
import { AddToCart } from './ui/AddToCart';

interface Props {
    params:{
        slug: string;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? "Producto no encontrado",
        description: product?.description ?? "",
        openGraph: {
        title: product?.title ?? "Producto no encontrado",
        description: product?.description ?? "",
        images: [ `/products/${ product?.images[0] }`],
        },
    };
}

export default async function ProductPage({params}: Props){
    
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    
    if(!product){
        notFound();
    }

    return(
        <div className='mt-50 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>

            {/* SlideShow */}
            <div className="col-span-1 md:col-span-2">

                <ProductMobileSlideShow 
                title={product.title}
                images={product.images}
                className="block md:hidden"/>

                <ProductSlideShow 
                title={product.title}
                images={product.images}
                className="hidden md:block"/>
            </div>

            {/* Detalles */}
            <div className="col-span-1 px-5">   
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
                <p className="text-lg">${product.price}</p>

                <AddToCart product={product}/>

                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    )
}