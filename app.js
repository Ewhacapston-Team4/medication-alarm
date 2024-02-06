import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.get("/", (req, res) => {
    res.send("Server run");
});

app.listen(8000, () => {
    console.log("Server start");
});