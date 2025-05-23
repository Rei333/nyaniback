const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
const db = require("./db");

app.get("/user", (req, res) => {
    db.query("SELECT money FROM users WHERE id = 1", (err, results) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(results[0]);
    });
});

// app.get("/user", (req, res) => {
//     res.json({
//         id: 1,
//         pseudo:"test",
//         mail:"test@gmail.com",
//         money: 254,
//         admin: 0,
//         energy: 100,
//         satiety: 90,
//         hapiness: 100,
//         health: 100,
//         living_room: 1,
//         dining_room: 0,
//         kitchen: 0,
//         bathroom: 0,
//         bedroom: 0,
//         office: 0
//     })
// })

// app.get("/furnitures", (req, res) => {
//     res.json([
//         { category: "Bureau", variation: "en bois bleu", price: 500, image: "/bdd/furnitures/bureau_bois_bleu.png" },
//         { category: "Bureau", variation: "en bois violet", price: 500, image: "/bdd/furnitures/bureau_bois_violet.png" },
//         { category: "Commode", variation: "en bois bleu", price: 120, image: "/bdd/furnitures/commode_bois_bleu.png" },
//         { category: "Commode", variation: "en bois brun", price: 120, image: "/bdd/furnitures/commode_bois_brun.png" },
//         { category: "Commode", variation: "en bois jaune", price: 120, image: "/bdd/furnitures/commode_bois_jaune.png" }
//     ])
// })

// app.get("/user/furnitures", (req, res) => {
//     res.json([
//         { category: "Bureau", variation: "en bois bleu", image: "/bdd/furnitures/bureau_bois_bleu.png" },
//         { category: "Commode", variation: "en bois jaune", image: "/bdd/furnitures/commode_bois_jaune.png" }
//     ])
// })

app.listen(port, () => {
    console.log("npm run start lancé !");
})