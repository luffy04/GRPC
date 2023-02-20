const express = require("express");
const bodyParser = require("body-parser");
const client = require("./client");
const app = express();

app.use(bodyParser.json());

app.post("/order", (req, res) => {
  const orderObj = {
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  client.create(orderObj, (err, data) => {
    if (err) throw err;

    res.status(200).send(data);
  });
});

app.get("/order", (req, res) => {
  client.getAll(null, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
});

app.listen("8080", () => {
  console.log("Customer Server Started");
});
