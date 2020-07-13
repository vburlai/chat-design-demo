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
);

CREATE INDEX chat_users_by_room
ON chat_users (room);
