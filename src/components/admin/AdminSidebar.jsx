export default function AdminSidebar({ activeSection, setActiveSection }) {
  const sections = [
    { id: "announcements", label: "Manage Announcements" },
    { id: "notifications", label: "Manage Notifications" },
    { id: "locations", label: "Manage Locations" }
  ];

  return (
    <aside className="w-64 bg-[#1a2332] min-h-screen text-white p-4">
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <button
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left py-2 px-4 rounded ${
                  activeSection === section.id 
                    ? "bg-blue-600 font-medium" 
                    : "hover:bg-gray-700"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}