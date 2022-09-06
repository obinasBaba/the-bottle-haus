import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import commerce from '@lib/api/commerce';
import { MotionParent as MotionPage } from '@/components/common/MotionItems';
import HomePage, { pageTransition } from '@/scenes/Homepage';

export async function getStaticProps({ preview, locale, locales }: GetStaticPropsContext) {
  const config = { locale, locales };

  /* return {
    props: {

    }
  }*/

  const { product } = await commerce.getProduct({
    variables: { slug: 'don-julio-primavera-tequila' },
  });

  const featuredCollections = await commerce.getAllProducts({
    variables: { first: 8, filter: { collections: ['Q29sbGVjdGlvbjoz'] } },
    config,
    preview,
  });

  const rareToFind = await commerce.getAllProducts({
    variables: { first: 12, filter: { collections: ['Q29sbGVjdGlvbjoxMA=='] } },
    config,
    preview,
  });

  const allCollections = await commerce.getSiteInfo({});

  return {
    props: {
      featuredProduct: product,
      featuredCollections,
      rareToFind,
      collections: allCollections.collections,
    },
    revalidate: 600,
  };
}

export default function Home({
  featuredProduct,
  featuredCollections,
  rareToFind,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MotionPage transition={pageTransition}>
      <HomePage
        featuredProduct={featuredProduct!}
        featuredCollections={featuredCollections}
        rareToFind={rareToFind}
      />
    </MotionPage>
  );
}
