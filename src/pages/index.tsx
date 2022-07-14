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

  const featuredCollections = await commerce.getAllProducts({
    variables: { first: 12, filter: { collections: ['Q29sbGVjdGlvbjoz'] } },
    config,
    preview,
  });
  /*

  const { product } = await productsPromise;

  console.log('product: ', product);*/

  /*  const { product } = await productsPromise;
  const { pages } = await pagesPromise;
  const { categories, brands } = await siteInfoPromise;*/

  return {
    props: {
      featuredProduct,
      featuredCollections,
      /* product,
      pages,
      categories,
      brands,*/
    },
    revalidate: 60,
  };
}

export default function Home({
  featuredProduct,
  featuredCollections,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage featuredProduct={featuredProduct!} featuredCollections={featuredCollections} />;
}
