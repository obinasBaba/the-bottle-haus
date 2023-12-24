import React from 'react';
import ProductPage from '@/scenes/ProductPage';
import { getProduct, getProducts } from '@lib/saleor';
import { PageTransitionContainer } from '@/components/common/MotionItems';

const ProductDetailPage = async ({ params }: { params: { slug: string } }) => {
  const product = await getProduct(params!.slug);
  const relatedProducts = await getProducts({});

  if (!product) {
    throw new Error('Product Not found');
  }

  return (
    <>
      <ProductPage product={product} relatedProducts={relatedProducts} />
    </>
  );
};

export default ProductDetailPage;
