export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li>
            <a href="/admin/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/admin/employees">Employees</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-4 bg-gray-50">{children}</main>
    </div>
  );
}
