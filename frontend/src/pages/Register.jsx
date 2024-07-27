import { Link, useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import { AuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    register(name, email, password);
    navigate('/blog')
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
          <p className="mb-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="John Doe"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="123456"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <button
                onClick={handleRegister}
                className="w-full bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign up
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

export default Register;
