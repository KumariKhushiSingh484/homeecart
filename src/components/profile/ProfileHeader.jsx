function ProfileHeader({ customer }) {
  const firstLetter = customer?.name
    ? customer.name.charAt(0).toUpperCase()
    : "C";

  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 to-green-500 shadow-xl">

      <div className="flex flex-col items-center px-8 py-12">

        {/* Avatar */}

        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-green-600 shadow-lg">

          {firstLetter}

        </div>

        {/* Name */}

        <h1 className="mt-6 text-3xl font-bold text-white">

          {customer.name}

        </h1>

        {/* Phone */}

        <p className="mt-2 text-lg text-green-100">

          {customer.phone}

        </p>

      </div>

    </div>
  );
}

export default ProfileHeader;