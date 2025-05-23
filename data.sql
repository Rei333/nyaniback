DROP TABLE IF EXISTS users, furnitures, clothes, food, users_furnitures, users_clothes, users_foods;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    pseudo VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    money INT NOT NULL DEFAULT 1500,
    admin BOOLEAN NOT NULL DEFAULT FALSE,

    -- NYANIMAL
    energy INT NOT NULL DEFAULT 100,
    satiety INT NOT NULL DEFAULT 90,
    hapiness INT NOT NULL DEFAULT 100,
    health INT NOT NULL DEFAULT 100,

    -- HOUSE
    living_room BOOLEAN NOT NULL DEFAULT TRUE,
    dining_room BOOLEAN NOT NULL DEFAULT FALSE,
    kitchen BOOLEAN NOT NULL DEFAULT FALSE,
    bathroom BOOLEAN NOT NULL DEFAULT FALSE,
    bedroom BOOLEAN NOT NULL DEFAULT FALSE,
    office BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE furnitures (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category VARCHAR(255) NOT NULL, -- table, lit
    variation VARCHAR(255) NOT NULL, -- granit rouge, granit bleu, carton vert
    price INT NOT NULL DEFAULT 100,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE clothes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    category VARCHAR(255) NOT NULL, -- t-shirt, pantalon
    variation VARCHAR(255) NOT NULL, -- granit rouge, laine verte
    price INT NOT NULL DEFAULT 100,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE food (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL DEFAULT 10,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE users_furnitures (
    user_id INT NOT NULL,
    furniture_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (furniture_id) REFERENCES furnitures(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, furniture_id)
);

CREATE TABLE users_clothes (
    user_id INT NOT NULL,
    clothe_id INT NOT NULL,
    is_wear BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (clothe_id) REFERENCES clothes(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, clothe_id)
);

CREATE TABLE users_foods (
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, food_id)
);

INSERT INTO users (pseudo, password, mail) VALUES ("test", "$2y$10$xmbmoDaIkOxEo27KZR.ike5x2MqeNtV2HOOsUppsxvj2ya3jVCBBS", "test@gmail.com");

INSERT INTO furnitures (category, variation, price, image) VALUES ("Bureau", "en bois bleu", 500, "/img/bdd/furnitures/bureau_bois_bleu.png"), ("Bureau", "en bois violet", 500, "/img/bdd/furnitures/bureau_bois_violet.png"), ("Commode", "en bois bleu", 120, "/img/bdd/furnitures/commode_bois_bleu.png"), ("Commode", "en bois brun", 120, "/img/bdd/furnitures/commode_bois_brun.png"), ("Commode", "en bois jaune", 120, "/img/bdd/furnitures/commode_bois_jaune.png");