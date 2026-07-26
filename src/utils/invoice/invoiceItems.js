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
  const tableWidth = 170;
  const rowHeight = 10;

  // ======================================
  // Section Title
  // ======================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "ORDER ITEMS",
    PAGE.left,
    y
  );

  y += 8;

  // ======================================
  // Header
  // ======================================

  doc.setFillColor(...COLORS.primary);

  doc.roundedRect(
    PAGE.left,
    y,
    tableWidth,
    rowHeight,
    2,
    2,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);

  doc.text("Product", 18, y + 6);
  doc.text("Pack", 88, y + 6);
  doc.text("Qty", 114, y + 6);
  doc.text("Price", 136, y + 6);
  doc.text("Total", 168, y + 6, {
    align: "right",
  });

  y += rowHeight + 3;

  // ======================================
  // Rows
  // ======================================

  doc.setTextColor(...COLORS.dark);

  items.forEach((item, index) => {
    if (y > 265) {
      doc.addPage();
      y = 20;
    }

    const price = getItemPrice(item);
    const amount = price * item.quantity;

    const pack =
      item.weight && item.unit
        ? `${item.weight} ${item.unit}`
        : "-";

    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);

      doc.rect(
        PAGE.left,
        y - 5,
        tableWidth,
        rowHeight,
        "F"
      );
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const product =
      item.name.length > 28
        ? item.name.substring(0, 28) + "..."
        : item.name;

    doc.text(product, 18, y);

    doc.text(pack, 88, y);

    doc.text(
      String(item.quantity),
      114,
      y,
      {
        align: "center",
      }
    );

    doc.text(
      formatCurrency(price),
      136,
      y,
      {
        align: "right",
      }
    );

    doc.text(
      formatCurrency(amount),
      168,
      y,
      {
        align: "right",
      }
    );

    // Divider
    doc.setDrawColor(235, 235, 235);

    doc.line(
      PAGE.left,
      y + 4,
      PAGE.left + tableWidth,
      y + 4
    );

    y += rowHeight;
  });

  return y + 6;
}