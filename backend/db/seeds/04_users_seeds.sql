-- users seeds

-- Insert first user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email, password)
VALUES ('Jasper', 'Smith', 'https://raw.githubusercontent.com/nicoayamen/dicer/dev/backend/db/docs/profile-images/User1-1.png', 1, 1, 'jasper_s@example.com', 'letmein');

-- Insert second user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email, password)
VALUES ('Eve', 'Johnson', 'https://raw.githubusercontent.com/nicoayamen/dicer/dev/backend/db/docs/profile-images/User2-1.jpg', 2, 2, 'eve_j@example.com', 'password1234');

-- Insert third user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email, password)
VALUES ('Morty', 'Smith', 'https://raw.githubusercontent.com/nicoayamen/dicer/dev/backend/db/docs/profile-images/User3-3.jpg', 2, 3, 'morty_s@example.com', 'moe');

-- Insert fourth user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email, password)
VALUES ('Sophia', 'Davis', 'https://raw.githubusercontent.com/nicoayamen/dicer/dev/backend/db/docs/profile-images/User4-1.png', 2, 4, 'sophia_d@example.com', 'sophiapass');

-- Insert fifth user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email, password)
VALUES ('Liam', 'Williams', 'https://raw.githubusercontent.com/nicoayamen/dicer/dev/backend/db/docs/profile-images/User5-2.jpg', 1, 5, 'liam_w@example.com', 'liampass');

-- Insert sixth user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email, password)
VALUES ('Emma', 'Taylor', 'https://raw.githubusercontent.com/nicoayamen/dicer/dev/backend/db/docs/profile-images/User7-1.png', 1, 6, 'emma_t@example.com', 'emmapass');

-- Insert seventh user
INSERT INTO users (first_name, last_name, photo, availability_id, role_id, email, password)
VALUES ('Noah', 'Moore', 'https://raw.githubusercontent.com/nicoayamen/dicer/dev/backend/db/docs/profile-images/User6-1.png', 2, 7, 'noah_m@example.com', 'noahpass');
