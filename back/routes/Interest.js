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

router.delete("/delete", async (req, res) => {
    await InteresSchema.findByIdAndDelete(req.body.id);
    res.status(200).json(jsonResponse(200, "Interest deleted"))
})
module.exports = router;