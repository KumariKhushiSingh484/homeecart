import { jsPDF } from "jspdf";

import { calculateCartTotal } from "../cart/calculateCartTotal";

import { drawInvoiceHeader } from "./invoiceHeader";
import { drawParties } from "./invoiceParties";
import { drawItems } from "./invoiceItems";
import { drawSummary } from "./invoiceSummary";
import { drawFooter } from "./invoiceFooter";
import { drawInvoiceDetails } from "./invoiceDetails";

export function generateInvoice(order) {
  console.log("Invoice Order:", order);
console.log("Invoice Items:", order.items);
  const doc = new jsPDF();

  let y = drawInvoiceHeader(doc);

y = drawInvoiceDetails(
  doc,
  order,
  y
);
y = drawParties(
  doc,
  order,
  y
);

// Draw Items
y = drawItems(
  doc,
  order.items,
  y
);

// Calculate totals
const totals =
  calculateCartTotal(order.items);

// Draw Summary
y = drawSummary(
  doc,
  totals,
  y
);
  drawFooter(doc);

  doc.save(
    `Invoice_${order.orderNumber}.pdf`
  );
}