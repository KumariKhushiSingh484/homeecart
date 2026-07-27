import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";
import { deleteImage } from "./storageService";

const bannerCollection = collection(
  db,
  "banners"
);

// ==============================
// Get All Banners
// ==============================

export async function getBanners() {
  const q = query(
    bannerCollection,
    orderBy("displayOrder")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

// ==============================
// Add Banner
// ==============================

export async function addBanner(
  bannerData
) {
  await addDoc(
    bannerCollection,
    bannerData
  );
}

// ==============================
// Update Banner
// ==============================

export async function updateBanner(
  id,
  bannerData
) {
  await updateDoc(
    doc(db, "banners", id),
    bannerData
  );
}

// ==============================
// Delete Banner
// ==============================

export async function deleteBanner(
  id,
  imageUrl
) {
  try {
    if (imageUrl) {
      await deleteImage(imageUrl);
    }
  } catch (error) {
    console.error(
      "Failed to delete banner image:",
      error
    );
  }

  await deleteDoc(
    doc(db, "banners", id)
  );
}

// ==============================
// Activate / Deactivate
// ==============================

export async function updateBannerStatus(
  id,
  isActive
) {
  await updateDoc(
    doc(db, "banners", id),
    {
      isActive,
    }
  );
}