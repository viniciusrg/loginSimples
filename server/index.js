const express = require('express');
const app = express();
const mysql = require('mysql');
var cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createPool({
    host: "", //Seu hostname.
    user: "", //Seu usuário.
    password: "", //Sua senha.
    database: "", //Nome do seu banco de dados.
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
            bcrypt.hash(password, saltRounds, (err, hash) => {

                db.query(
                    "INSERT INTO usuario (email, password) VALUE (?,?)",
                    [email, hash],
                    (error, response) => {
                        if (err) {
                            res.send(err);
                        }
                        res.send({ msg: "Usuário cadastrado com sucesso" });
                    }
                );
            })

        } else {
            res.send({ msg: "Email já cadastrado" });
        }
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM usuario WHERE email = ?", [email], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (erro, result)=>{
                if (result){
                    res.send({ msg: "Usuário logado com sucesso!", login: true })
                }else{
                    res.send({ msg: "Senha incorreta!", login: false })
                }
            })
            
        } else {
            res.send({ msg: "Conta não encontrada!" })
        }
    })
})

app.listen(3001, () => {
    console.log('3001')
}) 
