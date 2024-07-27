import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WriteBlog from "./pages/WriteBlog";
import Blog from "./pages/Blog";
import { PostProvider } from "./context/PostContext";
import PrivateRoute from "./components/PivateRoute";
import ArticleDetails from "./components/ArticleDetails";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <div className="font-roboto container mx-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Route>
            <Route path="/write" element={<WriteBlog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleDetails />} />
          </Routes>
        </div>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
