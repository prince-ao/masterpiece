CREATE TABLE IF NOT EXISTS m_user (
	user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username varchar(25) NOT NULL,
	email TEXT NOT NULL,
	bio TEXT,
	profile_image_url TEXT,
	password VARCHAR(100) NOT NULL,
	created_at TIMESTAMP NOT NULL
);