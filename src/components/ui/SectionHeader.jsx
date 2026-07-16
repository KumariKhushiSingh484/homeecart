import clsx from "clsx";

function SectionHeader({
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div
      className={clsx(
        "mb-8 flex items-end justify-between gap-4",
        className
      )}
    >
      <div>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-sm text-gray-500">
            {subtitle}
          </p>
        )}

      </div>

      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

export default SectionHeader;