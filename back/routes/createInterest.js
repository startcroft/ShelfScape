const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/User");

router.post("/:id/intereses", async(req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) {
          return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        console.log("Es la ruta correcta")
    
        // const nuevoInteres = {
        //   interesID: new mongoose.Types.ObjectId(),
        //   nombre: req.body.nombre,
        //   imagenURL: req.body.imagenURL || '',
        //   contenidos: req.body.contenidos || []
        // };
    
        // User.intereses.push(nuevoInteres);
        // await User.save();
        res.status(201);
      } catch (error) {
        res.status(400).send(error);
      }

});

module.exports = router;