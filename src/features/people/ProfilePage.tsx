import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Navbar from "../common/navbar";

// Simulated user (replace with real auth or context data)
const nameOfTheUser = localStorage.getItem("name") || "Guest";

export default function ProfilePage() {
  const [, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const firstInitial = nameOfTheUser.charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#F9FAFB] to-[#E2E8F0] overflow-hidden pt-20">
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4 py-8">
        <div className="w-full max-w-xl">
          <Card className="bg-white/80 backdrop-blur-md border border-[#CBD5E1] shadow-xl rounded-3xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-[#CBD5E1]/40 to-[#4C5B8F]/40" />

            <CardHeader className="pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-[#4C5B8F] text-white flex items-center justify-center text-3xl font-bold shadow-lg">
                  {firstInitial}
                </div>
              </div>
              <CardTitle className="text-3xl text-center font-bold text-[#2D2D2D]">
                {nameOfTheUser}
              </CardTitle>
              <p className="text-[#475569] text-center text-lg mt-2">
                Profile Overview
              </p>
            </CardHeader>

            <CardContent>
              <div className="text-center text-[#475569] text-base">
                This is your personal profile page. You can view your details and manage your account here in future updates.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
