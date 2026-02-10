// Inicijaliziraj EmailJS
emailjs.init("MQuODR70i3qORlZOb");

// Kontakt forma
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const formMessage = document.getElementById("formMessage");
  const submitBtn = this.querySelector("button");

  // Onemogući gumb dok se šalje
  submitBtn.disabled = true;
  submitBtn.textContent = "Šaljem...";

  emailjs
    .send("service_i4vca5g", "template_bh5n14e", {
      from_name: name,
      to_email: email,
    })
    .then(function () {
      formMessage.textContent = `Hvala ${name}! CV je poslan na ${email}.`;
      formMessage.style.display = "";
      formMessage.className = "success";
      document.getElementById("contactForm").reset();

      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    })
    .catch(function (error) {
      formMessage.textContent =
        "Ups, nešto je pošlo po krivu. Pokušajte ponovo.";
      formMessage.className = "error";
      console.error("EmailJS error:", error);
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = "Pošalji mail";
    });
});

