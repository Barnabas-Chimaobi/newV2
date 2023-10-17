import React from "react";

export default function exportPdf({ data }) {
  useEffect(() => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "Name",
          "FeeType",
          "Session",
          "InvoiceNumber",
          "ConfirmationOrderNo",
          "Amount",
        ],
      ],
      body: data,
    });
    doc.save("paymentReport.pdf");
  }, [data]);

  return <div>Exporting to PDF...</div>;
}
