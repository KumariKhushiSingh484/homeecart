import { jsPDF } from "jspdf";

import { calculateCartTotal } from "../cart/calculateCartTotal";

import { drawInvoiceHeader } from "./invoiceHeader";
import { drawParties } from "./invoiceParties";
import { drawItems } from "./invoiceItems";
import { drawSummary } from "./invoiceSummary";
import { drawFooter } from "./invoiceFooter";
import { drawInvoiceDetails } from "./invoiceDetails";

export function generateInvoice(order) {
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

  const totals =
    calculateCartTotal(order.items);

  drawSummary(
    doc,
    totals,
    y
  );

  drawFooter(doc);

  doc.save(
    `Invoice_${order.orderNumber}.pdf`
  );
}