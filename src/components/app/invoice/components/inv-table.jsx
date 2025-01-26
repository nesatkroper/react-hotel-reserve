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

const demo = [
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
  {
    product: "Pasta",
    unit: 12,
    qty: 1,
    notes: [{ list: "Creamy Alfredo" }, { list: "With garlic bread" }],
  },
  {
    product: "Sushi Platter",
    unit: 25,
    qty: 4,
    notes: [{ list: "Includes wasabi" }, { list: "Mixed rolls" }],
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
  {
    product: "Pasta",
    unit: 12,
    qty: 1,
    notes: [{ list: "Creamy Alfredo" }, { list: "With garlic bread" }],
  },
  {
    product: "Sushi Platter",
    unit: 25,
    qty: 4,
    notes: [{ list: "Includes wasabi" }, { list: "Mixed rolls" }],
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
  {
    product: "Pasta",
    unit: 12,
    qty: 1,
    notes: [{ list: "Creamy Alfredo" }, { list: "With garlic bread" }],
  },
  {
    product: "Sushi Platter",
    unit: 25,
    qty: 4,
    notes: [{ list: "Includes wasabi" }, { list: "Mixed rolls" }],
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
  {
    product: "Pasta",
    unit: 12,
    qty: 1,
    notes: [{ list: "Creamy Alfredo" }, { list: "With garlic bread" }],
  },
  {
    product: "Sushi Platter",
    unit: 25,
    qty: 4,
    notes: [{ list: "Includes wasabi" }, { list: "Mixed rolls" }],
  },
];

const InvoiceTable = (props) => {
  const { data } = props;

  const totalAmount = data?.reduce(
    (acc, item) => acc + item.unit * item.qty,
    0
  );
  return (
    <div>
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
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(d.unit)}
              </TableCell>
              <TableCell className="text-center align-top py-1">
                {d.qty} pcs
              </TableCell>
              <TableCell className="text-right align-top py-1">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(d.unit * d.qty)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Separator />
      <div className="flex flex-col px-1 my-2">
        <div className="flex justify-between font-semibold">
          <p>DISCOUNT :</p>
          <p className="font-semibold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(7)}
          </p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>AMOUNT :</p>
          <p className="font-bold text-red-600">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalAmount - 7)}
          </p>
        </div>
      </div>
    </div>
  );
};

InvoiceTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

InvoiceTable.defaultProps = {
  data: demo,
};

export default InvoiceTable;
