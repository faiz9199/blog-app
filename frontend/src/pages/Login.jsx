import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Quote from "../components/Quote";
import Loading from "../components/Loading"

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = () => {
    login(email, password);
    navigate('/blog')
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Login to your account</h2>
          <p className="mb-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123456"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                onClick={handleLogin}
                className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center bg-white">
        <Quote />
      </div>
    </div>
  );
};

export default Login;
