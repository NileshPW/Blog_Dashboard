import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-blog" element={<AddBlog />} />
      </Routes>
    </Layout>
  );
}

export default App;
