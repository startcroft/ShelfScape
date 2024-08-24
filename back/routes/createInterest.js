const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const InteresSchema = require("../schema/InteresSchema");
const User = require("../schema/User");

router.post("/:id/intereses", async(req, res) => {
  try {
      const usuario = await User.findById(req.params.id);
      if (!usuario) {
        return res.status(404).send({ error: 'Usuario no encontrado' });
      }

      const {nombre, imagenURL, contenidos} = req.body;
      const userId = req.params.id;
      const newInterest = new InteresSchema({nombre, imagenURL, contenidos, userId})
    
      await newInterest.save();

      res.status(201).json({ message: "Interest added sucessfully!"});
      } catch (error) {
        res.status(400).send(error);
      }

});

module.exports = router;