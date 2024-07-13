const router = require("express").Router();
const { jsonResponse } = require('../lib/jsonResponse');
const InteresSchema = require("../schema/InteresSchema")

router.get('/:id', async (req, res) => {
    const interestChoosen = await InteresSchema.findById(req.params.id)
    const itemsList = interestChoosen.contenidos
    res.status(200).json(jsonResponse(200, {itemsList}))
})

module.exports = router;