import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Logo({ logo }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img
          src={logo}
          alt="HomeEcart"
          className="h-9 w-9 object-contain"
        />
      </div>

      <div className="hidden sm:block text-left">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          HomeEcart
        </h1>

        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={12} />
          <span>Dehri-On-Sone</span>
        </div>
      </div>
    </button>
  );
}

export default Logo;