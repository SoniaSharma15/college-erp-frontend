const CredentialsModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[350px] text-center">
        <h2 className="text-xl font-bold mb-3">Employee Created 🎉</h2>

        <p><b>ID:</b> {data.employeeId}</p>
        <p><b>Email:</b> {data.email}</p>
        <p><b>Password:</b> {data.password}</p>

        <p className="text-red-500 mt-2">Save this password!</p>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CredentialsModal;