import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, firebase } from '../services/firebase';

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  signInWithGoogle: () => Promise<void>;
  user: undefined | User;
};

type User = {
  avatar: string;
  id: string;
  name: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(function () {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          avatar: photoURL,
          id: uid,
          name: displayName
        });
      }

      return function () {
        unsubscribe();
      };
    });
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        avatar: photoURL,
        id: uid,
        name: displayName
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signInWithGoogle, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
