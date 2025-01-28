import { TableCell, TableRow } from "@/components/ui/table";
import { PropTypes } from "prop-types";

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

NoData.propTypes = {
  cols: PropTypes.number,
};

export default NoData;
