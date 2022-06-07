import { GetStaticPropsContext } from 'next';
import commerce from '@lib/api/commerce';
import HomePage from '@homepage';

export async function getStaticProps({ preview, locale, locales }: GetStaticPropsContext) {
  const config = { locale, locales };

  // const pagesPromise = commerce.getAllPages({ config, preview });
  // const siteInfoPromise = commerce.getSiteInfo({ config, preview });

  /*const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: false } as any),
  });

  const { products } = await productsPromise;

  console.log('products: ', products);*/

  /*  const { products } = await productsPromise;
  const { pages } = await pagesPromise;
  const { categories, brands } = await siteInfoPromise;*/

  return {
    props: {
      /* products,
      pages,
      categories,
      brands,*/
    },
    revalidate: 60,
  };
}

export default function Home() {
  return <HomePage />;
}
