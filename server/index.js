const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "ticketsystem"
})


app.get('/tickets', (req, res) => {
    db.query("SELECT * FROM tickets", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/create', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;
    
    db.query("INSERT INTO tickets (title, description, contact) VALUES(?,?,?)",
    [title, description, contact],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send("Insert success")
        }
    })
})

app.put('/edit', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const contact = req.body.contact;

    db.query("UPDATE tickets SET title = ? WHERE id = ?", [title, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
    // db.query("UPDATE tickets SET description = ? WHERE id = ?", [description, id], (err, result) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         res.send(result)
    //     }
    // })
    // db.query("UPDATE tickets SET contact = ? WHERE id = ?", [contact, id], (err, result) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         res.send(result)
    //     }
    // })
    db.query("UPDATE tickets SET timestamp = CURRENT_TIMESTAMP WHERE id = id", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen('3001', () => {
    console.log('Server is running on port 3001')
})