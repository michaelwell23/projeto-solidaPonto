import express from 'express';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';

import dataItems from './config/data-items';

import db from './database/db';

const app = express();
nunjucks.configure('src/views', {
  express: app,
  noCache: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.render('index.njk');
});

app.get('/create-point', (req, res) => {
  return res.render('create-point.njk');
});

app.post('/save-point', (req, res) => {
  const query = `
      INSERT INTO places (
          image,
          name,
          email,
          phone,
          address,
          neighborhood,
          zip_code,
          number_address,
          state,
          city,
          items
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.email,
    req.body.phone,
    req.body.address,
    req.body.neighborhood,
    req.body.zip_code,
    req.body.number_address,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log('cadastrado com sucesso');

    return res.render('create-point.njk', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

app.get('/search', (req, res) => {
  const search = req.query.search;

  if (search == '') {
    return res.render('search-results.njk', { total: 0 });
  }

  db.all(
    `SELECT * FROM places WHERE city LIKE '%${search}%'`,
    function (err, rows) {
      if (err) {
        console.log(err);
        return res.send('Erro no Cadastro!');
      }

      // Desestruturando os itens após buscá-los do banco de dados
      const places = rows.map((row) => {
        const {
          image,
          name,
          email,
          phone,
          address,
          neighborhood,
          zip_code,
          number_address,
          state,
          city,
          items,
        } = row;

        // Convertendo a string de itens em um array
        const itemsArray = items
          .split(',')
          .map((item) => parseInt(item.trim()));

        // Verificação e substituição dos valores contidos em "items" pelos IDs correspondentes do array em "dataItems"
        const updatedItems = itemsArray.map((itemId) => {
          const item = dataItems.find((item) => item.id === itemId);
          return { id: itemId, imageUrl: item ? item.imageUrl : null };
        });

        return {
          image,
          name,
          email,
          phone,
          address,
          neighborhood,
          zip_code,
          number_address,
          state,
          city,
          items: updatedItems,
        };
      });

      const total = places.length;

      return res.render('search-results.njk', { places, total });
    }
  );
});

export default app;
