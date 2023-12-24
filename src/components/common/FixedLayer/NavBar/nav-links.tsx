import SecondaryNavBar from '@fixedLayer/SecondaryNavBar';
import { getCollections } from '@lib/saleor';

export default async function NavLinks() {
  // wait 3 seconds

  // console.log('nav links ----------------');

  const collections = await getCollections();
  // const cart = await getCart('');

  return <SecondaryNavBar collections={collections} />;
}
