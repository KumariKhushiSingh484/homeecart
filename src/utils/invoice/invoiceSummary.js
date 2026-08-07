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
  const cardHeight = 68;

  // =====================================
  // Card Background
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
    y + 9
  );

  let rowY = y + 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // =====================================
  // Subtotal
  // =====================================

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

  rowY += 9;

  // =====================================
  // Delivery
  // =====================================

  doc.text(
    "Delivery",
    cardX + 5,
    rowY
  );

  doc.text(
    delivery === 0
      ? "Free"
      : formatCurrency(delivery),
    cardX + cardWidth - 5,
    rowY,
    {
      align: "right",
    }
  );

  rowY += 9;

  // =====================================
  // Discount
  // =====================================

  doc.setTextColor(140);

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

  // =====================================
  // Divider
  // =====================================

  doc.setDrawColor(220);

  doc.line(
    cardX + 5,
    rowY,
    cardX + cardWidth - 5,
    rowY
  );

  rowY += 10;

  // =====================================
  // Grand Total Box
  // =====================================

  doc.setFillColor(...COLORS.primary);

  doc.roundedRect(
    cardX + 5,
    rowY - 6,
    cardWidth - 10,
    16,
    2,
    2,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text(
    "GRAND TOTAL",
    cardX + 8,
    rowY + 3
  );

  doc.setFontSize(15);

  doc.text(
    formatCurrency(total),
    cardX + cardWidth - 8,
    rowY + 3,
    {
      align: "right",
    }
  );

  doc.setTextColor(...COLORS.dark);

  return y + cardHeight + 10;
}