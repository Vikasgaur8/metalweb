// --- Product Data Array ---
const PRODUCTS = {
  product1: {
    name: "Stainless Steel Tubes",
    image: "images/screws.jpg",
    description:
      "High-grade stainless steel tubes manufactured with precision for various industrial applications.",
    specs: [
      { parameter: "Grade", value: "304, 316, 321" },
      { parameter: "Diameter", value: "12 mm - 152 mm" },
      { parameter: "Length", value: "Up to 12 meters" },
    ],
    features: ["Excellent corrosion resistance", "High mechanical strength"],
  },
  product2: {
    name: "Carbon Steel Pipes",
    image: "images/pipes.jpg",
    description: "Premium carbon steel pipes for strength and reliability.",
    specs: [
      { parameter: "Grade", value: "A106, A53" },
      { parameter: "Diameter", value: "15 mm - 90 mm" },
    ],
    features: ["Suitable for high-pressure systems", "Precision engineered"],
  },
  // Define product3, product4... Similarly add all your products
};

// --- Parse productId from URL (?id=product1 or #product1) ---
function getProductId() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get("id");
  if (paramId) return paramId;
  if (window.location.hash) return window.location.hash.replace("#", "");
  return null;
}

// --- Render the Product Info ---
function renderProductDetail(productId) {
  const product = PRODUCTS[productId];
  const container = document.getElementById("product-detail-container");

  if (!product) {
    container.innerHTML = `<h2>Product not found</h2>`;
    return;
  }

  let specsTable = "";
  if (product.specs && product.specs.length) {
    specsTable =
      '<table class="spec-table"><thead><tr><th>Parameter</th><th>Specification</th></tr></thead><tbody>';
    product.specs.forEach(
      (s) =>
        (specsTable += `<tr><td>${s.parameter}</td><td>${s.value}</td></tr>`)
    );
    specsTable += "</tbody></table>";
  }

  let featuresList = "";
  if (product.features && product.features.length) {
    featuresList = '<ul class="features-list">';
    product.features.forEach((f) => (featuresList += `<li>${f}</li>`));
    featuresList += "</ul>";
  }

  container.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}" style="max-width:350px;">
    <p>${product.description}</p>
    ${specsTable}
    <h3>Features</h3>
    ${featuresList}
  `;
}

// --- Listen for page load and hash change (for dynamic routing) ---
window.addEventListener("DOMContentLoaded", () => {
  renderProductDetail(getProductId());
});
window.addEventListener("hashchange", () => {
  renderProductDetail(getProductId());
});
