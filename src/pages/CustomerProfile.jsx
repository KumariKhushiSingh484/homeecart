import { useCustomer } from "../context/CustomerContext";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import AddressCard from "../components/profile/AddressCard";
import PrimeCard from "../components/profile/PrimeCard";
import ProfileActions from "../components/profile/ProfileActions";

import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";

function CustomerProfile() {
  const {
    customer,
    loadingCustomer,
  } = useCustomer();

  if (loadingCustomer) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <LoadingSkeleton rows={4} />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <SectionHeader
          title="My Profile"
          subtitle="Manage your account information"
        />

        <EmptyState
          icon="👤"
          title="You're not logged in"
          description="Please login to access your profile."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">

      <SectionHeader
        title="My Profile"
        subtitle="Manage your account information"
      />

      <ProfileHeader
        customer={customer}
      />

      <ProfileInfoCard
        customer={customer}
      />

      <AddressCard
        customer={customer}
      />

      <PrimeCard
        customer={customer}
      />

      <ProfileActions />

    </div>
  );
}

export default CustomerProfile;