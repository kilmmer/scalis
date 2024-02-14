import sqlite3, { Database } from "sqlite3";

// open the database
sqlite3.verbose();
const db = new sqlite3.Database('./src/database/db.sqlite', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error | null) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});


export function init(){  // Run SQL command to create table if it doesn't exist
  db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
  });

  
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        // Error handling for table creation
        if (err) {
          return console.error(err.message);
        }
        console.log("Created customers table");
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_number TEXT,
        customer_id INTEGER,
        checking_balance NUMERIC,
        saving_balance NUMERIC,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(customer_id) REFERENCES customers(id)
      )`,
      (err) => {
        // Error handling for table creation
        if (err) {
          return console.error(err.message);
        }
        console.log("Created accounts table");

      }
    )
  })
}

db.addListener("error", function (err) {
  throw new Error("DB error: " + err);
});

export default db;
