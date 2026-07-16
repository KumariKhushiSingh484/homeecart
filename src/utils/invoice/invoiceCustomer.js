import {
  COLORS,
  PAGE,
} from "./invoiceConstants";

export function drawCustomer(
  doc,
  order,
  y
) {
  const {
    customerName,
    phone,
    address,
  } = order;

  // Section Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "Customer Information",
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
    170,
    45,
    2,
    2,
    "FD"
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  let textY = y + 8;

  doc.text(
    `Name : ${customerName}`,
    PAGE.left + 5,
    textY
  );

  textY += 8;

  doc.text(
    `Phone : ${phone}`,
    PAGE.left + 5,
    textY
  );

  textY += 8;

  const addressLines = doc.splitTextToSize(
    `Address : ${address}`,
    155
  );

  doc.text(
    addressLines,
    PAGE.left + 5,
    textY
  );

  return y + 55;
}