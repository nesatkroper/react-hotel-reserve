import { CardHeader, CardTitle } from "@/components/ui/card";
import { defimg } from "@/utils/resize-crop-image";
import { PropTypes } from "prop-types";

const InvoiceHeader = (props) => {
  const { logo, brand } = props;
  return (
    <CardHeader className="pb-2">
      <CardTitle className=" flex flex-col items-center gap-3">
        <p className="text-xl">{brand}</p>
        <img
          src={logo || defimg}
          onError={defimg}
          alt="logo"
          className="w-[120px] rounded-xl"
        />
        <p className="text-lg underline">INVOICE</p>
      </CardTitle>
    </CardHeader>
  );
};

InvoiceHeader.propTypes = {
  logo: PropTypes.string,
  brand: PropTypes.string,
};

InvoiceHeader.defaultProps = {
  brand: "Hotel Pom Jee Heang",
};

export default InvoiceHeader;
