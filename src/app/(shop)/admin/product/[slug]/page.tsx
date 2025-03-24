import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductAdminForm } from "./ui/ProductAdminForm";

interface Props {
  params: {
    slug: string;
  }
}

export default async function ProductAdminPage({params}: Props) {

    const {slug} = await params;

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ]);

    if (!product && slug !== 'new' ) {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

    return (
        <>
            <Title title={ title } />

            <ProductAdminForm product={product ?? {}} categories={categories}/>
        </>
    );
}
