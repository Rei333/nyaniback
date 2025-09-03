const db=require("../utils/db.js");

class User {
	constructor(data) {
        // USER
		this.id = data.id;
		this.pseudo = data.pseudo;
        this.password = data.password;
		this.mail = data.mail;
		this.money = data.money;
        this.admin = data.admin;

        // NYANIMAL
        this.energy = data.energy;
        this.satiety = data.satiety;
        this.hapiness = data.hapiness;
        this.health = data.health;

        // HOUSE
        this.living_room = data.living_room;
        this.dining_room = data.dining_room;
        this.kitchen = data.kitchen;
        this.bathroom = data.bathroom;
        this.bedroom = data.bedroom;
        this.office = data.office;
	}

	static add(pseudo, mail, pwd, callback) {
		db.query(
			"INSERT INTO users (pseudo, password, mail) VALUES (?, ?, ?)", [pseudo, pwd, mail], (err, results) => {
				if (err) return callback(err);
				callback(null, results);
			}
		);
	}

	static get(id, callback) {
		db.query("SELECT id, pseudo, mail, money FROM users WHERE id = ?", [id], (err, results) => {
			if (err) return callback(err); // error
			if (results.length === 0) return callback(null, null); // no error, no result

			const user = new User(results[0]);
			callback(null, user); // no error, send user
		});
	}

	static get_by_pseudo(pseudo, callback) {
		db.query("SELECT id, pseudo, password, mail, money FROM users WHERE pseudo = ?", [pseudo], (err, results) => {
			if (err) return callback(err);
			if (results.length === 0) return callback(null, null);

			const user = new User(results[0]);
			callback(null, user);
		});
	}

    update_money(price, callback) {
        db.query("UPDATE users SET money = money + ? WHERE id = ?", [price, this.id], (err, results) => {
            if (err) return callback(err);

            this.money += price;
            callback(null, this);
        });
    }
}

module.exports = User;