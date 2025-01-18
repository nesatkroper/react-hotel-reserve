import { TableCell, TableRow } from "@/components/ui/table";

const NoData = ({ cols }) => {
  return (
    <>
      <TableRow>
        <TableCell colspan={cols} className="text-lg font-semibold text-center">
          No Data here 😢
        </TableCell>
      </TableRow>
    </>
  );
};

export default NoData;
