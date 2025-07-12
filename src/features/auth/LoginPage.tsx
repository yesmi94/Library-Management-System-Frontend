import {LoginForm }  from '../../components/layout/auth/loginForm'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface LoginResponse {
  success: boolean;
  message: string;
  errors: string[] | null;
  data: {
    token: string;
    name: string;
    role: number;
  };
}

export const LoginPage = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
    setError("Username and password are required.");
    return;
  }

    try {
      const response = await fetch("http://localhost:5014/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password}),
      });

        let result: LoginResponse;

      try {
        result = await response.json();
        console.log("Login response:", result);

      } catch (jsonError) {
        throw new Error("Invalid response from server");
      }
      if (!response.ok || !result.success) {
        throw new Error(result?.message || "Login failed");
        
      }

      const { token, name, role } = result.data;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role.toString());
      console.log(localStorage.getItem("role"));

      navigate("/");
    } catch (err: any) {
      setError(err.message || "An error occurred. Login unsuccessful");
    }
  };

  return (
    <LoginForm
      username={username}
      password={password}
      error={error}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
    />
  );
};


