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

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "Order Summary",
    PAGE.left,
    y
  );

  y += 10;

  doc.setDrawColor(...COLORS.border);
  doc.setFillColor(248, 250, 252);

  doc.roundedRect(
    110,
    y,
    80,
    42,
    2,
    2,
    "FD"
  );

  let textY = y + 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text("Subtotal", 115, textY);
  doc.text(
    formatCurrency(subtotal),
    185,
    textY,
    { align: "right" }
  );

  textY += 8;

  doc.text("Delivery", 115, textY);
  doc.text(
    delivery === 0
      ? "FREE"
      : formatCurrency(delivery),
    185,
    textY,
    { align: "right" }
  );

  textY += 10;

  doc.setDrawColor(200);
  doc.line(115, textY, 185, textY);

  textY += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text("Grand Total", 115, textY);

  doc.text(
    formatCurrency(total),
    185,
    textY,
    { align: "right" }
  );

  return y + 55;
}