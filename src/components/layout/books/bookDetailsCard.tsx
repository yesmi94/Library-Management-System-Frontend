import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";
import { ConfirmationDialog } from "../common/confirmationDialog";
import { useRole } from "@/customHooks/useRole";
import { cardTheme } from "@/lib/cardTheme";

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
  isAvailable: true | false;
}

interface BookDetailsDisplayCardProps {
  book: Book;
  onBorrow: (bookId: string) => void;
  onDelete: (bookId: string) => void;
}

export const BookDetailsCard: React.FC<BookDetailsDisplayCardProps> = ({
  book,
  onBorrow,
  onDelete,
}) => {
  const badgeVariant = book.isAvailable ? "default" : "destructive";
  const availability = book.isAvailable ? "Available for Borrowing" : "Unavailable";
  const { isMember, isManagement } = useRole();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"borrow" | "delete" | null>(null);

  const openBorrowDialog = () => {
    setActionType("borrow");
    setIsDialogOpen(true);
  };

  const openDeleteDialog = () => {
    setActionType("delete");
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (actionType === "borrow") {
      onBorrow(book.id);
    } else if (actionType === "delete") {
      onDelete(book.id);
    }
    setIsDialogOpen(false);
    setActionType(null);
  };

  return (
    <Card className={cardTheme.container}>
      <CardHeader className={cardTheme.header}>
        <CardTitle className="text-xl font-bold text-center">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className={cardTheme.content}>
        <div className={cardTheme.infoBlock}>
          <User className={cardTheme.Icons}/>
          <span className="font-medium">{book.author}</span>
        </div>
        <div className={cardTheme.infoBlock}>
          <Calendar className={cardTheme.Icons} />
          <span className="font-medium">{book.year}</span>
        </div>
        <div className={cardTheme.infoBlock}>
          <Tag className={cardTheme.Icons} />
          <span className="font-medium">{book.category}</span>
        </div>
        <div className={cardTheme.statusBlock}>
          <span className="font-semibold text-black">Availability:</span>
          <Badge
            variant={badgeVariant}
            className={book.isAvailable ? cardTheme.badgeAvailable : cardTheme.badgeUnavailable}
          >
            {availability}
          </Badge>
        </div>

        {book.isAvailable && isMember && (
          <Button onClick={openBorrowDialog} className={cardTheme.buttonPrimary}>
            Borrow Book
          </Button>
        )}

        {isManagement && book.isAvailable && (
          <Button
            variant="ghost"
            className="text-red-600 hover:text-red-800"
            onClick={openDeleteDialog}
          >
            <Trash2 className="w-6 h-6" />
          </Button>
        )}
      </CardContent>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
        message={
          actionType === "delete"
            ? "You are about to delete this book. Do you want to continue?"
            : "You are about to borrow this book. Do you want to continue?"
        }
        dialogTitle={
          actionType === "delete"
            ? "Delete the Book"
            : "Borrow the Book"
        }

      />
    </Card>
  );
};


