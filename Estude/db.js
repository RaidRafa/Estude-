const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '28092004',
    database: 'estude_db'
});

connection.connect((err) => {
    if(err) {
        console.error("Erro ao conectar ao banco: ", err.message);
    }else{
        console.log("Conectado ao banco!");
    }
});

module.exports = connection;