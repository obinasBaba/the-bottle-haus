import {
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import commerce from '@lib/api/commerce';
import ProductPage from '@/scenes/ProductPage';
import { MotionParent } from '@/components/common/MotionItems';

export async function getStaticProps({ params, locale }: GetStaticPropsContext<{ slug: string }>) {
  const { product } = await commerce.getProduct({
    variables: { slug: params!.slug },
  });

  const products = await commerce.getAllProducts({
    variables: { first: 4 },
    config: {},
  });

  const allCollections = await commerce.getSiteInfo({});

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
      relatedProducts: products,
      collections: allCollections.collections,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
  const { products } = await commerce.getAllProductPaths({});

  return {
    paths: products.map((product: any) => `/product${product.path}`),
    fallback: 'blocking',
  };
}

const Product = ({ product }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <MotionParent>
      <ProductPage product={product} />
    </MotionParent>
  );
};

export default Product;
