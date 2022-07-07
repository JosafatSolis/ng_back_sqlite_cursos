import "./pre-start"; // Must be the first import
import logger from "jet-logger";
import server from "./server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Constants
const serverStartMsg = "Express server started on port: ",
  port = process.env.PORT || 3000;

export const abre_bd = function () {
  open({
    filename: "test.db",
    driver: sqlite3.Database,
  }).then((db) => {
    db.each("SELECT nombre FROM alumnos", (err, row) => {
      console.log(row);
    });
  });
};

// Ejecuta
abre_bd();

// Start server
server.listen(port, () => {
  logger.info(serverStartMsg + port);
});
