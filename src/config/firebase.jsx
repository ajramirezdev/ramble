import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDjBMssWmMDJbVSCPCOk3TZFc7sda10XRo",
  authDomain: "ramble-b42cf.firebaseapp.com",
  projectId: "ramble-b42cf",
  storageBucket: "ramble-b42cf.appspot.com",
  messagingSenderId: "945359511775",
  appId: "1:945359511775:web:1e2ebd36ff01d8ed8e096a",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
