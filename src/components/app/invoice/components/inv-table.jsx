import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import PropTypes from "prop-types";
import {
  afterPerDollar,
  cDollar,
  datetimeNow,
  toUnit,
} from "@/utils/dec-format";

const demo = [
  {
    product: "Burger",
    unit: 7,
    qty: 2,
    notes: [{ list: "With extra cheese" }, { list: "Grilled" }],
  },
  {
    product: "Pasta",
    unit: 12,
    qty: 1,
    notes: [{ list: "Creamy Alfredo" }, { list: "With garlic bread" }],
  },
  {
    product: "Pizzar",
    unit: 9,
    qty: 3,
    notes: [{ list: "Large size" }, { list: "Hot Dog" }],
  },
  {
    product: "Burger",
    unit: 7,
    qty: 2,
    notes: [{ list: "With extra cheese" }, { list: "Grilled" }],
  },
];

const InvoiceTable = (props) => {
  const { data, type } = props;

  const totalAmount = data?.reduce(
    (acc, item) => acc + item.unit * item.qty,
    0
  );

  return (
    <div>
      {type == "sale" ? (
        <Table className="border-collapse border-none">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Product</TableHead>
              <TableHead className="text-center">Unit</TableHead>
              <TableHead className="text-center">QTY</TableHead>
              <TableHead className="text-center">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((d, i) => (
              <TableRow key={i} className="!border-none">
                <TableCell className="text-left py-1">
                  <p className="font-medium">{d.product}</p>
                  {d.notes?.map((m, j) => (
                    <p key={j}>- {m.list}</p>
                  ))}
                </TableCell>
                <TableCell className="text-center align-top py-1">
                  {cDollar(d.unit)}
                </TableCell>
                <TableCell className="text-center align-top py-1">
                  {d.qty} pcs
                </TableCell>
                <TableCell className="text-right align-top py-1">
                  {cDollar(d.qty * d.unit)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Room</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <p>Room-101</p>
                <p>- {datetimeNow()}</p>
                <p>- {datetimeNow(4)}</p>
              </TableCell>
              <TableCell className="align-top">{cDollar(29.99)}</TableCell>
              <TableCell className="align-top">
                {toUnit(4, 0, "days")}
              </TableCell>
              <TableCell className="text-right align-top">
                {cDollar(29.99 * 4)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      <Separator />
      <div className="flex flex-col px-1 my-2">
        <div className="flex justify-between font-semibold">
          <p>TOTAL :</p>
          <p className="font-semibold">{cDollar(totalAmount)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>TAX ({toUnit(5, 0, "%")}) :</p>
          <p className="font-semibold">{cDollar(totalAmount, 5)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>DISCOUNT :</p>
          <p className="font-semibold">{cDollar(0)}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>AMOUNT :</p>
          <p className="font-bold text-red-600">
            {afterPerDollar(totalAmount, 5)}
          </p>
        </div>
      </div>
    </div>
  );
};

InvoiceTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.string,
};

InvoiceTable.defaultProps = {
  data: demo,
  type: "sale",
};

export default InvoiceTable;
