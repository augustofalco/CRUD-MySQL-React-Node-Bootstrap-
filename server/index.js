const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  db.query(
    "INSERT INTO empleados(nombre, edad, pais, cargo, anios) VALUES(?, ?, ?, ?, ?)",
    [nombre, edad, pais, cargo, anios],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al registrar el empleado");
      } else {
        res.send("Empleado registrado con éxito");
      }
    }
  );
});

/** FUNCIONALIDAD PAR OBTENER EMPLEADOS */
app.get("/empleados", (req, res) => {
  db.query("SELECT * FROM empleados", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al registrar el empleado");
    } else {
      res.send(result);
    }
  });
});

/** FUNCIONALIAD PARA ACTUALIZAR EMPLEADOS */
app.put("/update", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const edad = req.body.edad;
  const pais = req.body.pais;
  const cargo = req.body.cargo;
  const anios = req.body.anios;

  db.query(
    "UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?",
    [nombre, edad, pais, cargo, anios, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error al actualizar el empleado");
      } else {
        res.send("Empleado actualizado con éxito");
      }
    }
  );
});

/** FUNCIONALIDAD PARA ELIMINAR EMPLEADOS */
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM empleados WHERE id=?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al registrar el empleado");
    } else {
      res.send("Empleado eliminado con éxito");
    }
  });
});
