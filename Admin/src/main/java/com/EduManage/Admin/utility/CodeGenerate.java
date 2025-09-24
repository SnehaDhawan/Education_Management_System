package com.EduManage.Admin.utility;

import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import jakarta.persistence.EntityManager;
import java.time.Year;

@Component
public class CodeGenerate {

    @Autowired
    private EntityManager entityManager;


    public String generateCode(String tableName, String columnName, String prefix) {
        String sql = "SELECT " + columnName + " FROM " + tableName + " ORDER BY id DESC LIMIT 1";
        Query query = entityManager.createNativeQuery(sql);
        String lastCode = null;
        try {
            lastCode = (String) query.getSingleResult();
        } catch (Exception e) {
            lastCode = null; // no rows yet
        }
        int nextNumber = 1;
        if (lastCode != null && lastCode.contains("-")) { // e.g., STU2025-0001
            String numPart = lastCode.substring(lastCode.indexOf("-") + 1);
            try {
                nextNumber = Integer.parseInt(numPart) + 1;
            } catch (NumberFormatException e) {
                nextNumber = 1;
            }
        }
        String year = String.valueOf(Year.now().getValue());
        String padded = String.format("%04d", nextNumber);
        return prefix + year + "-" + padded;

    }
}
