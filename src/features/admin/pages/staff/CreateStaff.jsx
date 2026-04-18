import StaffForm from "../../../../components/staff/StaffForm";
import CredentialsModal from "../../../../components/staff/CredentialsModal";
import { createStaff } from "../../../../services/staff.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStaff = () => {
  const [cred, setCred] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const res = await createStaff(data);
    setCred(res.data.credentials);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Create Staff</h2>

      <StaffForm onSubmit={handleSubmit} />

      <CredentialsModal
        data={cred}
        onClose={() => {
          setCred(null);
          navigate("/admin/staff");
        }}
      />
    </div>
  );
};

export default CreateStaff;