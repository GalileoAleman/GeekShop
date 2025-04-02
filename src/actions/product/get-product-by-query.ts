'use server';

import { prisma } from "@/lib/prisma";

interface SearchOptions {
  page?: number;
  take?: number;
  query: string;
}

export const getPagProductWithImgByQuery = async ({ page = 1, take = 6, query }: SearchOptions) => {
  if (!query) return { products: [], totalPages: 0 };

  const sanitizedQuery = query.toLowerCase();

  const products = await prisma.product.findMany({
    take,
    skip: (page - 1) * take,
    include: {
      ProductImage: {
        take: 2,
        select: { url: true },
      },
    },
    where: {
      OR: [
        { title: { contains: sanitizedQuery, mode: 'insensitive' } },
        { description: { contains: sanitizedQuery, mode: 'insensitive' } },
        { tags: { has: sanitizedQuery } },
      ],
    },
  });

  const total = await prisma.product.count({
    where: {
      OR: [
        { title: { contains: sanitizedQuery, mode: 'insensitive' } },
        { description: { contains: sanitizedQuery, mode: 'insensitive' } },
        { tags: { has: sanitizedQuery } },
      ],
    },
  });

  const totalPages = Math.ceil(total / take);

  return {
    currentPage: page,
    totalPages,
    products: products.map((p) => ({
      ...p,
      images: p.ProductImage.map((img) => img.url),
    })),
  };
};
