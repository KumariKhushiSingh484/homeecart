import {
  COMPANY,
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawFooter(doc) {
  const y = 275;

  doc.setDrawColor(...COLORS.border);

  doc.line(
    PAGE.left,
    y,
    PAGE.right,
    y
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.primary);

  doc.text(
    "Thank you for shopping with HomeEcart ❤️",
    PAGE.left,
    y + 8
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.gray);

  doc.text(
    `Need help? ${COMPANY.phone}`,
    PAGE.left,
    y + 16
  );

  doc.text(
    COMPANY.email,
    PAGE.left,
    y + 22
  );

  doc.text(
    "This is a computer-generated invoice.",
    PAGE.right,
    y + 22,
    {
      align: "right",
    }
  );
}