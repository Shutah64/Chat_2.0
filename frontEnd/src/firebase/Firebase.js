import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBduO3u03eT5Hyf-Fpm-jsrC1fedlrVBGw",
  authDomain: "chat-app-e7f11.firebaseapp.com",
  projectId: "chat-app-e7f11",
  storageBucket: "chat-app-e7f11.appspot.com",
  messagingSenderId: "240423698183",
  appId: "1:240423698183:web:9db6d38486c9eda2fc4fa2",
  measurementId: "G-9ZRR52KFMS",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploader = async (type, file) => {
  const storageRef = ref(storage, `${type}/${file.name}`);
  const link = await uploadBytes(storageRef, file).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((url) => url)
  );
  return link;
};

export { app, uploader };
