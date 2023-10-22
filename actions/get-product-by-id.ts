import prisma from "@/lib/prismadb";

interface ProductParams {
  productId?: string;
}

export default async function getProductById(params: ProductParams) {
  try {
    const { productId } = params;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) return null;

    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
