const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/User");

router.post("/", async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required"
            })
        );
    }

    const user = await User.findOne({ username });

    if(user) {
        if(user.password === password){
            res.status(200).json(jsonResponse(200, { user }));
        } else {
            res.status(400).json(jsonResponse(400, { error: "User or password incorrect" }));
        }

    } else {
        res.status(400).json(
            jsonResponse(400, {
                error: "User not found"
            })
        )
    }
});

module.exports = router;
