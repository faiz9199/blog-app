import React, { createContext, useState, useEffect } from "react";
import BASE_URL from "./apiConfig";
import axios from "axios";

// Create the context
export const PostContext = createContext();

// Create the provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/post/get-posts`);
      setPosts(response.data.posts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new post
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, loading, error, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
