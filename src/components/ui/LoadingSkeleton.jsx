function LoadingSkeleton({
  rows = 1,
  className = "",
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="
            mb-4
            h-24
            rounded-3xl
            bg-gray-200
          "
        />
      ))}
    </div>
  );
}

export default LoadingSkeleton;