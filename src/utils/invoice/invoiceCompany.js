import {
  COMPANY,
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawCompany(doc, y) {
  // Section Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "Company Information",
    PAGE.left,
    y
  );

  y += 10;

  // Card
  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(248, 250, 252);

  doc.roundedRect(
    PAGE.left,
    y,
    80,
    34,
    2,
    2,
    "FD"
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  let textY = y + 8;

  doc.text(
    COMPANY.name,
    PAGE.left + 5,
    textY
  );

  textY += 7;

  doc.text(
    COMPANY.address,
    PAGE.left + 5,
    textY
  );

  textY += 7;

  doc.text(
    COMPANY.phone,
    PAGE.left + 5,
    textY
  );

  textY += 7;

  doc.text(
    COMPANY.email,
    PAGE.left + 5,
    textY
  );

  // Return next Y position
  return y + 45;
}