import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCategorySelect } from "./bookCategorySelect";
import { cardTheme } from "@/lib/cardTheme";

interface AddBookFormProps {
  title: string;
  author: string;
  year: string;
  bookCategory: string;
  availability: boolean;
  error: string;
  onTitleChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({
  title,
  author,
  year,
  error,
  onTitleChange,
  onAuthorChange,
  onYearChange,
  onCategoryChange,
  onSubmit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB] px-4">
      <Card className={cardTheme.container}>
        <CardHeader className={cardTheme.header}>
          <CardTitle className="text-2xl">Add a New Book</CardTitle>
        </CardHeader>
        <CardContent className={cardTheme.content}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-[#2D2D2D] pb-3">
                Title of the Book
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                required
                className="bg-white border border-[#CBD5E1] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4C5B8F]"
                placeholder="Enter book title"
              />
            </div>

            <div>
              <Label htmlFor="author" className="text-[#2D2D2D] pb-3">
                Author of the Book
              </Label>
              <Input
                id="author"
                type="text"
                value={author}
                onChange={(e) => onAuthorChange(e.target.value)}
                required
                className="bg-white border border-[#CBD5E1] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4C5B8F]"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-[#2D2D2D] pb-3">
                Select the Book Category
              </Label>
              <BookCategorySelect 
                onSelect={onCategoryChange}
                
              />
            </div>

            <div>
              <Label htmlFor="year" className="text-[#2D2D2D] pb-3">
                Publication Year
              </Label>
              <Input
                id="year"
                value={year}
                onChange={(e) => onYearChange(e.target.value)}
                required
                className="bg-white border border-[#CBD5E1] text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:ring-1 focus:ring-[#4C5B8F]"
                placeholder="Enter publication year"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className={cardTheme.buttonPrimary}>
              Save Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
