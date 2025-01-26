import PropTypes from "prop-types";

const InvoiceContent = (props) => {
  const { table, ref, optD, optT, date, payment } = props;
  return (
    <div className="flex flex-col px-1 mb-2">
      <div className="flex justify-between">
        <p>TABLE :</p>
        <p className="font-bold">{table || "Z6 T06"}</p>
      </div>
      <div className="flex justify-between">
        <p>INVNUM :</p>
        <p className="font-bold">{ref || "REF.SR-000-0001"}</p>
      </div>
      <div className="flex justify-between">
        <p>OPE-D :</p>
        <p className="font-bold">{optD || "0005"}</p>
      </div>
      <div className="flex justify-between">
        <p>OPT Type :</p>
        <p className="font-bold">{optT || "HOTEL"}</p>
      </div>
      <div className="flex justify-between">
        <p>DATATIME :</p>
        <p className="font-bold">
          {date ||
            new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </p>
      </div>
      <div className="flex justify-between">
        <p>PAYMENT METHOD :</p>
        <p className="font-bold">{payment || "Cash"}</p>
      </div>
    </div>
  );
};

InvoiceContent.propTypes = {
  table: PropTypes.string.isRequired,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  optD: PropTypes.string.isRequired,
  optT: PropTypes.string.isRequired,
  date: PropTypes.any,
  payment: PropTypes.string,
};

export default InvoiceContent;
