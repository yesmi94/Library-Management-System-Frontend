import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Plus,
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/customHooks/useRole";
import Navbar from "./navbar";

useRole();

export default function HomePage() {
  const { isMember, isManagement, isMinorStaff } = useRole();
  const navigate = useNavigate();
  const [, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getRoleInfo = () => {
    if (isManagement)
      return {
        title: "Management Dashboard",
        subtitle: "Oversee library operations and manage resources",
        icon: <Users className="h-8 w-8 text-[#4C5B8F]" />,
        gradient: "from-[#CBD5E1]/40 to-[#4C5B8F]/40",
      };
    if (isMinorStaff)
      return {
        title: "Staff Portal",
        subtitle: "Access member records and assist visitors",
        icon: <BookOpen className="h-8 w-8 text-[#4C5B8F]" />,
        gradient: "from-[#E0F2F1]/40 to-[#4C5B8F]/40",
      };
    return {
      title: "Member Portal",
      subtitle: "Discover, borrow, and explore our collection",
      icon: <Search className="h-8 w-8 text-[#4C5B8F]" />,
      gradient: "from-[#F1F5F9]/40 to-[#CBD5E1]/40",
    };
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#F9FAFB] to-[#E2E8F0] overflow-hidden pt-20">
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4 py-8">
        <div className="w-full max-w-4xl pb-20">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white shadow-md rounded-full border border-[#CBD5E1]">
                <Sparkles className="h-12 w-12 text-[#4C5B8F] animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4C5B8F] to-[#5A6BAE] mb-6 pb-10">
              Welcome to LibraryHub
            </h1>
            <p className="text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
              Your gateway to endless knowledge and discovery
            </p>
          </div>

          {/* Main Dashboard Card */}
          <Card className="bg-white/80 backdrop-blur-md border border-[#CBD5E1] shadow-xl rounded-3xl overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${roleInfo.gradient}`} />

            <CardHeader className="pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-white rounded-2xl border border-[#CBD5E1] shadow-sm">
                  {roleInfo.icon}
                </div>
              </div>
              <CardTitle className="text-3xl text-center font-bold text-[#2D2D2D]">
                {roleInfo.title}
              </CardTitle>
              <p className="text-[#475569] text-center text-lg mt-2">
                {roleInfo.subtitle}
              </p>
            </CardHeader>

            <CardContent className="space-y-8 pb-20">
              {/* Member View */}
              {isMember && (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Browse Collection",
                      icon: <BookOpen className="h-8 w-8 text-[#4C5B8F] mb-4" />,
                      desc: "Explore thousands of books across all genres",
                      path: "/books",
                      btnText: "Browse Books",
                    },
                    {
                      title: "Borrowed Books",
                      icon: <Search className="h-8 w-8 text-[#4C5B8F] mb-4" />,
                      desc: "Find the books you have borrowed",
                      path: "/borrowedbooks",
                      btnText: "View Now",
                    },
                  ].map((item) => (
                    <div
                      key={item.path}
                      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-[#CBD5E1] hover:border-[#4C5B8F] transition-all duration-300"
                    >
                      {item.icon}
                      <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#475569] mb-4">{item.desc}</p>
                      <Button
                        className="bg-gradient-to-r from-[#4C5B8F] to-[#5A6BAE] hover:from-[#5A6BAE] hover:to-[#4C5B8F] text-white border border-[#4C5B8F] group"
                        onClick={() => navigate(item.path)}
                      >
                        {item.btnText}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Management View */}
              {isManagement && (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Add New Book",
                      icon: <Plus className="h-8 w-8 text-[#4C5B8F] mb-4" />,
                      desc: "Expand the library collection",
                      path: "/addbook",
                      btnText: "Add Book",
                    },
                    {
                      title: "Manage Users",
                      icon: <Users className="h-8 w-8 text-[#4C5B8F] mb-4" />,
                      desc: "View and manage member accounts",
                      path: "/persons",
                      btnText: "Person List",
                    },
                  ].map((item) => (
                    <div
                      key={item.path}
                      className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-[#CBD5E1] hover:border-[#4C5B8F] transition-all duration-300"
                    >
                      {item.icon}
                      <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[#475569] mb-4">{item.desc}</p>
                      <Button
                        className="bg-gradient-to-r from-[#4C5B8F] to-[#5A6BAE] hover:from-[#5A6BAE] hover:to-[#4C5B8F] text-white border border-[#4C5B8F] group"
                        onClick={() => navigate(item.path)}
                      >
                        {item.btnText}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Minor Staff View */}
              {isMinorStaff && (
                <div className="flex justify-center">
                  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-[#CBD5E1] hover:border-[#4C5B8F] transition-all duration-300 max-w-md">
                    <Users className="h-8 w-8 text-[#4C5B8F] mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-[#2D2D2D] mb-2 text-center">
                      Member Records
                    </h3>
                    <p className="text-[#475569] mb-4 text-center">
                      Access and manage member information
                    </p>
                    <Button
                      className="bg-gradient-to-r from-[#4C5B8F] to-[#5A6BAE] hover:from-[#5A6BAE] hover:to-[#4C5B8F] text-white border border-[#4C5B8F] w-full group"
                      onClick={() => navigate("/persons")}
                    >
                      Person List
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

