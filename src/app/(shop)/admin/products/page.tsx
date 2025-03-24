export const revalidate = 0;

import { getPagProductWithImg } from '@/actions';
import { Pagination, ProductImg, Title } from '@/components';
import { currencyFormat } from '@/utils';

import Link from 'next/link';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProdutsAdminPage({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPagProductWithImg({page});

  return (
    <>
      <Title title="Gestión de Productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImg
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded"/>
                  </Link>
                </td>
                <td className="text-sm text-primary font-light px-6 py-4 whitespace-nowrap text-center">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline">
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap text-center">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap text-center">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap text-center">
                  {product.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
