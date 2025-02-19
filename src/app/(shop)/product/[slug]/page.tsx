
import { notFound } from 'next/navigation';
import { initialData } from '../../../../seed/seed';
import { titleFont } from '@/config/fonts';
import { ProductSlideShow, QuantitySelector } from '@/components';

interface Props {
    params:{
        slug: string;
    }
}

export default function ProductPage({params}: Props){
    
    const {slug} = params;
    const product = initialData.products.find(product => product.slug === slug)
    
    if(!product){
        notFound();
    }

    return(
        <div className='mt-50 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>

            <div className="col-span-1 md:col-span-2">
                <ProductSlideShow 
                title={product.title}
                images={product.images}/>
            </div>

            <div className="col-span-1 px-5">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
                <p className="text-lg mb-5">${product.price}</p>

                <QuantitySelector quantity={1} stock={product.inStock}/>

                <button className="btn-primary my-5">
                    Agregar al carrito
                </button>

                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    )
}