import React, { useContext } from "react";
import BlogCard from "../components/BlogCard";
import { PostContext } from "../context/PostContext";
import Loading from "../components/Loading";

const Blog = () => {
  const { posts, loading, error } = useContext(PostContext);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error fetching posts: {error.message}</p>;
  }

  return (
    <div className="mt-10">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Blog;
