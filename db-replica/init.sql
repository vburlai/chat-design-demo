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

CREATE USER 'replication'@'%' IDENTIFIED BY 'replication-password-plain-text';
GRANT REPLICATION SLAVE ON *.* TO 'replication'@'%';

/* Copy of db-primary/init.sql ^^^ */
/* Replication setup from 'SHOW MASTER STATUS;' on db-primary */
STOP SLAVE;
CHANGE MASTER TO
    MASTER_HOST='db-primary',
    MASTER_USER='replication',
    MASTER_PASSWORD='replication-password-plain-text',
    MASTER_LOG_FILE='mysql-bin.000003',
    MASTER_LOG_POS=154;
START SLAVE;
