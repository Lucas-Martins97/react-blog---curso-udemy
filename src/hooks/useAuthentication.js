import { db } from "../firebase/Config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sigInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // clean UP
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIfCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIfCancelled();
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A Senha deve conter no minimo 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail ja cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, tente mais tarde";
      }
      setError(systemErrorMessage);
    }
  };

  // Logout
  const logout = () => {
    checkIfIfCancelled();
    signOut(auth);
  };

  // Login
  const login = async (data) => {
    checkIfIfCancelled();
    setLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = " Ocorreu um erro por favor tente mais tarde";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
