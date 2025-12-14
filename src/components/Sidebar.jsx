import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen">
      <h1 className="text-2xl font-bold px-6 py-5 border-b border-slate-700 text-white">
        Blog Admin
      </h1>

      <nav className="p-4 space-y-2">
        <Link to="/" className={linkClass("/")}>
          Dashboard
        </Link>

        <Link to="/add-blog" className={linkClass("/add-blog")}>
          Add Blog
        </Link>
      </nav>
    </aside>
  );
}
