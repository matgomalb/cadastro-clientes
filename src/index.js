const express = require('express');
const app = express();
app.use(express.json());
const axios = require("axios");
const clientes = {};
contador = 0;
app.get('/clientes', (req, res) => {
    res.send(clientes);
});
app.post('/clientes', async (req, res) => {
    contador++;
    const {
        nome, endereco, idade, status
    } = req.body;
    clientes[contador] = {
        contador,
        nome,
        endereco,
        idade,
        status
    }
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ClienteCriado",
        dados: {
            contador,
            nome,
            endereco,
            idade,
            status
        },
    });
    res.status(201).send(clientes[contador]);
});
app.listen(4000, () => {
    console.log('Cadastro-Cliente. Porta 4000');
});