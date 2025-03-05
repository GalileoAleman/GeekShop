export const revalidate = 60;

import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { Type } from "@/interfaces";
import { getPagProductWithImg } from "@/actions";


interface Props {
    params: {
        type: Type;
    },
    searchParams: {
        page?: string;
      }
}

export default async function CategoryProducts({ params, searchParams }: Props){

    const { type } = params

      const page = searchParams.page ? parseInt(searchParams.page) : 1;
    
      const {products, currentPages, totalPages} = await getPagProductWithImg({page, type: type});
    
      if(products.length === 0)
        redirect(`/type/${type}`);
    
    const labels: Record<Type, string> = {
        "anime": "Animes",
        "comic": "Comics",
    }

  return (
    <>
        <Title title={`Articulos de ${labels[type]}`} subTitle={`Productos ${labels[type]} para tí`} className="mb-2"/>

        <ProductGrid products={products}/>

        <Pagination totalPages={totalPages}/>
    </>
  );
}
