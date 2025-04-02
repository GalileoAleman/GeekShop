import { getPagProductWithImgByQuery } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Suspense } from "react";
import SearchSection from "./ui/SearchForm";

interface Props {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export const revalidate = 60;

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.trim() ?? "";
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPagProductWithImgByQuery({ page, query });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Title title="Buscar productos" subTitle="Encuentra lo que te gusta" className="mb-6" />

      {/* Formulario */}
      <Suspense fallback={<p>Cargando búsqueda...</p>}>
        <SearchSection/>
      </Suspense>

      {/* Resultados */}
      {query && (
        <>
          {products.length === 0 ? (
            <p className="text-center text-red-600 text-lg mt-10">
              No se encontraron productos para <strong>&quot;{query}&quot;</strong>.
            </p>
          ) : (
            <>
              <h3 className="text-lg font-semibold mt-10 mb-4">
                Resultados para: <span className="btn-primary">&quot;{query}&quot;</span>
              </h3>
              <ProductGrid products={products} />
              <Pagination totalPages={totalPages} />
            </>
          )}
        </>
      )}
    </div>
  );
}
