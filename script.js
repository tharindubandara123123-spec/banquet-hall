const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

const dateField = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateField.min = localToday;

document.getElementById("bookingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = (data.get("name") || "").trim();
  const phone = (data.get("phone") || "").trim();
  const date = data.get("date");
  const guests = data.get("guests");
  const error = document.getElementById("formError");
  if (!name || !phone || !date || !guests || Number(guests) < 1) {
    error.textContent = "Please complete all required fields with valid details.";
    return;
  }
  error.textContent = "";
  const message = [
    "Hello New Minikirula Hotel, I would like to make an event enquiry.",
    "",
    `Name: ${name}`,
    `Contact number: ${phone}`,
    `Email: ${data.get("email") || "Not provided"}`,
    `Event type: ${data.get("event")}`,
    `Event date: ${date}`,
    `Estimated guests: ${guests}`,
    `Special requirements: ${data.get("requirements") || "None provided"}`
  ].join("\n");
  window.open(`https://wa.me/94765925138?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
