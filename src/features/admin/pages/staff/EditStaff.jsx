import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import StaffForm from "../../../../components/staff/StaffForm";
import { getAllStaff, updateStaff } from "../../../../services/staff.service";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../components/layout/DashboardLayout";

const EditStaff = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllStaff();
      setData(res.data.find((s) => s._id === id));
    };
    fetch();
  }, [id]);

  const handleUpdate = async (formData) => {
    await updateStaff(id, formData);
    navigate("/admin/staff");
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex items-center gap-2">
          <Pencil className="text-yellow-600" />
          <h2 className="text-2xl font-bold">Edit Staff</h2>
        </div>

        <StaffForm initialData={data} onSubmit={handleUpdate} />
      </div>
    </DashboardLayout>
  );
};

export default EditStaff;