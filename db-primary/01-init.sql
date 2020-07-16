CREATE TABLE chat_rooms (
    room_id VARCHAR(16) NOT NULL UNIQUE,
    name VARCHAR(32) NOT NULL,
    PRIMARY KEY (room_id)
);

INSERT INTO chat_rooms (room_id, name) VALUES
('room-1', 'Room 1'),
('room-2', 'Room 2'),
('room-3', 'Room 3');

CREATE TABLE chat_users (
    clientId VARCHAR(16) NOT NULL,
    hostname VARCHAR(32) NOT NULL,
    room VARCHAR(16) NOT NULL,
    username VARCHAR(128),
    joined TIMESTAMP not null DEFAULT now(),
    PRIMARY KEY (clientId, hostname, room),
    FOREIGN KEY (room) REFERENCES chat_rooms(room_id)
) ENGINE = MEMORY; /* keep it in memory so Docker restarts will clear it */

CREATE INDEX chat_users_by_room
ON chat_users (room);

CREATE TABLE messages (
    room VARCHAR(16) NOT NULL,
    message VARCHAR(256),
    sent TIMESTAMP not null DEFAULT now(),
    FOREIGN KEY (room) REFERENCES chat_rooms(room_id)
);

CREATE INDEX messages_by_room
ON messages (room);

-- chat-rw account gets created by Docker entrypoint from env variables
-- https://hub.docker.com/_/mysql
-- Create chat-ro user here
CREATE USER `chat-ro`@`%` IDENTIFIED WITH mysql_native_password AS '*1CBEED718E7A6ED7FF6F1052673CE854B36F678D';
GRANT SELECT ON `chat-db`.* to `chat-ro`@`%`;

-- Replication account
CREATE USER 'replication'@'%' IDENTIFIED BY 'replication-password-plain-text';
GRANT REPLICATION SLAVE ON *.* TO 'replication'@'%';
