import {
  COLORS,
  PAGE,
} from "./invoiceConstants";

import {
  formatCurrency,
  getItemPrice,
} from "./invoiceHelpers";

export function drawItems(
  doc,
  items,
  y
) {
  // =========================
  // Section Title
  // =========================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "Ordered Items",
    PAGE.left,
    y
  );

  y += 10;

  // =========================
  // Table Header
  // =========================

  doc.setFillColor(...COLORS.primary);

  doc.roundedRect(
    PAGE.left,
    y,
    170,
    10,
    2,
    2,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(11);

  doc.text("Product", 24, y + 7);
  doc.text("Qty", 108, y + 7);
  doc.text("Price", 130, y + 7);
  doc.text("Amount", 162, y + 7);

  y += 14;

  // =========================
  // Table Rows
  // =========================

  doc.setTextColor(...COLORS.dark);

  items.forEach((item, index) => {
    if (y > 265) {
      doc.addPage();
      y = 20;
    }

    const price =
      getItemPrice(item);

    const amount =
      price * item.quantity;

    // Alternate row color
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252);

      doc.rect(
        PAGE.left,
        y - 5,
        170,
        10,
        "F"
      );
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const productName =
      item.name.length > 28
        ? item.name.substring(0, 28) + "..."
        : item.name;

    doc.text(
      productName,
      24,
      y
    );

    doc.text(
      String(item.quantity),
      108,
      y
    );

    doc.text(
      formatCurrency(price),
      130,
      y
    );

    doc.text(
      formatCurrency(amount),
      162,
      y
    );

    y += 10;
  });

  return y + 8;
}