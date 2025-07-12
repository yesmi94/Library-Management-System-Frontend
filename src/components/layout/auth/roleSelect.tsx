import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface RoleSelectProps {
  onSelect: (role: number) => void;
}

export function RoleSelect({ onSelect }: RoleSelectProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleSelect = (role: string) => {
    setSelectedRole(role);
    onSelect(Number(role)); // Convert to number before passing up
  };

  return (
    <Select value={selectedRole} onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Your Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Your Role</SelectLabel>
          <SelectItem value="0">Member</SelectItem>
          <SelectItem value="1">Management Staff</SelectItem>
          <SelectItem value="2">Minor Staff</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}



