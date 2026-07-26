import {
  COMPANY,
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawCompany(doc, y) {
  const cardWidth = 88;
  const cardHeight = 38;

  // ==============================
  // FROM Title
  // ==============================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.dark);

  doc.text("FROM", PAGE.left, y);

  y += 5;

  // ==============================
  // Card Background
  // ==============================

  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(249, 250, 251);

  doc.roundedRect(
    PAGE.left,
    y,
    cardWidth,
    cardHeight,
    3,
    3,
    "FD"
  );

  // ==============================
  // Company Name
  // ==============================

  let textY = y + 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);

  doc.text(
    COMPANY.name,
    PAGE.left + 5,
    textY
  );

  // ==============================
  // Company Details
  // ==============================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  textY += 7;

  doc.text(
    COMPANY.address,
    PAGE.left + 5,
    textY
  );

  textY += 6;

  doc.text(
    COMPANY.phone,
    PAGE.left + 5,
    textY
  );

  textY += 6;

  doc.text(
    COMPANY.email,
    PAGE.left + 5,
    textY
  );

  return y + cardHeight + 8;
}