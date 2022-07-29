package com.djluis.kruger_backend.services;

import com.djluis.kruger_backend.modals.EmployeeModel;
import com.djluis.kruger_backend.repositories.EmployeeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Luis Suárez
 */
@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    
    public EmployeeModel store (EmployeeModel em) {
        return employeeRepository.save(em);
    }
    
    public List<EmployeeModel> index () {
        return employeeRepository.findAll();
    }
}
