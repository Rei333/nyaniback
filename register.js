const User = require("./models/User");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
    const { pseudo, mail, password } = req.body;

    if (typeof pseudo !== "string" || pseudo.length <= 2 || typeof password !== "string" || password.length <= 6 || typeof mail !== "string" || mail.length <= 6 || !mail.includes("@")) {
        return res.status(400).json({
            message: "Les champs ne sont pas correctement remplis."
        });
    }

    const hash_pwd = bcrypt.hashSync(password, 10); //  10 = salt rounds, nb of hash iterations

    User.add(pseudo, mail, hash_pwd, (err, results) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    message: "Le pseudo ou l'email existe déjà, veuillez en choisir un autre."
                });
            }

            return res.status(500).json({
                message: "Une erreur s'est produite lors de l'inscription."
            });
        }

        res.status(200).json({
            message: "Votre compte a bien été créé. Vous pouvez vous connecter."
        });
    });
}