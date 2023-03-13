const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customers');

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer) {
    return res.status(400).send('The course with the qiven id was not found');
  }
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) {
    res.status(400).send('The course with the qiven id was not found');
    return;
  }

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    res.status(400).send('The course with the qiven id was not found');
    return;
  }
  res.send(customer);
});

module.exports = router;
