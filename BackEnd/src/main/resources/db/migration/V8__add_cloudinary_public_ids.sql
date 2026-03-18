-- Add Cloudinary public IDs to projects table for cloud media deletion
ALTER TABLE projects ADD COLUMN image_public_id VARCHAR(500);
ALTER TABLE projects ADD COLUMN video_public_id VARCHAR(500);
