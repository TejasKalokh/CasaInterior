ALTER TABLE admin_users 
MODIFY role ENUM('main_admin','admin') NOT NULL;