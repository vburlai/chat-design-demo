CREATE TABLE chat_rooms (
    room_id VARCHAR(16) NOT NULL UNIQUE,
    name VARCHAR(32) NOT NULL,
    PRIMARY KEY (room_id)
);

INSERT INTO chat_rooms (room_id, name) VALUES
('room-1', 'Room 1'),
('room-2', 'Room 2');
