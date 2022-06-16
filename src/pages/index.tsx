import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import commerce from '@lib/api/commerce';
import HomePage from '@homepage';

export async function getStaticProps({ preview, locale, locales }: GetStaticPropsContext) {
  const config = { locale, locales };

  // const pagesPromise = commerce.getAllPages({ config, preview });
  // const siteInfoPromise = commerce.getSiteInfo({ config, preview });

  const { product: featuredProduct } = await commerce.getProduct({
    variables: { slug: 'don-julio-primavera-tequila' },
  });

  /*const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: false } as any),
  });

  const { product } = await productsPromise;

  console.log('product: ', product);*/

  /*  const { product } = await productsPromise;
  const { pages } = await pagesPromise;
  const { categories, brands } = await siteInfoPromise;*/

  return {
    props: {
      featuredProduct,
      /* product,
      pages,
      categories,
      brands,*/
    },
    revalidate: 60,
  };
}

export default function Home({ featuredProduct }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage featuredProduct={featuredProduct!} />;
}
