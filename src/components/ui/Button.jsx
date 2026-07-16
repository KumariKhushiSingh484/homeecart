import clsx from "clsx";

const variants = {
  primary:
    "bg-green-600 text-white hover:bg-green-700 shadow-sm",

  secondary:
    "border border-green-600 bg-white text-green-600 hover:bg-green-50",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  warning:
    "bg-yellow-400 text-black hover:bg-yellow-300",
};

const sizes = {
  sm: "px-3 py-2 text-sm",

  md: "px-5 py-3",

  lg: "px-7 py-4 text-lg",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;