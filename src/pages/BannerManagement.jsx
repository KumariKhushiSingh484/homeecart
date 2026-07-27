import { useEffect, useState } from "react";

import {
  getBanners,
  addBanner,
  updateBanner,
  updateBannerStatus,
  deleteBanner,
} from "../services/bannerService";
import {
  uploadImage,
  deleteImage,
} from "../services/storageService";
import useToast from "../hooks/useToast";
import ToastNotification from "../components/ToastNotification";
function BannerManagement() {
  const [bannerImage, setBannerImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [oldImageUrl, setOldImageUrl] =
  useState("");

  const [title, setTitle] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
const [editingBannerId, setEditingBannerId] = useState(null);
  const [banners, setBanners] =
  useState([]);
  const [loading, setLoading] = useState(false);
  const {
  toast,
  showToast,
} = useToast();
const fetchBanners = async () => {
  try {
    const bannerList =
      await getBanners();

    setBanners(bannerList);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchBanners();
}, []);
const resetForm = () => {
  setTitle("");
  setBannerImage(null);
  setPreviewImage("");
  setOldImageUrl("");
  setDisplayOrder(1);
  setIsActive(true);

  setIsEditing(false);
  setEditingBannerId(null);
};
const handleSaveBanner = async () => {
  if (!title.trim()) {
    showToast(
  "error",
  "Please enter banner title."
);
    return;
  }

  try {
    const editing = isEditing;
    setLoading(true);

    let imageUrl = previewImage;

    if (bannerImage) {
      imageUrl = await uploadImage(
        bannerImage,
        "banners"
      );

      if (isEditing && oldImageUrl) {
        await deleteImage(oldImageUrl);
      }
    }

    const bannerData = {
      title: title.trim(),
      imageUrl,
      displayOrder,
      isActive,
    };

    if (isEditing) {
      await updateBanner(
        editingBannerId,
        bannerData
      );
    } else {
      await addBanner(bannerData);
    }

    resetForm();

    await fetchBanners();

   showToast(
  "success",
  editing
    ? "Banner updated successfully."
    : "Banner uploaded successfully."
);
  } catch (error) {
    console.error(error);

    showToast(
  "error",
  "Failed to save banner."
);
  } finally {
    setLoading(false);
  }
};
const handleDelete = async (banner) => {
  try {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${banner.title}"?`
    );

    if (!confirmDelete) return;

    await deleteBanner(
      banner.id,
      banner.imageUrl
    );

    await fetchBanners();

    showToast(
  "success",
  "Banner deleted successfully."
);
  } catch (error) {
    console.error(error);

    showToast(
  "error",
  "Failed to delete banner."
);
  }
};
const handleToggleStatus = async (banner) => {
  try {
    await updateBannerStatus(
      banner.id,
      !banner.isActive
    );

    await fetchBanners();
  } catch (error) {
    console.error(error);

    showToast(
  "error",
  "Failed to update banner status."
);
  }
};
const handleEdit = (banner) => {
  setIsEditing(true);
  setEditingBannerId(banner.id);

  setTitle(banner.title);
  setDisplayOrder(
    banner.displayOrder ?? 1
  );
  setIsActive(
    banner.isActive ?? true
  );

  setPreviewImage(
    banner.imageUrl || ""
  );

  setOldImageUrl(
    banner.imageUrl || ""
  );

  setBannerImage(null);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Banner Management
      </h1>

      {/* Upload Form */}

      <div className="mb-8 flex flex-wrap gap-4">

        <input
          type="text"
          placeholder="Banner title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="flex-1 rounded-lg border px-4 py-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            setBannerImage(file);
            setPreviewImage(
              URL.createObjectURL(file)
            );
          }}
          className="rounded-lg border px-4 py-2"
        />

        <input
          type="number"
          min="1"
          value={displayOrder}
          onChange={(e) =>
            setDisplayOrder(
              Number(e.target.value)
            )
          }
          className="w-32 rounded-lg border px-4 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(
                e.target.checked
              )
            }
          />

          Active
        </label>

      <button
  onClick={handleSaveBanner}
  disabled={loading}
  className="
rounded-lg
bg-green-600
px-6
py-2
font-semibold
text-white
transition
hover:bg-green-700
disabled:cursor-not-allowed
disabled:opacity-50
"
>
  {
loading
? isEditing
? "Updating..."
: "Uploading..."
: isEditing
? "Update Banner"
: "Upload Banner"
}
</button>
{
isEditing && (
  <button
    onClick={resetForm}
    className="
      rounded-lg
      border
      border-gray-300
      px-6
      py-2
      font-semibold
      transition
      hover:bg-gray-100
    "
  >
    Cancel
  </button>
)
}
      </div>

      {previewImage && (
        <div className="mb-8">
          <img
            src={previewImage}
            alt="Preview"
            className="h-52 rounded-xl border object-cover"
          />
        </div>
      )}

    {/* Banner List */}

<div className="space-y-4">

  {banners.map((banner) => (

    <div
      key={banner.id}
      className="rounded-xl border p-4"
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <img
            src={banner.imageUrl}
            alt={banner.title}
            className="h-28 w-48 rounded-lg border object-cover"
          />

          <div>

            <h2 className="text-lg font-semibold">
              {banner.title}
            </h2>

            <p className="text-sm text-gray-500">
              Display Order : {banner.displayOrder}
            </p>

          <button
  onClick={() =>
    handleToggleStatus(banner)
  }
  className={`mt-2 rounded-lg px-3 py-1 text-sm font-medium transition ${
    banner.isActive
      ? "bg-green-100 text-green-700 hover:bg-green-200"
      : "bg-red-100 text-red-700 hover:bg-red-200"
  }`}
>
  {banner.isActive
    ? "🟢 Active"
    : "🔴 Inactive"}
</button>
          </div>

        </div>

        <div className="flex gap-2">

         <button
  onClick={() => handleEdit(banner)}
  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
>
  Edit
</button>

         <button
  onClick={() => handleDelete(banner)}
  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
>
  Delete
</button>
        </div>

      </div>

    </div>

  ))}

</div>
{toast && (
  <ToastNotification
    type={toast.type}
    message={toast.message}
    onClose={() => {}}
  />
)}
    </div>
  );
}

export default BannerManagement;