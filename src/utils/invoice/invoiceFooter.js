import {
  COMPANY,
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawFooter(doc) {
  const y = 275;

  // ======================================
  // Divider
  // ======================================

  doc.setDrawColor(...COLORS.border);

  doc.line(
    PAGE.left,
    y,
    PAGE.right,
    y
  );

  // ======================================
  // Thank You
  // ======================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.primary);

  doc.text(
    "Thank you for shopping with HomeeCart",
    PAGE.left,
    y + 8
  );

  // ======================================
  // Contact Information
  // ======================================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.gray);

  doc.text(
    `Phone : ${COMPANY.phone}`,
    PAGE.left,
    y + 16
  );

  doc.text(
    `Email : ${COMPANY.email}`,
    PAGE.left,
    y + 22
  );

  // Website (optional)
  if (COMPANY.website) {
    doc.text(
      `Website : ${COMPANY.website}`,
      PAGE.left,
      y + 28
    );
  }

  // ======================================
  // Right Side
  // ======================================

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);

  doc.text(
    "This is a computer-generated invoice.",
    PAGE.right,
    y + 16,
    {
      align: "right",
    }
  );

  doc.text(
    "No signature is required.",
    PAGE.right,
    y + 22,
    {
      align: "right",
    }
  );
}