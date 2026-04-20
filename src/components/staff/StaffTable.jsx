const StaffTable = ({ data, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow">
      <table className="w-full">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Emp ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((s) => (
            <tr key={s._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{s.name}</td>
              <td>{s.email}</td>
              <td>{s.role}</td>
              <td>{s.employeeId}</td>

              <td className="space-x-2">
                <button onClick={() => onView(s)} className="text-blue-600">View</button>
                <button onClick={() => onEdit(s._id)} className="text-yellow-600">Edit</button>
                <button onClick={() => onDelete(s._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;