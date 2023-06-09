import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9hhvxv8nIOAJVa6eA9-VSyIbYT5ozwwQ",
  authDomain: "meu-blog-88ebc.firebaseapp.com",
  projectId: "meu-blog-88ebc",
  storageBucket: "meu-blog-88ebc.appspot.com",
  messagingSenderId: "447075787263",
  appId: "1:447075787263:web:2d050f5fccb50ad36147ca",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
