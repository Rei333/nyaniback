const db=require("../utils/db.js");

class Furniture {
	constructor(data) {
        this.id = data.id;
        this.category = data.category;
        this.variation = data.variation;
        this.price = data.price;
        this.image = data.image;
	}

	static get(id, callback) {
		db.query("SELECT * FROM furnitures WHERE id = ?", [id], (err, results) => {
			if (err) return callback(err);
			if (results.length === 0) return callback(null, null);

			callback(null, new Furniture(results[0]));
		});
	}

    static get_all(callback) {
		db.query("SELECT * FROM furnitures", (err, results) => {
			if (err) return callback(err);
			if (results.length === 0) return callback(null, null);

            const furnitures = results.map(furniture => new Furniture(furniture));
			callback(null, furnitures);
		});
	}
}

module.exports = Furniture;