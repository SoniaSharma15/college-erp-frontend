import { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const CollegesList = () => {
  const [colleges, setColleges] = useState([]);

  const fetchColleges = async () => {
    try {
      const res = await axios.get("/college/all");
      setColleges(res.data.colleges);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-xl mb-4">All Colleges</h2>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Code</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>

          <tbody>
            {colleges.map((col) => (
              <tr key={col._id}>
                <td className="p-2 border">{col.name}</td>
                <td className="p-2 border">{col.code}</td>
                <td className="p-2 border">
                  {new Date(col.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default CollegesList;