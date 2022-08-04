package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// every repository controls one table
@Repository
//<ORM model class, primary key data type>
public interface CourseRepository extends JpaRepository<Course, Long>   {

    Optional<Course> findOneByCourseName(String courseName);

}
