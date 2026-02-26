package com.casainterior.backend.converter;

import com.casainterior.backend.enums.AdminRole;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * JPA converter for AdminRole enum.
 * Reads the stored string case-insensitively so that legacy values
 * like "main_admin" or "admin" map correctly to MAIN_ADMIN / ADMIN.
 * Writes the canonical uppercase enum name back to the DB.
 */
@Converter
public class AdminRoleConverter implements AttributeConverter<AdminRole, String> {

    @Override
    public String convertToDatabaseColumn(AdminRole role) {
        if (role == null)
            return null;
        return role.name(); // always writes MAIN_ADMIN / ADMIN (uppercase)
    }

    @Override
    public AdminRole convertToEntityAttribute(String dbValue) {
        if (dbValue == null)
            return null;
        return AdminRole.valueOf(dbValue.toUpperCase().replace(" ", "_"));
    }
}
