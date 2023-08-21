CREATE TABLE IF NOT EXISTS m_comment (
	comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user,
	painting_id INT REFERENCES painting,
	text TEXT,
	created_at TIMESTAMP NOT NULL
);