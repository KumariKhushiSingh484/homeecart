import {
  COLORS,
  PAGE,
} from "./invoiceConstants";

import {
  formatCurrency,
} from "./invoiceHelpers";

export function drawSummary(
  doc,
  summary,
  y
) {
  const {
    subtotal,
    delivery,
    total,
  } = summary;

  const cardX = 105;
  const cardWidth = 85;
  const cardHeight = 58;

  // =====================================
  // Card
  // =====================================

  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(249, 250, 251);

  doc.roundedRect(
    cardX,
    y,
    cardWidth,
    cardHeight,
    3,
    3,
    "FD"
  );

  // =====================================
  // Title
  // =====================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "PAYMENT SUMMARY",
    cardX + 5,
    y + 8
  );

  // =====================================
  // Summary Rows
  // =====================================

  let rowY = y + 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // Subtotal
  doc.text(
    "Subtotal",
    cardX + 5,
    rowY
  );

  doc.text(
    formatCurrency(subtotal),
    cardX + cardWidth - 5,
    rowY,
    {
      align: "right",
    }
  );

  rowY += 8;

  // Delivery
  doc.text(
    "Delivery Charge",
    cardX + 5,
    rowY
  );

  doc.text(
    delivery === 0
      ? "FREE"
      : formatCurrency(delivery),
    cardX + cardWidth - 5,
    rowY,
    {
      align: "right",
    }
  );

  rowY += 8;

  // Future Ready
  doc.setTextColor(160);

  doc.text(
    "Discount",
    cardX + 5,
    rowY
  );

  doc.text(
    "₹0.00",
    cardX + cardWidth - 5,
    rowY,
    {
      align: "right",
    }
  );

  doc.setTextColor(...COLORS.dark);

  rowY += 10;

  // Divider

  doc.setDrawColor(220);

  doc.line(
    cardX + 5,
    rowY,
    cardX + cardWidth - 5,
    rowY
  );

  rowY += 10;

  // =====================================
  // Grand Total
  // =====================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text(
    "GRAND TOTAL",
    cardX + 5,
    rowY
  );

  doc.text(
    formatCurrency(total),
    cardX + cardWidth - 5,
    rowY,
    {
      align: "right",
    }
  );

  return y + cardHeight + 8;
}