package com.pfetracker.repository.module3;

import com.pfetracker.entity.module3.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.role = 'STUDENT' AND u.departmentId = :deptId")
    List<User> findStudentsByDepartment(@Param("deptId") Long deptId);

    @Query("SELECT u FROM User u WHERE u.role = 'SUPERVISOR' AND u.departmentId = :deptId")
    List<User> findSupervisorsByDepartment(@Param("deptId") Long deptId);

    @Query("SELECT u FROM User u WHERE u.id IN :ids")
    List<User> findByIds(@Param("ids") List<Long> ids);
}

