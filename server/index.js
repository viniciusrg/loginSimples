const express = require('express');
const app = express();
const mysql = require('mysql');
var cors = require('cors');

const db = mysql.createPool({
    host: "br286.hostgator.com.br",
    user: "vrgoul65_root",
    password: "59bo6yZM[m[m",
    database: "vrgoul65_LoginSimples",
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length == 0) {

            db.query(
                "INSERT INTO usuario (email, password) VALUE (?,?)",
                [email, password],
                (error, response) => {
                    if (err) {
                        res.send(err);
                    }
                    res.send({ msg: "Usuário cadastrado com sucesso" });
                }
            );

        } else {
            res.send({ msg: "Email já cadastrado" });
        }
    });
});

// Login https://www.youtube.com/watch?v=F_mXVI8Dalg&ab_channel=VitorCunhaCode
// 44:40min

app.listen(3001, () => {
    console.log('3001')
}) 