// const express = require("express");
// const app = express();

// app.get("/orders", (req, res) => {
//   res.send("Orders Returned");
// });

// app.listen("8080", () => {
//   console.log("Order Server Started");
// });

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:2019";
const { v4: uuidv4 } = require("uuid");

const orders = [];

// Load protobuf
const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("./orders.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
);
// Add the implemented methods to the service.
server.addService(proto.OrderService.service, {
  create: create,
  getAll: getAll,
});

function create(call, callback) {
  const order = call.request;

  order.id = uuidv4();
  orders.push(order);
  callback(null, order);
}

function getAll(call, callback) {
  callback(null, { orders });
}

server.bindAsync(
  SERVER_ADDRESS,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.log(err);
    }

    server.start();
    console.log(`listening on port ${SERVER_ADDRESS}`);
  }
);
