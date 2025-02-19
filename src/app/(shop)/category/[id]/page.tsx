import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

const seedProducts = initialData.products;

interface Props {
    params: {
        id: Category;
    }
}

export default function CategoryProducts({ params }: Props){

    const { id } = params
    const products = seedProducts.filter(product => product.category === id);

    const labels: Record<Category, string> = {
        "anime": "Animes",
        "comic": "Comics",
    }

    if(id !== "anime" && id !== "comic")
        notFound()

  return (
    <>
        <Title title={`Articulos de ${labels[id]}`} subTitle={`Productos ${labels[id]} para tí`} className="mb-2"/>

        <ProductGrid products={products}/>
    </>
  );
}
