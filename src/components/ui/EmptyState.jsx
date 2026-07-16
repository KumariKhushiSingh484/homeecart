import Button from "./Button";

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm">

      {icon && (
        <div className="mb-6 text-6xl">
          {icon}
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-900">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-gray-500">
          {description}
        </p>
      )}

      {buttonText && onButtonClick && (
        <Button
          className="mt-8"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;