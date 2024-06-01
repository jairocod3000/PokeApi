import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, googleProvider, githubProvider } from './firebase-config';

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};

export const logout = () => {
  return signOut(auth);
};