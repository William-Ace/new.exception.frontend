import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthError } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';

import { useMutation } from '@apollo/client';
import { RegisterUser } from '../graphql/mutation';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBviOeCokAXqKJdMhKkLjLL-EJIgXNPfsE',
  authDomain: 'project-1934.firebaseapp.com',
  projectId: 'project-1934',
  storageBucket: 'project-1934.appspot.com',
  messagingSenderId: '745239468727',
  appId: '1:745239468727:web:79fca89204e9e9c464cb32',
  measurementId: 'G-VT27HK3Z0V'
};

type FirebaseProviderPropsType = {
  children: React.ReactNode;
};

type FirebaseStateType = {
  user: firebase.User | null;
  error: string | null;
  token: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isFetchingUser: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  registerWithCredentials: (email: string, password: string, username: string) => Promise<void>;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  logoutUserFromFirebase: () => Promise<void>;
};

// Init
firebase.initializeApp(FIREBASE_CONFIG);
const FirebaseContext = createContext<FirebaseStateType | undefined>(undefined);

function FirebaseProvider({ children }: FirebaseProviderPropsType) {
  const db = getFirestore();
  const auth = firebase.auth();
  const userRef = collection(db, 'users');

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com');

  const [user, setUser] = useState<firebase.User | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(true);

  const [register] = useMutation(RegisterUser);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      setUser(user);
      const token = await user.getIdToken();
      setToken(token);
    } else {
      setUser(null);
      setToken(undefined);
    }

    setIsFetchingUser(false);
  });

  const registerWithCredentials = async (email: string, password: string, username: string) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      if (!user) {
        setError('No user was found');
        return;
      }
      await user.updateProfile({ displayName: username });
      console.log('XXX');
      register({ variables: { email, password, username } });
    } catch (error) {
      const e = error as AuthError;
      const errorCode = e.code;
      const errorMessage = e.message;
      if (errorCode === 'auth/weak-password') {
        setError('The password is too weak.');
      } else if (errorCode === 'auth/network-request-failed') {
        setError('Request failed. Check your internet connection and try again.');
      } else {
        setError(errorMessage);
      }
      console.log(e);
      toast.error('Error occured!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  /**
   * Login a user using email and password.
   */
  const loginWithCredentials = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      const e = error as AuthError;
      const errorCode = e.code;
      const errorMessage = e.message;

      console.log(errorCode);

      if (errorCode === 'auth/wrong-password') {
        setError('Wrong password.');
      } else if (errorCode === 'auth/user-not-found') {
        setError('User not found');
      } else if (errorCode === 'auth/network-request-failed') {
        setError('Request failed. Check your internet connection and try again.');
      } else {
        setError(errorMessage);
      }
      console.log(e);

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await auth.signInWithPopup(googleProvider);

      if (!user) {
        setError('No user was found');
        return;
      }

      const result = await getDocs(query(userRef, where('uid', '==', user.uid)));

      if (result.empty) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email
        });
      }
    } catch (error) {
      const e = error as AuthError & { email: string };
      const errorCode = e.code;
      const email = e.email;
      const errorMessage = e.message;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        auth.fetchSignInMethodsForEmail(email).then(function (providers) {
          console.log(providers);
          toast.error(providers, {
            position: toast.POSITION.TOP_RIGHT
          });
        });
      } else if (errorCode === 'auth/network-request-failed') {
        setError('Request failed. Check your internet connection and try again.');
      } else {
        setError(errorMessage);
      }
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const { user } = await auth.signInWithPopup(microsoftProvider);

      if (!user) {
        setError('No user was found');
        return;
      }

      const result = await getDocs(query(userRef, where('uid', '==', user.uid)));

      if (result.empty) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'microsoft',
          email: user.email
        });
      }
    } catch (error) {
      const e = error as AuthError & { email: string };
      const errorCode = e.code;
      const email = e.email;
      const errorMessage = e.message;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        auth.fetchSignInMethodsForEmail(email).then(function (providers) {
          console.log(providers);
          toast.error('Error occured!', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
      } else if (errorCode === 'auth/network-request-failed') {
        setError('Request failed. Check your internet connection and try again.');
      } else {
        setError(errorMessage);
      }
    }
  };

  const logoutUserFromFirebase = async () => {
    await auth.signOut();
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        error,
        token,
        setError,
        isFetchingUser,
        registerWithCredentials,
        loginWithCredentials,
        signInWithGoogle,
        signInWithMicrosoft,
        logoutUserFromFirebase
      }}>
      {children}
    </FirebaseContext.Provider>
  );
}

function useFirebase() {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }

  return context;
}

export { FirebaseProvider, useFirebase };
