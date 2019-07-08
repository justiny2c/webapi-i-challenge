// implement your API here
const express = require("express");

const dbModel = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/users", function (req,res) {
    dbModel
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json( { error: "The users information could not be retrieved." } )
        })
})

server.post("/users", (req, res) => {
    const userInfo = req.body

    dbModel
        .insert(userInfo)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json( { error: "There was an error while saving the user to the database" } )
        })
})

server.get("/users/:id", (req, res) => {
    const id = req.params.id
    
    dbModel
        .findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(404).json( {message: "The user with the specified ID does not exist."} )
        })
})

server.delete("/users/:id", (req,res) => {
    const id = req.params.id;

    dbModel
        .remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(204).end();
            } else {
                res.status(404).json( { message: "The user with the specified ID does not exist." } )
            }
        })
        .catch(error => {
            res.status(500).json( { error: "The user could not be removed" } )
        })
})

server.put("/users/:id", (req,res) => {
    const id = req.params.id;
    const changes = req.body;

    dbModel
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(202).json(updated);
            } else {
                res.status(400).json( { errorMessage: "Please provide name and bio for the user." } )
            }
        })
        .catch(error => {
            res.status(500).json( { error: "The user information could not be modified." } )
        })

})

const port = 4000;

server.listen(port, () => console.log(`Running on port ${port}`))