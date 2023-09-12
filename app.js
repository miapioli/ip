const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para el manejo de JSON en las solicitudes
app.use(bodyParser.json());

// Inicialización de la base de datos SQLite
const db = new sqlite3.Database("ips.db");

// Crear una tabla para almacenar las direcciones IP
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS ips (id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT)"
  );
});

// Ruta para guardar una dirección IP en la base de datos
app.post("/save-ip", (req, res) => {
  const { ip } = req.body;
  db.run("INSERT INTO ips (ip) VALUES (?)", [ip], (err) => {
    if (err) {
      console.error(
        "Error al guardar la dirección IP en la base de datos:",
        err
      );
      res.status(500).json({ error: "Error al guardar la dirección IP." });
    } else {
      res.json({ message: "Dirección IP guardada con éxito." });
    }
  });
});

// Ruta para obtener todas las direcciones IP almacenadas
app.get("/get-ips", (req, res) => {
  db.all("SELECT ip FROM ips", (err, rows) => {
    if (err) {
      console.error(
        "Error al obtener las direcciones IP de la base de datos:",
        err
      );
      res.status(500).json({ error: "Error al obtener las direcciones IP." });
    } else {
      const ips = rows.map((row) => row.ip);
      res.json({ ips });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
