CREATE TABLE IF NOT EXISTS painting (
	painting_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user,
	name VARCHAR(200) NOT NULL,
	caption VARCHAR(23) NOT NULL,
	image_url TEXT NOT NULL,
	price INT NOT NULL,
	ai_price INT NOT NULL,
	created_at TIMESTAMP NOT NULL
);