import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleProfile from './controllers/profile.js';
import handleImage from './controllers/image.js';
import handleClarifai from './controllers/clarifai.js';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '**05h',
    database: 'smart-brain',
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('it\' working');
})
app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt));

app.post('/clarifai', (req, res) => handleClarifai(req, res));

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => handleProfile(req, res, db));

app.put('/image', (req, res) => handleImage(req, res, db))

app.listen(8080, () => {
    console.log('running on 3000');
})