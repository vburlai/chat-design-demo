CREATE DATABASE `chat-db`;

USE `chat-db`;

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

-- Create chat-rw user here
CREATE USER `chat-rw`@`%` IDENTIFIED WITH mysql_native_password AS '*DD9D20C532332DC0206681801958EBC5396EED6E';
GRANT USAGE ON *.* TO `chat-rw`@`%`;
GRANT ALL PRIVILEGES ON `chat-db`.* TO `chat-rw`@`%`;

-- Create chat-ro user here
CREATE USER `chat-ro`@`%` IDENTIFIED WITH mysql_native_password AS '*1CBEED718E7A6ED7FF6F1052673CE854B36F678D';
GRANT SELECT ON `chat-db`.* to `chat-ro`@`%`;

-- Replication account
CREATE USER 'replication'@'%' IDENTIFIED WITH mysql_native_password AS '*2DBAFB5BB2A891DE39211403285450FFEEFE5B12';
GRANT REPLICATION SLAVE ON *.* TO 'replication'@'%';
