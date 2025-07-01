const db=require("../utils/db.js");
const Furniture = require("./Furniture.js");

class UserFurniture extends Furniture {
	constructor(data) {
        super(data);
        this.user_id = data.user_id;
	}

    static get_user_furnitures(user_id, callback) {
        db.query("SELECT furnitures.* FROM users_furnitures INNER JOIN furnitures ON users_furnitures.furniture_id = furnitures.id WHERE user_id = ?", [user_id], (err, results) => {
            if(err) return callback(err);
			if(results.length === 0) return callback(null, null);

            const furnitures = results.map(furniture => new Furniture(furniture));
			callback(null, furnitures);
        });
    }

    static get_from_category(category, user_id, callback) {
        db.query("SELECT furnitures.*, users_furnitures.user_id FROM users_furnitures INNER JOIN furnitures ON users_furnitures.furniture_id = furnitures.id WHERE user_id=? AND category=?", [user_id, category], (err, results) => {
            if(err) return callback(err);
			if(results.length === 0) return callback(null, null);

            const furniture = new UserFurniture(results[0]);
			callback(null, furniture);
        });
    }

    static add(user_id, id, callback) {
        db.query("INSERT INTO users_furnitures (user_id, furniture_id) VALUES (?, ?)", [user_id, id], (err, results) => {
            if(err) return callback(err);
            callback(null, null);
        });
    }

    replace(id, callback) {
        db.query("UPDATE users_furnitures SET furniture_id = ? WHERE user_id=? AND furniture_id=?", [id, this.user_id, this.id], (err, results) => {
            if(err) return callback(err);
            this.id = id;
            callback(null, this);
        });
    }
}

module.exports = UserFurniture;