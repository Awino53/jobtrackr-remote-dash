import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    // 👉 if signup successful
    if (res.ok) {
      // later we’ll store token here
      navigate("/login");
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center gradient-background">
    <div className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Signup
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
        onClick={handleSignup}
        className="w-full p-3 rounded-lg text-white gradient-primary hover:opacity-90 transition"
      >
        Create Account
      </button>

      <p className="text-center mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  </div>
  );
};

export default Signup;
