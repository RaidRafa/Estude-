//  Requer módulos
const express = require('express');
const path = require('path');
const db = require('./db');

//  Inicializa app
const app = express();
const PORT = 3000;

//  Middlewares para POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'Front')));
app.use('/Back', express.static(path.join(__dirname, 'Front', 'Back')));

//  Rotas de API
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

// Rota login
app.post('/api/login', (req, res) => {
  const {usuario, senha} = req.body;

  if(!usuario || !senha) {
    return res.status(400).send("Usuario e senha são obrigatórios.");
  }

  const query = 'SELECT * FROM usuario WHERE usuario = ? and senha = ?';
  db.query(query, [usuario, senha], (err, results) => {
    if(err){
      console.error("Erro no login:", err.message);
      return res.status(500).send("Erro interno no servidor.");
    }

    if(results.length > 0){
      res.status(200).json({ok: true, usuario: results[0] });
    } else{
      res.status(401).json({ ok: false, msg: "Usuário ou senha incorretos."});
    }
  });
});

// Rota tarefa
app.post('/api/tarefas', (req, res) => {
  const {titulo, descricao, data_entrega, id_user} = req.body;

  if(!titulo || !id_user) {
    return res.status(400).send("Título e usuário são obrigatórios.");
  }

  const query = 'INSERT INTO tarefas (titulo, descricao, data_entrega, id_user) VALUES (?, ?, ?, ?)';
  db.query(query, [titulo, descricao, data_entrega, id_user], (err) => {
    if(err) {
      console.error("Erro ao registrar a tarefa: ", err.message);
      return res.status(500).send("Erro ao registrar tarefa.")
    }

    res.status(201).send("Tarefa registrada com sucesso!");
  });
});

//  Rotas normais
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front', 'teladelogin.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front', 'cadastro.html'));
});

app.get('/telainicial', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front', 'telainicial.html'));
});

//  Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
