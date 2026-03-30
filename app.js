// Generate token
function generateToken() {
  return Math.random().toString(36).substr(2);
}

// Handle form submit
const form = document.getElementById("accessForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const token = generateToken();
    const expiry = Date.now() + (3 * 24 * 60 * 60 * 1000); // 3 days

    localStorage.setItem("authToken", token);
    localStorage.setItem("expiry", expiry);

    // Track visits
    let count = localStorage.getItem("visits") || 0;
    localStorage.setItem("visits", ++count);

    window.location.href = "next.html";
  });
}

// Protect next.html
function protectPage() {
  const token = localStorage.getItem("authToken");
  const expiry = localStorage.getItem("expiry");

  if (!token || Date.now() > expiry) {
    alert("Access Denied!");
    window.location.href = "index.html";
  }
}

// Show visit count
function showVisits() {
  let count = localStorage.getItem("visits") || 0;
  document.getElementById("count").innerText =
    "Total Visits: " + count;
}