import { jsPDF } from "jspdf";
import { calculateCartTotal } from "../cart/calculateCartTotal";

export function generateInvoice(order) {
  const {
  orderNumber,
  customerName,
  phone,
  address,
  items,
} = order;
  const doc = new jsPDF();

  // Header
  doc.setFillColor(22, 163, 74);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("HomeEcart Invoice", 20, 20);

  // Customer Details
  doc.setTextColor(0, 0, 0);

  doc.setFillColor(240, 240, 240);
  doc.roundedRect(15, 35, 80, 15, 2, 2, "F");

  doc.setFontSize(12);

  doc.text(`Order Number: ${orderNumber}`, 20, 45);

  const now = new Date();

  doc.text(
    `Date: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
    20,
    52
  );

  doc.text(`Customer Name: ${customerName}`, 110, 45);
doc.text(`Address: ${address}`, 110, 55);
doc.text(`Phone: ${phone}`, 110, 65);
  // Items
  let y = 75;

  doc.setFontSize(16);
  doc.text("items", 20, y);

  y += 10;

  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);

  y += 10;

  doc.setFontSize(12);
  doc.text("Item", 20, y);
  doc.text("Qty", 110, y);
  doc.text("Amount", 150, y);

  y += 5;
  doc.line(20, y, 190, y);

  y += 10;

  items.forEach((item) => {
    doc.text(item.name, 20, y);
    doc.text(item.quantity.toString(), 110, y);
    doc.text(`Rs.${item.price * item.quantity}`, 150, y);

    y += 10;
  });

  // Totals
  const { subtotal, delivery } = calculateCartTotal(items);

  const gst = Number((subtotal * 0.18).toFixed(2));

  const grandTotal = subtotal + delivery + gst;

  y += 10;

  doc.text("Payment Status", 20, y);
  doc.text("PAID", 150, y);

  y += 10;

  doc.line(20, y, 190, y);

  y += 15;

  doc.setFontSize(13);

  doc.text("Subtotal", 20, y);
  doc.text(`Rs.${subtotal}`, 150, y);

  y += 10;

  doc.text("Delivery Charges", 20, y);
  doc.text(
    delivery === 0 ? "FREE" : `Rs.${delivery}`,
    150,
    y
  );

  y += 10;

  doc.text("GST (18%)", 20, y);
  doc.text(`Rs.${gst}`, 150, y);

  y += 10;

  doc.line(20, y, 190, y);

  y += 15;

  doc.setFontSize(16);

  doc.text("Grand Total", 20, y);
  doc.text(`Rs.${grandTotal}`, 150, y);

  y += 20;

  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);

  y += 15;

  doc.setFontSize(14);
  doc.setTextColor(22, 163, 74);

  doc.text(
    "Thank you for shopping with HomeEcart",
    20,
    y
  );

  y += 10;

  doc.setFontSize(12);
  doc.setTextColor(100);

  doc.text(
    "Dehri-On-Sone, Bihar | www.homeecart.com",
    20,
    y
  );

  doc.save("HomeEcart_Invoice.pdf");
}