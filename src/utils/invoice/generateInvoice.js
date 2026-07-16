import { jsPDF } from "jspdf";

import { calculateCartTotal } from "../cart/calculateCartTotal";

import { drawInvoiceHeader } from "./invoiceHeader";
import { drawCompany } from "./invoiceCompany";
import { drawCustomer } from "./invoiceCustomer";
import { drawItems } from "./invoiceItems";
import { drawSummary } from "./invoiceSummary";
import { drawFooter } from "./invoiceFooter";

export function generateInvoice(order) {
  const doc = new jsPDF();

  let y = drawInvoiceHeader(doc);

  y = drawCompany(doc, y);

  y = drawCustomer(doc, order, y);

  y = drawItems(
    doc,
    order.items,
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