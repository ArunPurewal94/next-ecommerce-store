import prisma from "@/lib/prismadb";

export interface ProductParams {
  cateogry?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: ProductParams) {
  try {
    const { cateogry, searchTerm } = params;

    let searchString = searchTerm;
    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (cateogry) {
      query.cateogry = cateogry;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: { contains: searchString, mode: "insensitive" },
            description: { contains: searchString, mode: "insensitive" },
          },
        ],
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
