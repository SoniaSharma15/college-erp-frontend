import { useEffect, useState } from "react";
import { Users, Plus } from "lucide-react";
import StaffTable from "../../../../components/staff/StaffTable";
import { getAllStaff, deleteStaff } from "../../../../services/staff.service";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../components/layout/DashboardLayout";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getAllStaff();
    setStaff(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete staff?")) return;
    await deleteStaff(id);
    fetchData();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="text-blue-600" />
            <h1 className="text-2xl font-bold">Staff Management</h1>
          </div>

          <button
            onClick={() => navigate("/admin/staff/create")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            <Plus size={18} /> Add Staff
          </button>
        </div>

        {/* Table */}
        <StaffTable
          data={staff}
          onView={setSelected}
          onEdit={(id) => navigate(`/admin/staff/edit/${id}`)}
          onDelete={handleDelete}
        />

        {/* Modal */}
        {selected && (
          <div className="bg-white p-5 rounded-xl shadow-lg border">
            <h3 className="font-semibold text-lg mb-2">Details</h3>
            <p><b>Name:</b> {selected.name}</p>
            <p><b>Email:</b> {selected.email}</p>
            <p><b>Role:</b> {selected.role}</p>
            <p><b>Designation:</b> {selected.designation}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-3 text-sm text-red-500"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StaffList;