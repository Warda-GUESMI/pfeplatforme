package com.pfetracker.security.module3;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static UserPrincipal getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal) {
            return (UserPrincipal) authentication.getPrincipal();
        }
        return null;
    }

    public static Long getCurrentUserId() {
        UserPrincipal user = getCurrentUser();
        return user != null ? user.getId() : null;
    }

    public static String getCurrentUserRole() {
        UserPrincipal user = getCurrentUser();
        return user != null ? user.getRole() : null;
    }

    public static boolean isStudent() {
        return "STUDENT".equals(getCurrentUserRole());
    }

    public static boolean isSupervisor() {
        return "SUPERVISOR".equals(getCurrentUserRole());
    }
}

