import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cardTheme } from "@/lib/cardTheme";

interface LoginFormProps {
  username: string;
  password: string;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4">
      <Card className={cardTheme.container}>
        <CardHeader className={cardTheme.header}>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className={cardTheme.content}>
          <form onSubmit={onSubmit} className="space-y-6">
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
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className={cardTheme.buttonPrimary}>
              Login
            </Button>
            <div className="text-sm text-[#4C5B8F] mt-2 text-center">
              Not a Member Yet?{" "}
              <a href="/register" className="text-[#5A6BAE] hover:underline">
                Register
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

