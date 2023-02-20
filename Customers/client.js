const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const REMOTE_SERVER = "0.0.0.0:2019";

var packageDefinition = protoLoader.loadSync("./orders.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const OrderService = grpc.loadPackageDefinition(packageDefinition).OrderService;
const client = new OrderService(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
);

module.exports = client;
