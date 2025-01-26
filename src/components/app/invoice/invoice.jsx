import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import InvoiceHeader from "./components/inv-header";
import Layout from "@/components/app/layout";
import InvoiceContent from "./components/inv-content";
import InvoiceTable from "./components/inv-table";
import InvoiceFooter from "./components/inv-footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const cardRef = useRef();

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

  return (
    <Layout>
      <div className="flex justify-center">
        <Card ref={cardRef} className="w-[10cm] text-center rounded-none">
          <InvoiceHeader brand="Hotel Pom Jee Heang" />
          <CardContent className="px-3">
            <Separator className="mb-1" />
            <InvoiceContent />
            <Separator />
            <InvoiceTable />
            <Separator />
            <InvoiceFooter />
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Button onClick={handleDownloadPDF}>PDF</Button>
        <Button onClick={handleSaveAsJPG}>JPG</Button>
      </div>
    </Layout>
  );
};

export default Invoice;
