import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../context/apiConfig";
import axios from "axios";
import { PostContext } from "../context/PostContext"; // Adjust the path as necessary

const WriteBlog = ({ placeholder }) => {
  const navigate = useNavigate();
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when submission starts
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imagelink", file);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/post/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Blog published successfully!");
        addPost(response.data.post);
        navigate("/blog");
      } else {
        alert("Failed to publish blog");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while publishing the blog");
    } finally {
      setLoading(false); // Set loading to false when submission ends
    }
  };

  return (
    <div className="flex justify-center mt-20 pt-[20px] font-roboto">
      <div className="md:w-[600px] w-[90vw] flex flex-col items-center">
        <h1 className="font-extrabold text-4xl my-2">Create Blog</h1>
        <div className="flex w-full my-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            placeholder="Title"
            type="text"
          />
          <button
            onClick={handleSubmit}
            className="inline-flex items-center text-white bg-black justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ml-2 hover:border-black hover:bg-black hover:text-white border-2 border-black"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
        <div className="flex w-full my-2">
          <input
            onChange={handleFileChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            type="file"
            disabled={loading} // Disable input when loading
          />
        </div>
        {file && (
          <div className="w-full flex justify-center my-2">
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              className="w-2/4 h-auto"
            />
          </div>
        )}
        <div className="w-full">
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[300px] mb-[20px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={placeholder}
            disabled={loading} // Disable textarea when loading
          />
        </div>
        {loading && <p className="text-center text-gray-600">Publishing...</p>}
      </div>
    </div>
  );
};

export default WriteBlog;
