export const revalidate = 60;

import { getPagProductWithImg } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({searchParams}: Props) {
  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

  const {products, currentPages, totalPages} = await getPagProductWithImg({page});


  if(products.length === 0)
    redirect('/');

  return (
    <>
        <Title title="Tienda" subTitle="Todo los productos" className="mb-2"/>

        <ProductGrid products={products}/>

        <Pagination totalPages={totalPages}/>
    </>
  );
}
