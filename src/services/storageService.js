import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "./firebase";

// Upload Image
export async function uploadImage(file, folder) {
  if (!file) return "";

  const fileName = `${Date.now()}-${file.name}`;

  const storageRef = ref(
    storage,
    `${folder}/${fileName}`
  );

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
}

// Delete Image
export async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  try {
    const imageRef = ref(storage, imageUrl);

    await deleteObject(imageRef);
  } catch (error) {
    console.error("Failed to delete image:", error);
  }
}