import {
  COMPANY,
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawInvoiceHeader(doc) {
  // =====================================================
  // Header Background
  // =====================================================

  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, PAGE.width, 30, "F");

  // =====================================================
  // Company Name
  // =====================================================

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);

  doc.text(
    COMPANY.name,
    PAGE.left,
    15
  );

  // =====================================================
  // Company Tagline
  // =====================================================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    "Fresh • Local • Reliable",
    PAGE.left,
    23
  );

  // =====================================================
  // Invoice Title
  // =====================================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  doc.text(
    "TAX INVOICE",
    PAGE.right,
    15,
    {
      align: "right",
    }
  );

  // =====================================================
  // Divider Line
  // =====================================================

  doc.setDrawColor(225, 225, 225);

  doc.line(
    PAGE.left,
    36,
    PAGE.right,
    36
  );

  // Reset text color
  doc.setTextColor(...COLORS.dark);

  // Next section starts here
  return 42;
}