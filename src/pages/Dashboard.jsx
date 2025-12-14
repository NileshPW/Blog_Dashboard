import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const ITEMS_PER_PAGE = 5;


export default function Dashboard() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();


    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
        setBlogs(storedBlogs);
    }, []);




    function handleDelete(id) {
        const updated = blogs.filter((b) => b.id !== id);
        setBlogs(updated);
        localStorage.setItem("blogs", JSON.stringify(updated));
    }

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || blog.status === statusFilter;

        return matchesSearch && matchesStatus;
    });


    // pagination logic
    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBlogs = filteredBlogs.slice(
        start,
        start + ITEMS_PER_PAGE
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            {/* Search */}
            <input
                placeholder="Search by title..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
                className="border p-2 rounded mb-4 w-full md:w-1/3"
            />

            <select
                value={statusFilter}
                onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                }}
                className="border p-2 rounded mb-4 ml-0 md:ml-4 cursor-pointer"
            >
                <option value="All">All</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
            </select>


            {paginatedBlogs.length === 0 ? (
                <p className="text-gray-600">No blogs found.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {paginatedBlogs.map((blog) => (
                        <div key={blog.id} className="bg-white p-4 rounded shadow">
                            {blog.image && (
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="h-40 w-full object-cover rounded mb-2"
                                />
                            )}

                            <h2 className="text-lg font-semibold">{blog.title}</h2>
                            <p className="text-sm text-gray-600">
                                {blog.category} | {blog.author}
                            </p>
                            {blog.publishDate && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {new Date(blog.publishDate).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            )}


                            <p className="mt-2 text-gray-700 line-clamp-3">
                                {blog.description}
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <span
                                    className={`text-sm font-medium ${blog.status === "Published"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                        }`}
                                >
                                    {blog.status}
                                </span>



                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/add-blog?id=${blog.id}`)}
                                        className="text-blue-600 text-sm hover:underline"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this blog?")) {
                                                handleDelete(blog.id);
                                            }
                                        }}
                                        className="text-red-600 text-sm hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex gap-2 justify-center mt-6">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1
                                ? "bg-blue-600 text-white"
                                : ""
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}


