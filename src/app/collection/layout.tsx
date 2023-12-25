import React, { Suspense } from 'react';
import CollectionLayoutScene from '@/components/common/layout/CollectionLayout';
import { getCollections } from '@lib/saleor';

const CollectionLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const collections = await getCollections();

  if (!collections) {
    throw new Error('Collection Not found');
  }

  return (
    <Suspense fallback='loading ....'>
      <CollectionLayoutScene
        collections={collections}
        collectionName={'Collection Not Found (title )'}>
        {children}
      </CollectionLayoutScene>
    </Suspense>
  );
};

export default CollectionLayout;
