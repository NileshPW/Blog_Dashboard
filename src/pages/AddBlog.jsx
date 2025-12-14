// import { useState } from "react";

// export default function AddBlog() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     author: "",
//     image: "",
//     publishDate: "",
//     status: "Draft",
//   });

//   const [preview, setPreview] = useState("");

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   }

//   function handleImage(e) {
//   const file = e.target.files[0];
//   if (!file) return;

//   if (!["image/jpeg", "image/png"].includes(file.type)) {
//     alert("Only JPG or PNG allowed");
//     return;
//   }

//   if (file.size > 1024 * 1024) {
//     alert("Image must be less than 1MB");
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = () => {
//     const img = new Image();
//     img.src = reader.result;

//     img.onload = () => {
//       const canvas = document.createElement("canvas");

//       // ✅ Resize logic
//       const MAX_WIDTH = 600;
//       const scale = MAX_WIDTH / img.width;

//       canvas.width = MAX_WIDTH;
//       canvas.height = img.height * scale;

//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

//       // ✅ Compressed image
//       const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

//       setFormData({ ...formData, image: compressedBase64 });
//       setPreview(compressedBase64);
//     };
//   };

//   reader.readAsDataURL(file);
// }


//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!formData.title || !formData.description) {
//       alert("Title and Description are required");
//       return;
//     }

//     const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

//     const newBlog = {
//       ...formData,
//       id: Date.now(),
//     };

//     localStorage.setItem("blogs", JSON.stringify([...blogs, newBlog]));
//     alert("Blog saved successfully");

//     setFormData({
//       title: "",
//       description: "",
//       category: "",
//       author: "",
//       image: "",
//       publishDate: "",
//       status: "Draft",
//     });
//     setPreview("");
//   }

//   return (
//     <div className="max-w-2xl bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Add Blog</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           name="category"
//           placeholder="Category"
//           value={formData.category}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           name="author"
//           placeholder="Author"
//           value={formData.author}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <input
//           type="date"
//           name="publishDate"
//           value={formData.publishDate}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option>Draft</option>
//           <option>Published</option>
//         </select>

//         <input type="file" accept="image/*" onChange={handleImage} />

//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             className="h-32 rounded border"
//           />
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Save Blog
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AddBlog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editId = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    image: "",
    publishDate: "",
    status: "Draft",
  });

  const [preview, setPreview] = useState("");

  // 🔹 Load blog data in edit mode
  useEffect(() => {
    if (editId) {
      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const blogToEdit = blogs.find((b) => b.id === Number(editId));

      if (blogToEdit) {
        setFormData(blogToEdit);
        setPreview(blogToEdit.image);
      }
    }
  }, [editId]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // 🔹 Image resize + compress
  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Only JPG or PNG allowed");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Image must be less than 1MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        const scale = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        setFormData({ ...formData, image: compressedBase64 });
        setPreview(compressedBase64);
      };
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Title and Description are required");
      return;
    }

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    let updatedBlogs;

    if (editId) {
      // UPDATE BLOG
      updatedBlogs = blogs.map((blog) =>
        blog.id === Number(editId)
          ? { ...formData, id: blog.id }
          : blog
      );
    } else {
      // ADD NEW BLOG
      updatedBlogs = [...blogs, { ...formData, id: Date.now() }];
    }

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    alert(editId ? "Blog updated successfully" : "Blog saved successfully");

    navigate("/");
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {editId ? "Edit Blog" : "Add Blog"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Draft</option>
          <option>Published</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImage} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-32 rounded border"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Blog" : "Save Blog"}
        </button>
      </form>
    </div>
  );
}
