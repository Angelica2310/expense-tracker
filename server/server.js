import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors()); // let servers talk to each other
app.use(express.json());

// create my test endpoint
app.get("/", function (req, res) {
  res.json("This is my root!");
});

// setup our database connection
const db = new pg.Pool({ connectionString: process.env.DB_CONN_STRING });

// GET request to fetch data from Supabase
app.get("/transaction_list", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM expenses");
    res.json(result.rows);
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/transaction_list/:user_id", async function (req, res) {
  const { user_id } = req.params;

  try {
    const result = await db.query("SELECT * FROM expenses WHERE user_id = $1", [
      user_id,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/signup_list", async function (req, res) {
  try {
    const result = await db.query("SELECT * FROM signup");
    res.json(result.rows);
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// DELETE data in Supabase
app.delete("/transaction_list/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM expenses WHERE id =$1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Can not delete" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log("Error deleting", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST request to insert data into Supabase
app.post("/transaction_list", async function (req, res) {
  // get the request body (data from the form)
  const { text, cost, user_id } = req.body;
  // console.log(text, cost);
  try {
    await db.query(
      "INSERT INTO expenses(text, cost, user_id) VALUES ($1, $2, $3)",
      [text, cost, user_id]
    );
    res.status(201).json({ message: "Transaction added successfully!" });
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

app.post("/signup_list", async function (req, res) {
  // get the request body (data from the form)
  const { username, password } = req.body;
  console.log(username, password);
  try {
    await db.query("INSERT INTO signup(username, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    res.status(201).json({ message: "Username added successfully!" });
  } catch (error) {
    console.log("Error executing query", error);
    res.status(500).json({ error: "Failed to add username" });
  }
});

app.listen(8080, function () {
  console.log("App is running on PORT 8080");
});
