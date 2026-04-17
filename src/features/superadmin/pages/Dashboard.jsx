import DashboardLayout from "../../../components/layout/DashboardLayout";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">
        Super Admin Dashboard
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <p>Welcome, {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;