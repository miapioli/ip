document.addEventListener("DOMContentLoaded", function () {
  const ipForm = document.getElementById("ipForm");
  const ipResult = document.getElementById("ipResult");

  ipForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (document.getElementById("consent").checked) {
      fetch("https://api64.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          ipResult.textContent = `Tu dirección IP es: ${data.ip}`;
        })
        .catch((error) => {
          console.error("Error al obtener la dirección IP:", error);
          ipResult.textContent = "No se pudo obtener la dirección IP.";
        });
    } else {
      ipResult.textContent =
        "Debes dar tu consentimiento para obtener la dirección IP.";
    }
  });
});
