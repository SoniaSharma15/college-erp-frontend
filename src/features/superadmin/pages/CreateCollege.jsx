import { useState } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const CreateCollege = () => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    adminName: "",
    adminEmail: "",
    adminPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/college/create", form);

      alert("College Created ✅");
      console.log(res.data);

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-xl mb-4">Create College</h2>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">

        <input name="name" placeholder="College Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="code" placeholder="Code" onChange={handleChange} className="w-full p-2 border" />

        <input name="adminName" placeholder="Admin Name" onChange={handleChange} className="w-full p-2 border" />
        <input name="adminEmail" placeholder="Admin Email" onChange={handleChange} className="w-full p-2 border" />
        <input name="adminPassword" placeholder="Admin Password" onChange={handleChange} className="w-full p-2 border" />

        <button className="bg-green-500 text-white p-2 w-full">
          Create
        </button>

      </form>
    </DashboardLayout>
  );
};

export default CreateCollege;