export default function AdminHeader({ onLogout }) {
    return (
      <header className="bg-[#1a2332] text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>
    );
  }