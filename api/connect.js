import mysql from "mysql";

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"OsamAOsfarooQ2012",
    database:"artecho"
})