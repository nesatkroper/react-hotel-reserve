import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTrigger } from "@/components/ui/dialog";
import { Ellipsis, ListCollapse, Pen, Trash } from "lucide-react";

const TableOption = ({ optionID, onDelete }) => {
  const handleDelete = () => {
    onDelete(optionID);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center">Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-blue-600">
            <ListCollapse />
            Detail
          </DropdownMenuItem>

          <DropdownMenuItem className="text-yellow-600">
            <Pen />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleDelete()}
            className="text-red-600"
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableOption;
