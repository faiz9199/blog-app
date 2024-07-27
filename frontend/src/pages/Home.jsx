import { Link } from "react-router-dom";
import HomeBlogCard from "../components/HomeBlogCard";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Loading from "../components/Loading"

const Home = () => {
  const { posts, loading, error } = useContext(PostContext);
  const { loggedIn, user } = useContext(AuthContext);

  if (loading) {
    return <Loading/>;
  }
  if (error) {
    return <p>Error fetching posts: {error.message}</p>;
  }

  const displayedPosts = posts.slice(0, 6);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
            A Community Space for Shared Reflections and Thoughts
          </h1>
          <p className="text-lg md:text-lg text-gray-600 mb-6 max-w-md mx-auto">
            "Voices of the Valley" - Where your thoughts find their echo. A
            tapestry of insights woven from the voices of many, awaiting your
            unique thread.
          </p>
          <div className="flex flex-col items-center">
            {loggedIn && user ? (
              <h2 className="text-2xl font-bold">Hello {user.name}</h2>
            ) : (
              <>
                <button className="bg-black text-white px-6 py-2 rounded-full font-semibold mb-2">
                  <Link to="/signup">Sign Up</Link>
                </button>
                <p className="text-sm text-gray-600 mb-2">
                  Sign up to get notified when we launch.
                </p>
                <a href="#" className="text-blue-500 underline text-sm">
                  Terms & Conditions
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Latest Posts
        </h2>
        <p className="text-lg text-gray-600">
          The most recent articles from our amazing contributors.
        </p>
      </div>
      <div className="grid grid-cols-1 px-[2vw] md:px-0 md:grid-cols-3 gap-10 my-10">
        {displayedPosts.map((post) => (
          <HomeBlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
