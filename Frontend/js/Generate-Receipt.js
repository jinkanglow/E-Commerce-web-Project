// Generate Receipt
document.getElementById("generate-receipt").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const checkoutItemsBody = document.getElementById("checkout-items");
  const rows = checkoutItemsBody.querySelectorAll("tr.checkout-item-row");

  // Prepare the receipt data
  const receiptItems = Array.from(rows).map((row) => {
    const productCell = row.querySelector("td:first-child").textContent.trim();
    const totalCell = row.querySelector("td:last-child").textContent.trim();
    const [productName, quantityText] = productCell.split(" x");
    const quantity = quantityText.trim();
    return {
      product: productName.trim(),
      quantity: quantity,
      total: totalCell,
    };
  });

  // Log receipt items for debugging
  console.log("Receipt Items:", receiptItems);

  // Extract and prepare subtotal, tax, and total
  const subtotal = checkoutItemsBody
    .querySelector("#checkout-subtotal")
    .textContent.trim();
  const tax = checkoutItemsBody
    .querySelector("#checkout-tax")
    .textContent.trim();
  const total = checkoutItemsBody
    .querySelector("#checkout-total")
    .textContent.trim();

  // Log subtotal, tax, and total for debugging
  console.log("Subtotal:", subtotal);
  console.log("Tax:", tax);
  console.log("Total:", total);

  // Create a PDF document
  const pdf = new jsPDF("p", "mm", "a4");
  let y = 10; // Initial vertical position

  // Remove company logo section
  // Adjust initial vertical position `y` if necessary
  y += 10; // Adjust positioning if needed

  // Add receipt header
  pdf.setFontSize(18);
  pdf.setFont("Arial", "bold");
  pdf.text("Thank You for Shopping with Us!", 105, y, {
    align: "center",
  });
  pdf.setFont("Arial", "normal");
  y += 15;

  // Add store information
  pdf.setFontSize(12);
  pdf.text("HappyFood Store", 105, y, { align: "center" });
  y += 8;
  pdf.text("Lot 123, Midvalley", 105, y, { align: "center" });
  y += 8;
  pdf.text("Kuala Lumpur, Malaysia", 105, y, { align: "center" });
  y += 8;
  pdf.text("Phone: (60) 16 123-4567", 105, y, { align: "center" });
  y += 15;
  pdf.text("Date: " + new Date().toLocaleDateString(), 10, y);
  pdf.text("Time: " + new Date().toLocaleTimeString(), 150, y);
  y += 15;

  // Add table header
  pdf.setFontSize(12);
  pdf.setFont("Arial", "bold");
  pdf.text("Product", 10, y);
  pdf.text("Qty", 80, y);
  pdf.text("Price", 150, y);
  y += 10;
  pdf.line(10, y, 200, y); // Add a line for separation
  y += 5;

  // Add receipt items
  pdf.setFontSize(12);
  pdf.setFont("Arial", "normal");
  receiptItems.forEach((item) => {
    pdf.text(item.product, 10, y);
    pdf.text(item.quantity, 80, y, { align: "right" });
    pdf.text(item.total, 150, y, { align: "right" });
    y += 10;
  });

  // Add line break
  y += 5;
  pdf.line(10, y, 200, y); // Add a line for separation
  y += 5;

  // Add subtotal, tax, and total
  pdf.setFontSize(12);
  pdf.setFont("Arial", "bold");
  pdf.text("Subtotal:", 10, y);
  pdf.text(subtotal, 150, y, { align: "right" });
  y += 10;

  pdf.text("Service Tax (6%):", 10, y);
  pdf.text(tax, 150, y, { align: "right" });
  y += 10;

  pdf.text("Order Total:", 10, y);
  pdf.text(total, 150, y, { align: "right" });

  // Create a Blob and open it for preview
  const pdfBlob = pdf.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open the PDF in a new window for preview
  window.open(pdfUrl);
});

