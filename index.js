import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const server = express();

server.use(cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const router = jsonServer.router("./data/db.json");
server.db = router.db;

const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600,
});

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(8000, () => {
  console.log("Mock server running on port 8000");
});