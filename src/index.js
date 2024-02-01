import express from "express";

const app = express();

app.get("./", (req, res) => {
    res.send("Server run");
});

app.listen(8000, () => {
    console.log("Server start");
});