const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/User");

router.post("/", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json(jsonResponse('Email already in use', false));
        }

        const usernameExist = await User.findOne({ username });
        if (usernameExist) {
            return res.status(400).json(jsonResponse('Username already in use', false));
        }

        const newUser = new User({
            username,
            correo: email,
            password
        });

        await newUser.save();

        res.status(201).json(jsonResponse('User created succeesfully!', true));

    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse('Internal server error', false));
    }

});

module.exports = router;