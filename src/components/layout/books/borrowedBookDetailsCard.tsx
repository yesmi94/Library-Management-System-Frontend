// components/books/BookDetailsDisplayCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Tag } from "lucide-react";
import { Button } from "../../ui/button";
import { useState } from "react";
import { ConfirmationDialog } from "../common/confirmationDialog";
import { cardTheme } from "@/lib/cardTheme";

export interface Book {
  id: string;
  borrowingId: string,
  title: string;
  author: string;
  year: number;
  category: string;
  isAvailable: true | false;
}

interface BookDetailsDisplayCardProps {
  book: Book;
  onReturn: (borrowingId: string) => void;
}

export const BorrowedBookDetailsCard: React.FC<BookDetailsDisplayCardProps> = ({ book, onReturn}) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBorrowClick = () => {
    setIsDialogOpen(true);
  }

  const handleConfirm = () => {
    onReturn(book.borrowingId)
    console.log("Reached")
    setIsDialogOpen(false);
  }

  return (
    <Card className={cardTheme.container}>
      <CardHeader className={cardTheme.header}>
        <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className={cardTheme.content}>
        <div className={cardTheme.infoBlock}>
          <User className={cardTheme.Icons}/>
          <span>{book.author}</span>
        </div>
        <div className={cardTheme.infoBlock}>
          <Calendar className={cardTheme.Icons}/>
          <span>{book.year}</span>
        </div>
        <div className={cardTheme.infoBlock}>
          <Tag className={cardTheme.Icons} />
          <span>{book.category}</span>
        </div>
        {!book.isAvailable && (
          <Button onClick={handleBorrowClick} className={cardTheme.buttonPrimary}>
            Return
          </Button>
        )}
        
      </CardContent>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => handleConfirm()}
        message = "Your are about to return this Book. Do you want to continue ?"
        dialogTitle="Return the Book"/>
    </Card>
    
  );
};