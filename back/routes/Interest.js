const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const InteresSchema = require("../schema/InteresSchema");

router.post("/", async (req, res) => {
    try {
        const interestList = await InteresSchema.find({ userId: req.body.id });
        
        if (interestList) {
            res.status(200).json(jsonResponse(200, { interestList }));
        } else {
            res.status(404).json(jsonResponse(404, "No interests found"));
        }
    } catch (error) {
        res.status(500).json(jsonResponse(500, error.message));
    }
});

router.get('/view/:id', async (req, res) => {
    const interestFound = await InteresSchema.findById(req.params.id);
    res.status(200).json(jsonResponse(200, interestFound))
})

router.delete("/delete", async (req, res) => {
    await InteresSchema.findByIdAndDelete(req.body.id);
    res.status(200).json(jsonResponse(200, "Interest deleted"))
});

router.put("/edit/:id", async (req, res) => {
    const { nombre, imagenURL } = req.body;
    const interestId = req.params.id;
    await InteresSchema.findByIdAndUpdate(req.params.id, { nombre, imagenURL});
    res.status(200).json(jsonResponse(200, interestId))
})
module.exports = router;