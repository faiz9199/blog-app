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
    <div className="mt-20 flex justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col items-center p-6 gap-6">
          <img
            src={imageUrl}
            alt="Post"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
            className="w-full h-auto max-h-[400px] object-cover rounded-lg"
          />

          <div className="flex gap-4 items-center self-start">
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

          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl self-start">
            {post.title}
          </h1>

          <div
            className="text-gray-700 text-base sm:text-lg md:text-xl self-start w-full"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
        <hr className="border-t border-gray-200" />
      </div>
    </div>
  );
};

export default ArticleDetails;
