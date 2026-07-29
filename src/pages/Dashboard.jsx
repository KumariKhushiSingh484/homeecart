import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";
import { getAnalytics } from "../services/analyticsService";

import AnalyticsCard from "../components/AnalyticsCard";

function Dashboard() {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    totalLogins: 0,
  });

  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    // Analytics
    const analyticsData = await getAnalytics();

    if (analyticsData) {
      setAnalytics(analyticsData);
    }

    // Customers
    const customersSnapshot = await getDocs(
      collection(db, "customers")
    );

    setCustomerCount(customersSnapshot.size);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        📊 Business Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <AnalyticsCard
          title="Visitors"
          value={analytics.totalVisitors}
          icon="👀"
          subtitle="Since launch"
        />

        <AnalyticsCard
          title="Customers"
          value={customerCount}
          icon="👤"
          subtitle="Registered customers"
        />

        <AnalyticsCard
          title="Logins"
          value={analytics.totalLogins}
          icon="🔐"
          subtitle="Successful logins"
        />

      </div>
    </div>
  );
}

export default Dashboard;