import clsx from "clsx";

function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={clsx(
        "rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300",
        hover &&
          "hover:-translate-y-1 hover:shadow-lg",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;