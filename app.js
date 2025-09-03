const express = require("express");
const cors = require("cors");
const app = express();
const {port} = require("./utils/config");

app.use(cors());
app.use(express.json());

const decode_jwt = require("./utils/decode_jwt");

const login = require("./login");
const register = require("./register");
const furnitures_shop = require("./furnitures_shop");
const User = require("./models/User");
const Furniture = require("./models/Furniture");
const UserFurniture = require("./models/UserFurniture");

app.post("/login", login);
app.post("/register", register);
app.post("/furnitures/buy", decode_jwt, furnitures_shop);

app.get("/user", decode_jwt, (req, res) => {
    const id = req.user.id;

    User.get(id, (err, user) => {
        if(err) return res.status(500).json({message: "Error : " + err});
        if(!user) return res.status(404).json({message: "This user not exist"});

        res.json(user);
    });
});

app.get("/furnitures", (req, res) => {
    Furniture.get_all((err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});

app.get("/user/furnitures", decode_jwt, (req, res) => {
    const id = req.user.id;

    UserFurniture.get_user_furnitures(id, (err, results) => {
        if (err) {
            console.error("DB error : ", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log("npm run start lancé !");
})