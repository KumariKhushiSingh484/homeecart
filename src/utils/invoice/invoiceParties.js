import {
  COMPANY,
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawParties(
  doc,
  order,
  y
) {
  const leftX = PAGE.left;
  const rightX = 110;

  const cardWidth = 85;
  const cardHeight = 42;

  // ===============================
  // Titles
  // ===============================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.dark);

  doc.text("FROM", leftX, y);
  doc.text("BILL TO", rightX, y);

  y += 5;

  // ===============================
  // Cards
  // ===============================

  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(249, 250, 251);

  doc.roundedRect(
    leftX,
    y,
    cardWidth,
    cardHeight,
    3,
    3,
    "FD"
  );

  doc.roundedRect(
    rightX,
    y,
    cardWidth,
    cardHeight,
    3,
    3,
    "FD"
  );

  // ===============================
  // Company
  // ===============================

  let companyY = y + 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text(
    COMPANY.name,
    leftX + 5,
    companyY
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  companyY += 7;

  doc.text(
    COMPANY.address,
    leftX + 5,
    companyY
  );

  companyY += 6;

  doc.text(
    COMPANY.phone,
    leftX + 5,
    companyY
  );

  companyY += 6;

  doc.text(
    COMPANY.email,
    leftX + 5,
    companyY
  );

  // ===============================
  // Customer
  // ===============================

  let customerY = y + 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text(
    order.customerName,
    rightX + 5,
    customerY
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  customerY += 7;

  doc.text(
    order.phone,
    rightX + 5,
    customerY
  );

  customerY += 6;

  const address = doc.splitTextToSize(
    order.address,
    cardWidth - 10
  );

  doc.text(
    address,
    rightX + 5,
    customerY
  );

  return y + cardHeight + 10;
}