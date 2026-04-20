import { useEffect, useState } from "react";
import StaffForm from "../../../../components/staff/StaffForm";
import { getAllStaff, updateStaff } from "../../../../services/staff.service";
import { useParams, useNavigate } from "react-router-dom";

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

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2>Edit Staff</h2>
      <StaffForm initialData={data} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditStaff;