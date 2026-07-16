import {
  COMPANY,
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawInvoiceHeader(doc) {
  // Green Header
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, PAGE.width, 35, "F");

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");

  doc.text(
    COMPANY.name,
    PAGE.left,
    18
  );

  // Subtitle
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Customer Invoice",
    PAGE.left,
    27
  );

  // Invoice Title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");

  doc.text(
    "INVOICE",
    PAGE.right,
    18,
    {
      align: "right",
    }
  );

  // Reset text color
  doc.setTextColor(...COLORS.dark);

  // Return next Y position
  return 48;
}