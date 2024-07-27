import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../context/apiConfig";
import axios from "axios";
import Loading from "./Loading";

const ArticleDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/post/${id}`);
        setPost(response.data.post);
      } catch (error) {
        console.error("Error fetching post details", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <Loading />;

  // Construct the full URL for the image
  const imageUrl = post.imagelink
    ? post.imagelink
    : "https://via.placeholder.com/150";

  return (
    <div className="mt-20 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center">
              <div className="bg-slate-300 w-12 h-12 flex items-center justify-center rounded-full text-2xl">
                {post.authorName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-bold">{post.authorName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
              {post.title}
            </h1>
            <p className="text-gray-700 text-base sm:text-lg md:text-xl">
              {post.content}
            </p>
          </div>
          <div className="ml-6 flex-shrink-0">
            <img
              src={imageUrl}
              alt="Post"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-96 md:h-64 object-cover rounded-lg"
            />
          </div>
        </div>
        <hr className="border-t border-gray-200" />
      </div>
    </div>
  );
};

export default ArticleDetails;
