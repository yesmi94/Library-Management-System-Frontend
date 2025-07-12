import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleSelect } from "./roleSelect";

const cardTheme = {
  container:
    "shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md border border-[#CBD5E1] bg-[#F9FAFB] rounded-xl",
  header:
    "bg-gradient-to-r from-[#4C5B8F] to-[#5A6BAE] text-white rounded-t-xl p-4 font-semibold tracking-wide",
  content:
    "space-y-4 text-sm text-[#2D2D2D] p-6",
  buttonPrimary:
    "w-full bg-gradient-to-r from-[#4C5B8F] to-[#5A6BAE] hover:from-[#5A6BAE] hover:to-[#4C5B8F] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-[#4C5B8F]"
};

interface RegisterFormProps {
  name: string;
  role: number;
  username: string;
  password: string;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onRoleSelect: (value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onNameChange,
  onRoleSelect,
  onSubmit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4">
      <Card className={cardTheme.container}>
        <CardHeader className={cardTheme.header}>
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent className={cardTheme.content}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-[#2D2D2D] pb-3">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                required
                className="bg-white border border-[#CBD5E1] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4C5B8F]"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-[#2D2D2D] pb-3">
                Choose Your Role
              </Label>
              <RoleSelect onSelect={onRoleSelect} />
            </div>
            <div>
              <Label htmlFor="username" className="text-[#2D2D2D] pb-3">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                required
                className="bg-white border border-[#CBD5E1] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4C5B8F]"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-[#2D2D2D] pb-3">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                required
                className="bg-white border border-[#CBD5E1] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4C5B8F]"
                placeholder="Enter your password"
              />
            </div>
            <div className="text-sm text-[#4C5B8F] mt-2 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-[#5A6BAE] hover:underline">
                Login
              </a>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className={cardTheme.buttonPrimary}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
