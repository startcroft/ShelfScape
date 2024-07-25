const router = require("express").Router();
const { jsonResponse } = require('../lib/jsonResponse');
const InteresSchema = require("../schema/InteresSchema");
const mongoose = require('mongoose');

router.get('/:id', async (req, res) => {
  const interestChoosen = await InteresSchema.findById(req.params.id)
  const itemsList = interestChoosen.contenidos
  res.status(200).json(jsonResponse(200, { itemsList }))
});

router.post('/create/:id', async (req, res) => {
  const interest = await InteresSchema.findById(req.params.id);
  interest.contenidos.push(req.body);
  await interest.save();
  res.status(200).json(jsonResponse(200, 'Content added'))
});

router.put('/edit/:id', async (req, res) => {
  const { name, link, date, id } = req.body;
  const itemId = req.params.id;
  const interest = await InteresSchema.findOneAndUpdate(
    { _id: itemId, "contenidos.id": id },
    {
      $set: {
        "contenidos.$.name": name,
        "contenidos.$.link": link,
        "contenidos.$.date": date
      }
    },
    { new: true }
  );

  if (interest) {
    res.status(200).json(jsonResponse(200, 'Content updated'));
  } else {
    res.status(404).json(jsonResponse(404, 'Item not found'));
  }
});

router.patch('/delete/:id', async (req, res) => {

  const interest = await InteresSchema.findById(req.params.id);
  if (!interest) {
    return res.status(404).json(jsonResponse(404, 'Interest not found'));
  }

  const updatedContent = interest.contenidos.filter(item => item.id !== req.body.id);
  interest.contenidos = updatedContent;
  await interest.save();
  res.status(200).json(jsonResponse(200, 'Item deleted'));
});

module.exports = router;