import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Staff {
  id: string;
  name: string;
}

interface Member {
  id: string;
  name: string;
  borrowedBooksNum: string;
}

interface PeopleTableProps {
  title: string;
  people: Staff[] | Member[];
  type: "staff" | "member";
}

const tableTheme = {
  container: "bg-[#F9FAFB] rounded-xl shadow-md p-6 border border-[#CBD5E1]",
  title: "text-2xl font-semibold mb-6 text-[#4C5B8F]",
  headerRow: "bg-gradient-to-r from-[#4C5B8F] to-[#5A6BAE]",
  headerCell:
    "text-white px-4 py-3 font-semibold text-sm select-none text-center",
  headerCellLeft:
    "text-white px-4 py-3 font-semibold text-sm select-none text-left",
  rowHover: "hover:bg-gray-50",
  cell: "px-4 py-3 text-sm text-[#2D2D2D]",
  cellMono: "font-mono",
  noData: "text-center text-gray-500 italic py-8 px-4",
};

export const PersonsDisplayTable: React.FC<PeopleTableProps> = ({
  title,
  people,
  type,
}) => {
  return (
    <div className={tableTheme.container}>
      <h2 className={tableTheme.title}>{title}</h2>
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed min-w-full">
          <TableHeader>
            <TableRow className={tableTheme.headerRow}>
              <TableHead className={tableTheme.headerCell} style={{ width: "3rem" }}>
                #
              </TableHead>
              <TableHead
                className={`${type === "member" ? tableTheme.headerCellLeft : tableTheme.headerCellLeft}`}
                style={{ width: type === "member" ? "40%" : "66%" }}
              >
                ID
              </TableHead>
              <TableHead
                className={`${type === "member" ? tableTheme.headerCellLeft : tableTheme.headerCellLeft}`}
                style={{ width: type === "member" ? "40%" : "34%" }}
              >
                Name
              </TableHead>
              {type === "member" && (
                <TableHead className={tableTheme.headerCell} style={{ width: "20%" }}>
                  Books Borrowed
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.length > 0 ? (
              people.map((person: any, index) => (
                <TableRow key={person.id} className={tableTheme.rowHover}>
                  <TableCell className={`text-center font-medium ${tableTheme.cell}`}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className={`${tableTheme.cell} ${tableTheme.cellMono} text-left`}
                  >
                    {person.id}
                  </TableCell>
                  <TableCell className={`${tableTheme.cell} text-left`}>
                    {person.name}
                  </TableCell>
                  {type === "member" && (
                    <TableCell className={`text-center font-medium ${tableTheme.cell}`}>
                      {person.borrowedBooksNum}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={type === "member" ? 4 : 3}
                  className={tableTheme.noData}
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};



