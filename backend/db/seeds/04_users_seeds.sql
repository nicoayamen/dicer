-- users seeds

-- Insert first user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email)
VALUES ('Jasper', 'Smith', 'backend/db/docs/profile-images/User1-1.png', 1, 1, 'jasper_s@example.com');

-- Insert second user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email)
VALUES ('Eve', 'Johnson', 'backend/db/docs/profile-images/User2-1.jpg', 1, 1, 'eve_j@example.com');
