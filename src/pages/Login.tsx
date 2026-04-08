import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    // 👉 if login successful
    if (res.ok) {
      setSuccess("Login successful");
      setError("data.message");
      // later we’ll store token here
      navigate("/dashboard");
    } else {
      setError(data.message);
      setSuccess("data.message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-background">
      <div className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg border bg-input focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-lg text-white gradient-primary hover:opacity-90 transition">
          Login
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}

        <p className="text-center mt-4 text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
