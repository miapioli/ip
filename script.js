document.addEventListener("DOMContentLoaded", function () {
  const ipForm = document.getElementById("ipForm");
  const ipResult = document.getElementById("ipResult");
  const ipList = document.getElementById("ipList");

  ipForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (document.getElementById("consent").checked) {
      fetch("https://api64.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
          const ipAddress = data.ip;
          ipResult.textContent = `Tu dirección IP es: ${ipAddress}`;

          // Agregar la dirección IP a la lista
          const listItem = document.createElement("li");
          listItem.textContent = ipAddress;
          ipList.appendChild(listItem);

          // Guardar la dirección IP en la base de datos (ejemplo simplificado)
          saveIpAddress(ipAddress);
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

// Función para guardar la dirección IP en el servidor
function saveIpAddress(ipAddress) {
  fetch("/save-ip", {
    method: "POST",
    body: JSON.stringify({ ip: ipAddress }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Dirección IP guardada con éxito:", data);
    })
    .catch((error) => {
      console.error("Error al guardar la dirección IP:", error);
    });
}

