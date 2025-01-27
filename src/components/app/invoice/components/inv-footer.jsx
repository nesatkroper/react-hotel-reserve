import { Separator } from "@/components/ui/separator";
import PropTypes from "prop-types";

const InvoiceFooter = (props) => {
  const { method } = props;

  return (
    <div className="mt-2">
      {method == "leave" ? (
        <div className="flex flex-col h-[150px] justify-end pb-1">
          <p>Name : _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _</p>
          <Separator />
        </div>
      ) : (
        ""
      )}
      <p>+855 010 280 202</p>
      <p>Thanks you and see you again !</p>
      <p>
        Systems By Developer. <b className="underline">SUON Phanun</b>
      </p>
    </div>
  );
};

InvoiceFooter.propTypes = {
  method: PropTypes.string,
};

export default InvoiceFooter;
