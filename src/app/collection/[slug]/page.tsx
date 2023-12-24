import React from 'react';
import { getCollection, getCollectionProducts, getCollections } from '@lib/saleor';
import CollectionPageScene from '@/scenes/CollectionPage';


export const dynamicParams = true;

export async function generateStaticParams() {

  const collections = await getCollections();

  return collections.map((collection) => ({
    params: {
      slug: collection.handle,
    },
  }));

}
const CollectionPage = async ({ params }: { params: { slug: string } }) => {
  const targetCollection = await getCollection(params!.slug);

  const products = await getCollectionProducts({
    collection: targetCollection?.handle ?? 'collections-not-found',
  });

  return (
    <>
      <CollectionPageScene products={products} />
    </>
  );
};

export default CollectionPage;
