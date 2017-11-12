
CREATE DATABASE roar;

use roar;


CREATE TABLE user(

	user_id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,

	username VARCHAR(255),

	password VARCHAR(256),

	email VARCHAR(256) UNIQUE,

	user_role ENUM('USER', 'ADMIN', 'MOD')
);



CREATE TABLE post(

	post_id MEDIUMINT PRIMARY KEY AUTO_INCREMENT,

	postedBy MEDIUMINT,

	likes MEDIUMINT,

	content VARCHAR(140),

	FOREIGN KEY (postedBy) REFERENCES user(user_id)
);



CREATE TABLE postLike(

	post_id MEDIUMINT,

	user_id MEDIUMINT,

	FOREIGN KEY (post_id) REFERENCES post(post_id),

	FOREIGN KEY (user_id) REFERENCES user(user_id)
);
