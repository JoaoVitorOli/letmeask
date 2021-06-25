import { useState, ReactNode } from "react";
import { useEffect } from "react";
import { createContext } from "react";

import { firebase, auth } from "../services/firebase";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextProps {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthenticationContext = createContext({} as AuthContextProps);

export function AuthenticationProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
  
        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account");
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);
  
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  async function signInWithGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Github Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  return(
    <AuthenticationContext.Provider value={{
      user,
      signInWithGoogle,
      signInWithGithub
    }}>
      {children} 
    </AuthenticationContext.Provider>
  );
}