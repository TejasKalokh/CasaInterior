ALTER TABLE admin_users 
MODIFY COLUMN role ENUM('main_admin','admin') NOT NULL;