const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwt_key} = require("./utils/config");

module.exports = (req, res) => {
    const { pseudo, password } = req.body;

    User.get_by_pseudo(pseudo, (err, user) => {
        if(err) return res.status(500).json({ message: "Une erreur s'est produite." });
        if(!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: "Le pseudo ou le mot de passe est incorrect." });

        delete user.password;

        const token = jwt.sign({ id: user.id }, jwt_key, { expiresIn: "6h" });
        res.json({data: user, token: token});
    });
}