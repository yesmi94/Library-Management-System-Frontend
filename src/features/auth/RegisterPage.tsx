import { RegisterForm } from "@/components/layout/auth/registerForm";
import { RegisterSchema } from "@/lib/registerSchema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterResponse {
  success: boolean;
  message: string;
  errors: string[] | null;
  data: any;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole: number) => {
    setRole(selectedRole);
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = { name, username, password, role };

    const validation = RegisterSchema.safeParse(formData);

    if (!validation.success) {
      const firstError = validation.error.errors[0]?.message || "Invalid input";
      setError(firstError);
      return;
    }

    try {
      const response = await fetch("http://localhost:5014/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, role }),
      });

      let result: RegisterResponse;

      try {
        result = await response.json();
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Registration failed.");
      }

      // Optional: store values locally
      localStorage.setItem("role", role.toString());
      localStorage.setItem("name", name);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      // Navigate after success
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred. Registration unsuccessful.");
    }
  };

  return (
    <RegisterForm
      name={name}
      role={role}
      username={username}
      password={password}
      error={error}
      onNameChange={setName}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onRoleSelect={handleRoleSelect}
      onSubmit={handleRegistration}
    />
  );
}
