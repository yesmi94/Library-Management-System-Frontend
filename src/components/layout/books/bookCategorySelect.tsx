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

interface BookCategorySelectProps {
  onSelect: (category: string) => void;
}

export function BookCategorySelect({ onSelect }: BookCategorySelectProps) {
  const [selectedCategory, setselectedCategory] = useState<string>("");

  const handleSelect = (category: string) => {
    setselectedCategory(category);
    onSelect(category);
  };

  return (
    <Select value={selectedCategory} onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select the Book Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Book Category</SelectLabel>
          <SelectItem value="Fiction">Fiction</SelectItem>
            <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
            <SelectItem value="Mystery">Mystery</SelectItem>
            <SelectItem value="Science Fiction">Science Fiction</SelectItem>
            <SelectItem value="Fantasy">Fantasy</SelectItem>
            <SelectItem value="Biography">Biography</SelectItem>
            <SelectItem value="History">History</SelectItem>
            <SelectItem value="Self-Help">Self-Help</SelectItem>
            <SelectItem value="Children">Children</SelectItem>
            <SelectItem value="Young Adult">Young Adult</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}