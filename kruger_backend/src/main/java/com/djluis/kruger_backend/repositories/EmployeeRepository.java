package com.djluis.kruger_backend.repositories;

import com.djluis.kruger_backend.modals.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Luis Suárez
 */
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long>{
    
}
