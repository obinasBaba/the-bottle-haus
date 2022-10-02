import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

const signedIn = false;

const SignIn = ({}) => {
  const { pathname, query } = useRouter();

  const { data: session, status } = useSession();

  // console.log('query: ', query);

  useEffect(() => {
    if (session?.user?.email) window.close();

    if (!session) {
      // console.log('query---', query);
      signIn('google')
        .then(() => null)
        .catch(console.error);
    } else if (!session && query) {
      window.prompt(`${query.toString()} -- what si `);
    } else {
      window.close();
    }
  }, [query, session, status]);

  return null;
};

SignIn.signIn = true;

export default SignIn;
