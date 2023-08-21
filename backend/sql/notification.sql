CREATE TABLE IF NOT EXISTS notification (
	notification_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT REFERENCES m_user NOT NULL,
	action_user_id INT REFERENCES m_user NOT NULL,
	action_type VARCHAR(200) NOT NULL,
	painting_id INT REFERENCES painting,
	is_read BOOLEAN NOT NULL,
	created_at TIMESTAMP NOT NULL
);