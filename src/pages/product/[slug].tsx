import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import ProductPage from '@/scenes/ProductPage';
import { MotionParent } from '@/components/common/MotionItems';
import Head from 'next/head';
import React from 'react';
import { pageTransition } from '@/scenes/Homepage';

import { getCollections, getProduct, getProducts } from '@lib/saleor';

export async function getStaticProps({ params, locale }: GetStaticPropsContext<{ slug: string }>) {
  const product = await getProduct(params!.slug);
  const relatedProducts = await getProducts({});
  const allCollections = await getCollections();

  if (!product) {
    // return {
    //   notFound: true,
    // };
  }

  return {
    props: {
      product,
      relatedProducts,
      collections: allCollections,
    }, // revalidate: 11200,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const products = await getProducts({});

  return {
    paths: products.map((product) => `/product/${product.handle}`),
    fallback: false,
  };
}

const Product: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  product,
  relatedProducts,
}) => {
  return (
    <MotionParent transition={pageTransition}>
      <Head>
        <title>product detail</title>
        <meta name="product detail page" />
      </Head>

      {product && <ProductPage product={product} relatedProducts={relatedProducts} />}
    </MotionParent>
  );
};

export default Product;
