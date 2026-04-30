package com.pfetracker.module3.repository;

import com.pfetracker.module3.entity.PFE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PFERepository extends JpaRepository<PFE, Long> {

    Optional<PFE> findByStudentId(Long studentId);

    @Query("SELECT p FROM PFE p WHERE p.supervisorId = :supervisorId")
    List<PFE> findBySupervisorId(@Param("supervisorId") Long supervisorId);

    @Query("SELECT p FROM PFE p WHERE p.supervisorId = :supervisorId AND p.status IN ('INITIALIZED', 'IN_PROGRESS', 'DELAYED')")
    List<PFE> findActiveBySupervisorId(@Param("supervisorId") Long supervisorId);

    @Query("SELECT p FROM PFE p WHERE p.status IN ('INITIALIZED', 'IN_PROGRESS', 'DELAYED')")
    List<PFE> findAllActive();

    @Query("SELECT p FROM PFE p WHERE p.studentId IN :studentIds")
    List<PFE> findByStudentIds(@Param("studentIds") List<Long> studentIds);
}
