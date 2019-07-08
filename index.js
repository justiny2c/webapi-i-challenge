// implement your API here
const express = require("express");

const dbModel = require("./data/db.js");

const server = express();

server.use(express.json());

const port = 6000;

server.listen(port, () => console.log(`Running on port ${port}`))