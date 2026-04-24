// Inicijaliziraj EmailJS
emailjs.init("MQuODR70i3qORlZOb");

// Language toggle
let currentLang = "en";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("langFlag").src = "https://flagcdn.com/24x18/hr.png";
  document.getElementById("langFlag").alt = "HR";
  document.getElementById("langText").textContent = "HR";
  document.querySelectorAll("[data-hr]").forEach(function (el) {
    el.textContent = el.getAttribute("data-en");
  });
  document.querySelectorAll("[data-placeholder-hr]").forEach(function (el) {
    el.placeholder = el.getAttribute("data-placeholder-en");
  });
});

function toggleLanguage() {
  currentLang = currentLang === "hr" ? "en" : "hr";
  const btn = document.getElementById("langToggle");
  document.getElementById("langFlag").src = currentLang === "hr" ? "https://flagcdn.com/24x18/gb.png" : "https://flagcdn.com/24x18/hr.png";
  document.getElementById("langFlag").alt = currentLang === "hr" ? "EN" : "HR";
  document.getElementById("langText").textContent = currentLang === "hr" ? "EN" : "HR";

  // Ažuriraj sve elemente s data-hr / data-en
  document.querySelectorAll("[data-hr]").forEach(function (el) {
    el.textContent = el.getAttribute("data-" + currentLang);
  });

  // Ažuriraj placeholder atribute
  document.querySelectorAll("[data-placeholder-hr]").forEach(function (el) {
    el.placeholder = el.getAttribute("data-placeholder-" + currentLang);
  });
}

// Kontakt forma
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const formMessage = document.getElementById("formMessage");
  const submitBtn = this.querySelector("button");

  // Onemogući gumb dok se šalje
  submitBtn.disabled = true;
  submitBtn.textContent = currentLang === "hr" ? "Šaljem..." : "Sending...";

  emailjs
    .send("service_i4vca5g", "template_bh5n14e", {
      from_name: name,
      to_email: email,
    })
    .then(function () {
      formMessage.textContent =
        currentLang === "hr"
          ? `Hvala ${name}! CV je poslan na ${email}.`
          : `Thank you ${name}! The CV link has been sent to ${email}.`;
      formMessage.style.display = "";
      formMessage.className = "success";
      document.getElementById("contactForm").reset();

      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    })
    .catch(function (error) {
      formMessage.textContent =
        currentLang === "hr"
          ? "Ups, nešto je pošlo po krivu. Pokušajte ponovo."
          : "Oops, something went wrong. Please try again.";
      formMessage.className = "error";
      console.error("EmailJS error:", error);
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = currentLang === "hr" ? "Pošalji mail" : "Send";
    });
});
