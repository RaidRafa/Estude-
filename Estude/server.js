// 1️⃣ Requer módulos
const express = require('express');
const path = require('path');
const db = require('./db');

// 2️⃣ Inicializa app
const app = express();
const PORT = 3000;

// 3️⃣ Middlewares para POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 4️⃣ Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'Front')));
app.use('/Back', express.static(path.join(__dirname, 'Front', 'Back')));

// 5️⃣ Rotas de API
app.post('/api/registrar', (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).send("Usuário e senha são obrigatórios.");
  }

  const query = 'INSERT INTO usuario (usuario, senha) VALUES (?, ?)';
  db.query(query, [usuario, senha], (err, result) => {
    if (err) {
      console.error("Erro ao registrar: ", err.message);
      return res.status(500).send("Erro ao registrar.");
    }

    res.status(201).send("Usuário registrado com sucesso!");
  });
});

// 6️⃣ Rotas normais
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front', 'teladelogin.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front', 'cadastro.html'));
});

app.get('/telainicial', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front', 'telainicial.html'));
});

// 7️⃣ Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
