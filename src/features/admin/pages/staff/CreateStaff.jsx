import { UserPlus } from "lucide-react";
import StaffForm from "../../../../components/staff/StaffForm";
import CredentialsModal from "../../../../components/staff/CredentialsModal";
import { createStaff } from "../../../../services/staff.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../components/layout/DashboardLayout";

const CreateStaff = () => {
  const [cred, setCred] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const res = await createStaff(data);
    setCred(res.data.credentials);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex items-center gap-2">
          <UserPlus className="text-green-600" />
          <h2 className="text-2xl font-bold">Create Staff</h2>
        </div>

        <StaffForm onSubmit={handleSubmit} />

        <CredentialsModal
          data={cred}
          onClose={() => {
            setCred(null);
            navigate("/admin/staff");
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateStaff;