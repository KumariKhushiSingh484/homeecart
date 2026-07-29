function AnalyticsCard({
  title,
  value,
  icon,
  subtitle = "",
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="text-4xl">{icon}</div>

        <h2 className="text-gray-500 font-medium">
          {title}
        </h2>
      </div>

      <h1 className="text-4xl font-bold text-gray-800">
        {value}
      </h1>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default AnalyticsCard;