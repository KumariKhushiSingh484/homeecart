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
  const rowHeight = 12;

  // =====================================================
  // Section Title
  // =====================================================

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    `Items (${items.length})`,
    PAGE.left,
    y
  );

  y += 8;

  // =====================================================
  // Table Header
  // =====================================================

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

  doc.text("Product", 18, y + 7);
  doc.text("Pack", 90, y + 7);
  doc.text("Qty", 116, y + 7, {
    align: "right",
  });
  doc.text("Rate", 140, y + 7, {
    align: "right",
  });
  doc.text("Amount", 168, y + 7, {
    align: "right",
  });

  y += rowHeight + 2;

  // =====================================================
  // Table Rows
  // =====================================================

  items.forEach((item, index) => {
    if (y > 265) {
      doc.addPage();
      y = 20;

      // Repeat header on every page
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

      doc.text("Product", 18, y + 7);
      doc.text("Pack", 90, y + 7);
      doc.text("Qty", 116, y + 7, {
        align: "right",
      });
      doc.text("Rate", 140, y + 7, {
        align: "right",
      });
      doc.text("Amount", 168, y + 7, {
        align: "right",
      });

      y += rowHeight + 2;
    }

    const rate = getItemPrice(item);
    const amount = rate * item.quantity;

    const pack =
      item.weight && item.unit
        ? `${item.weight} ${item.unit}`
        : "-";

    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);

      doc.rect(
        PAGE.left,
        y - 6,
        tableWidth,
        rowHeight,
        "F"
      );
    }

    // Product Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.dark);

    const product =
      item.name.length > 32
        ? item.name.substring(0, 32) + "..."
        : item.name;

    doc.text(product, 18, y);

    // Pack
    doc.setFont("helvetica", "normal");

    doc.text(pack, 90, y);

    // Quantity
    doc.text(
      String(item.quantity),
      116,
      y,
      {
        align: "right",
      }
    );

    // Rate
    doc.text(
      formatCurrency(rate),
      140,
      y,
      {
        align: "right",
      }
    );

    // Amount
    doc.setFont("helvetica", "bold");

    doc.text(
      formatCurrency(amount),
      168,
      y,
      {
        align: "right",
      }
    );

    // Divider
    doc.setDrawColor(230, 230, 230);

    doc.line(
      PAGE.left,
      y + 5,
      PAGE.left + tableWidth,
      y + 5
    );

    y += rowHeight;
  });

  return y + 8;
}