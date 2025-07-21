require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const initializeDatabase = require('./db/database');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();
const port = 4586;

app.use(cors());
app.use(express.json());

async function startServer() {
  const db = await initializeDatabase();


  // Rotas da API e autenticação
  app.use('/movie/auth', authRoutes(db));
  app.use('/movie/api', apiRoutes(db));

  app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`);
  });
}

startServer();
