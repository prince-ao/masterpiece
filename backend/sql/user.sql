CREATE TABLE IF NOT EXISTS m_user (
	user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username varchar(20) NOT NULL,
	email TEXT NOT NULL,
	password CHAR(23) NOT NULL,
	created_at TIMESTAMP NOT NULL
);