-- Replication setup from 'SHOW MASTER STATUS;' on db-primary
STOP SLAVE;
CHANGE MASTER TO
    MASTER_HOST='db-primary',
    MASTER_USER='replication',
    MASTER_PASSWORD='replication-password-plain-text',
    MASTER_LOG_FILE='mysql-bin.000003',
    MASTER_LOG_POS=156;
START SLAVE;