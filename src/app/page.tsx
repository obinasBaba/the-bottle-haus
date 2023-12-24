
import React from 'react';
import { getCollectionProducts, getProduct } from '@lib/saleor';
import HomePage from '@/scenes/Homepage/index';


const Page = async () => {
  const product = await getProduct('don-julio-ultima-reserva-extra-anejo-tequila');

  const featuredCollections = await getCollectionProducts({
    collection: 'whiskey',
  });

  const rareToFind = await getCollectionProducts({
    collection: 'rare-hard-to-find',
  });

  return (
    <>
      <HomePage
        featuredProduct={product!}
        featuredCollections={featuredCollections}
        rareToFind={rareToFind}
      />
    </>
  );
};

export default Page;
