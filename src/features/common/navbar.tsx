import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, LibraryBigIcon, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/customHooks/useRole";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const { isMember, isManagement, isMinorStaff } = useRole();
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "Guest";

  const links = [];

  if (isMember) {
    links.push(
      { label: "Home", path: "/" },
      { label: "Books", path: "/books" },
      { label: "Borrowed", path: "/borrowedbooks" }
    );
  }

  if (isManagement) {
    links.push(
      { label: "Home", path: "/" },
      { label: "Add Book", path: "/newbook" },
      { label: "Books", path: "/books" },
      { label: "Users", path: "/persons" }
    );
  }

  if (isMinorStaff) {
    links.push(
      { label: "Home", path: "/" },
      { label: "Member Records", path: "/persons" }
    );
  }


    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("password");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    toast.success("Successfully Logged Out", {
      icon: <CheckCircle className="text-green-500" />
    });
    navigate("/login");
  };

  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#CBD5E1] shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <LibraryBigIcon className="h-7 w-7 text-[#4C5B8F]" />
        <span className="font-semibold text-lg text-[#2D2D2D] tracking-wide">LibraryHub</span>
      </div>

      {/* Nav Links */}
      <div className="flex space-x-2">
        {links.map((link) => (
          <Button
            key={link.label}
            variant="ghost"
            className="text-[#4C5B8F] hover:text-[#2D2D2D] hover:bg-[#F3F4F6] border border-transparent hover:border-[#CBD5E1] rounded-md transition-colors"
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </Button>
        ))}
      </div>

      {/* Profile & Logout */}
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          className="text-[#4C5B8F] hover:text-[#2D2D2D] hover:bg-[#F3F4F6] border border-transparent hover:border-[#CBD5E1] rounded-md transition-colors"
          onClick={() => navigate("/profilepage")}
        >
          <User className="mr-1 w-4 h-4 text-[#4C5B8F]" />
          {name}
        </Button>
        <Button
          variant="ghost"
          className="text-[#4C5B8F] hover:text-[#2D2D2D] hover:bg-[#F3F4F6] border border-transparent hover:border-[#CBD5E1] rounded-md transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="mr-1 w-4 h-4 text-[#4C5B8F]" />
          Logout
        </Button>
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;

