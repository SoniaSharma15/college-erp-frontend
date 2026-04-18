import { useEffect, useState } from "react";
import StaffTable from "../../../../components/staff/StaffTable";
import { getAllStaff, deleteStaff } from "../../../../services/staff.service";
import { useNavigate } from "react-router-dom";

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
    <div className="p-6 space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <button
          onClick={() => navigate("/admin/staff/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Staff
        </button>
      </div>

      <StaffTable
        data={staff}
        onView={setSelected}
        onEdit={(id) => navigate(`/admin/staff/edit/${id}`)}
        onDelete={handleDelete}
      />

      {selected && (
        <div className="bg-white p-4 rounded-xl shadow mt-4">
          <h3 className="font-bold">Details</h3>
          <p>Name: {selected.name}</p>
          <p>Email: {selected.email}</p>
          <p>Role: {selected.role}</p>
          <p>Designation: {selected.designation}</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default StaffList;