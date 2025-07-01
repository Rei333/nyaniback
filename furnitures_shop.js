const util = require("util"); // Node.js modul
const Furniture = require("./models/Furniture");
const User = require("./models/User");
const UserFurniture = require("./models/UserFurniture");

module.exports = async (req, res) => {
    const { furniture_id } = req.body;
    const id = req.user.id;

    const get_furniture = util.promisify(Furniture.get);
    const get_user = util.promisify(User.get);
    const get_furniture_from_category = util.promisify(UserFurniture.get_from_category);

    try {
        const product = await get_furniture(furniture_id);
        if (!product) return res.status(404).json({ message: "This furniture not exist" });

        const user = await get_user(id);
        if (!user) return res.status(404).json({ message: "This user not exist" });

        if (user.money >= product.price) {
            // Get the user furniture with the same product category
            const user_furniture = await get_furniture_from_category(product.category, id);

            //Check if the user already has a furniture with the same category
            if(user_furniture) {
                //Check if the product is the user furniture
                if(user_furniture.category == product.category && user_furniture.variation == product.variation) {
                    return res.status(404).json({ message: "Tu possèdes déjà ce meuble." });
                } else {
                    //Buy the new furniture
                    user.update_money(-product.price, (err, user_updated) => {
                        if (err) console.error("Error :", err);

                        //Replace old furniture with the new furniture
                        user_furniture.replace(product.id, (err, results) => {
                            return res.status(200).json({ user: user_updated, message: "Le meuble à bien été acheté !" });
                        });
                    });
                }
            } else {
                //Buy the new furniture
                user.update_money(-product.price, (err, user_updated) => {
                    if (err) console.error("Error :", err);

                    //Insert the new furniture
                    UserFurniture.add(id, product.id, (err, results) => {
                        return res.status(200).json({ user: user_updated, message: "Le meuble à bien été acheté !" });
                    });
                });
            }
        } else {
            return res.status(400).json({ message: "Tu n'as pas assez d'argent pour acheter ce meuble." });
        }

    } catch (err) {
        return res.status(500).json({ message: "Error: " + err });
    }
}