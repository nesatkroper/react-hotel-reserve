import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import InvoiceHeader from "./components/inv-header";
import Layout from "@/components/app/layout";
import InvoiceContent from "./components/inv-content";
import InvoiceTable from "./components/inv-table";
import InvoiceFooter from "./components/inv-footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FormSelect from "../form/form-select";

const METHOD = [
  {
    value: "cash",
    data: "Cash",
  },
  {
    value: "leave",
    data: "On Leave",
  },
];
const TYPE = [
  {
    value: "sale",
    data: "Sale",
  },
  {
    value: "room",
    data: "Room",
  },
];

const Invoice = () => {
  const cardRef = useRef();
  const [method, setMethod] = useState("cash");
  const [type, setType] = useState("sale");

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
    });

    const imageData = canvas.toDataURL("image/png");
    const pdfWidth = canvas.width / 6;
    const pdfHeight = canvas.height / 6;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("receipt.pdf");
  };

  const handleSaveAsJPG = async () => {
    const canvas = await html2canvas(cardRef.current, { scale: 6 });
    const imageData = canvas.toDataURL("image/jpeg", 1.0);

    const link = document.createElement("a");
    link.href = imageData;
    link.download = "invoice.jpg";
    link.click();
  };

  const handleMethodChange = (event) => {
    setMethod(event);
    console.log(event);
  };
  const handleTypeChange = (event) => {
    console.log(event);
    setType(event);
  };

  return (
    <Layout>
      <div className="flex justify-around">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3">
            <Button onClick={handleDownloadPDF} className="w-[150px]">
              PDF
            </Button>
            <Button onClick={handleSaveAsJPG} className="w-[150px]">
              JPG
            </Button>
          </div>
          <div className="flex gap-3">
            <FormSelect
              onCallbackSelect={handleTypeChange}
              item={TYPE}
              label="Type"
              placeholder="Sale"
              size={150}
            />
            <FormSelect
              onCallbackSelect={handleMethodChange}
              item={METHOD}
              label="Method"
              placeholder="Cash"
              size={150}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Card ref={cardRef} className="w-[10cm] text-center rounded-none">
            <InvoiceHeader brand="Hotel Pom Jee Heang" />
            <CardContent className="px-3">
              <Separator className="mb-1" />
              <InvoiceContent payment={method} />
              <Separator />
              <InvoiceTable type={type} />
              <Separator />
              <InvoiceFooter method={method} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Invoice;
