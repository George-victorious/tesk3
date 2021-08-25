const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();

import { TBuy, TUser } from './types';
const users: TUser[] = require('./users');
const buyList: TBuy[] = require('./buyList');

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/login', (req: any, res: any) => {
  const { email, password } = req.query;
  const currentUser = users.filter(
    (user) => user.email === email && user.password === password
  )[0];
  res.status(200).json({
    user: currentUser ?? null,
  });
});

app.put('/registry', jsonParser, (req: any, res: any) => {
  const user = users.find((user: TUser) => user.email === req.body.user.email);
  if (user) {
    res.status(409).json({
      user: null,
      isError: {
        status: true,
        message: 'User with this email already exists!',
      },
    });
  } else {
    users.push({ ...req.body.user, id: new Date().getTime() });
    res.status(201).json({
      user: req.body.user,
      isError: {
        status: false,
        message: '',
      },
    });
  }
});

app.get('/users', (req: any, res: any) => {
  const newUsers = users.map(user => ({
    ...user,
    buyCount: buyList.filter(buy => buy.userId === user.id).length
  }))
  res.status(200).json({
    users: newUsers,
  });
});

app.get('/buylist', (req: any, res: any) => {
  const { id } = req.query;
  const buyListFiltered = buyList.filter((user) => user.userId === +id);
  res.status(200).json({
    buyList: buyListFiltered,
  });
});

app.put('/order', jsonParser, (req: any, res: any) => {
  const { id } = req.body;
  buyList.push({...req.body.order, userId: id})
  res.status(200).json({
    order: req.body.order,
  });
});

app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:${4000}`);
});
