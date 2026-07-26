import {
  COLORS,
  PAGE,
} from "./invoiceConstants";

import { formatDate } from "./invoiceHelpers";

export function drawInvoiceDetails(
  doc,
  order,
  y
) {
  const {
    orderNumber,
    createdAt,
    paymentMethod,
    status,
  } = order;

  // Invoice Number
  const invoiceNumber =
    `INV-${orderNumber.replace("HE", "")}`;

  // Date & Time
  const date =
    createdAt
      ? formatDate(createdAt).split(",")[0]
      : "-";

  const time =
    createdAt
      ? formatDate(createdAt).split(",")[1]?.trim() || "-"
      : "-";

  // Box
  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(250, 250, 250);

  doc.roundedRect(
    PAGE.left,
    y,
    170,
    26,
    2,
    2,
    "FD"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);

  // Left Column
  doc.text(
    `Invoice No : ${invoiceNumber}`,
    PAGE.left + 5,
    y + 8
  );

  doc.text(
    `Order No   : ${orderNumber}`,
    PAGE.left + 5,
    y + 16
  );

  // Right Column
  doc.text(
    `Date : ${date}`,
    118,
    y + 8
  );

  doc.text(
    `Time : ${time}`,
    118,
    y + 16
  );

  // Bottom Divider
  doc.setDrawColor(220);

  doc.line(
    PAGE.left + 5,
    y + 21,
    PAGE.right - 5,
    y + 21
  );

  doc.setFont("helvetica", "normal");

  doc.text(
    `Payment : ${paymentMethod}`,
    PAGE.left + 5,
    y + 31
  );

  doc.text(
    `Status : ${status}`,
    118,
    y + 31
  );

  return y + 36;
}