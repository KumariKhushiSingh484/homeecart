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
  const cardHeight = 34;

  // =====================================
  // Section Titles
  // =====================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "Store Information",
    leftX,
    y
  );

  doc.text(
    "Customer Information",
    rightX,
    y
  );

  y += 5;

  // =====================================
  // Cards
  // =====================================

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

  // =====================================
  // Store Information
  // =====================================

  let companyY = y + 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);

  doc.text(
    COMPANY.name,
    leftX + 5,
    companyY
  );

  companyY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.setTextColor(110);

  doc.text(
    COMPANY.address || "-",
    leftX + 5,
    companyY
  );

  companyY += 5;

  doc.text(
    COMPANY.phone || "-",
    leftX + 5,
    companyY
  );

  companyY += 5;

  doc.text(
    COMPANY.email || "-",
    leftX + 5,
    companyY
  );

  // =====================================
  // Customer Information
  // =====================================

  let customerY = y + 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    order.customerName ||
      "Customer",
    rightX + 5,
    customerY
  );

  customerY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(110);

  doc.text(
    order.phone || "-",
    rightX + 5,
    customerY
  );

  customerY += 5;

  const address = doc.splitTextToSize(
    order.address ||
      "Address not available",
    cardWidth - 10
  );

  doc.text(
    address,
    rightX + 5,
    customerY
  );

  doc.setTextColor(...COLORS.dark);

  return y + cardHeight + 8;
}