package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse, Long> {

    Optional<UserCourse> findOneByUserAndCourse(User user, Course course);

    @Transactional // add/delete/modify method all need this annotation
    void deleteByUserAndCourse(User user, Course course);

    List<UserCourse> findAllByUser(User user);
}
