import Loading from "@/assets/mp4/Loading.mp4";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PropTypes } from "prop-types";

const AppLoading = ({ cols }) => {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell colspan={cols} className="w-full flex justify-center">
            <video className="w-[300px] min-w-60" autoPlay loop muted>
              <source src={Loading} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

AppLoading.propTypes = {
  cols: PropTypes.number,
};

export default AppLoading;
