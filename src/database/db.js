const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;

// db.serialize(() => {
//   // Criar uma tabela com comandos SQL
//   db.run(`
//   CREATE TABLE IF NOT EXISTS places (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     image TEXT,
//     name TEXT,
//     email TEXT,
//     phone NUMBER,
//     address TEXT,
//     neighborhood TEXT,
//     number_address NUMBER,
//     zip_code NUMBER,
//     state TEXT,
//     city TEXT,
//     items TEXT
//   );
// `);

//   // Inserir dados na tabela
//   const query = `
//   INSERT INTO places (
//     image,
//     name,
//     email,
//     phone,
//     address,
//     neighborhood,
//     number_address,
//     zip_code,
//     state,
//     city,
//     items
//   ) VALUES (?,?,?,?,?,?,?,?,?,?,?);
// `;

//   // Coleção de valores
//   const values = [
//     'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=801&q=80',
//     'Loja 1',
//     'lojaone.email.com',
//     '1197654-5901',
//     'Guilherme Gemballa',
//     'Jardim América',
//     '260',
//     '13234165',
//     'Santa Catarina',
//     'Rio do Sul',
//     'camisetas masculinas, calças, sapatos',
//   ];

//   // Função de callback
//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Cadastrado com sucesso');
//     console.log(this);
//   }

//   // Executar a consulta com os valores e a função de callback
//   db.run(query, values, afterInsertData);

//   // consultar os dados da tabela
//   db.all(`SELECT * FROM places`, function (err, rows) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Aqui estão seus registros');
//     console.log(rows);
//   });

//   // deletar um dado da tabela
//   db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Registro deletado com sucesso');
//   });
// });
