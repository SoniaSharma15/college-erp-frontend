import { useEffect, useState } from "react";

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

const StaffForm = ({ onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    designation: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "",
        designation: initialData.designation || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4 max-w-lg"
    >
      <input
        className={inputCls}
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        className={inputCls}
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        className={inputCls}
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <select
        className={inputCls}
        name="role"
        value={form.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        <option value="ADMIN">ADMIN</option>
        <option value="HOD">HOD</option>
        <option value="FACULTY">FACULTY</option>
        <option value="STAFF">STAFF</option>
      </select>

      <input
        className={inputCls}
        name="designation"
        placeholder="Designation"
        value={form.designation}
        onChange={handleChange}
        required
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default StaffForm;