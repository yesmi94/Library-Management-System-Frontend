import { PersonsDisplayTable } from "@/components/layout/persons/personsDisplayTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import Navbar from "../common/navbar";

interface BaseUser {
  id: string;
  name: string;
  role: number;
}

interface Member {
  id: string;
  name: string;
  role: number;
  borrowedBooksNum: number;
}


const StaffAndMembersPage: React.FC = () => {
  const [managementStaff, setManagementStaff] = useState<BaseUser[]>([]);
  const [minorStaff, setMinorStaff] = useState<BaseUser[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        // Fetch Staff
        const personsRes = await fetch("http://localhost:5014/api/persons", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const personsResult = await personsRes.json();
        const persons = personsResult.data;
        setMembers(persons.filter((p: Member) => p.role === 0))
        setManagementStaff(persons.filter((p: BaseUser) => p.role === 1));
        setMinorStaff(persons.filter((p: BaseUser) => p.role === 2));
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="relative z-50">
          <Navbar />
        </div>
      <h1 className="text-3xl font-bold text-center mb-8 pt-20">People Overview</h1>

      <Tabs defaultValue="management" className="w-full max-w-5xl mx-auto">
        <TabsList className="flex justify-center gap-4 mb-6">
          <TabsTrigger value="management">Management Staff</TabsTrigger>
          <TabsTrigger value="minor">Minor Staff</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="management">
          <PersonsDisplayTable title="Management Staff" people={managementStaff} type="staff" />
        </TabsContent>

        <TabsContent value="minor">
          <PersonsDisplayTable title="Minor Staff" people={minorStaff} type="staff" />
        </TabsContent>

        <TabsContent value="members">
          <PersonsDisplayTable title="Library Members" people={members} type="member" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffAndMembersPage;
