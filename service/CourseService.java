package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.UserCourse;
import com.mycompany.myapp.repository.CourseRepository;
import com.mycompany.myapp.repository.UserCourseRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.dto.courseDTO;
import com.mycompany.myapp.service.mapper.CourseMapper;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CourseService {
    private UserRepository userRepository;
    private CourseRepository courseRepository;
    private UserCourseRepository userCourseRepository;

    private CourseMapper courseMapper;

    /**
     * 1. check user exist based on name? -> get User
     * 2. check course exist based on name? -> get course
     * 3. new UserCourse(User, Course)
     * 4. remove this new UserCourse
     * @param userName
     * @param courseName
     */
    public void dropCourse(String userName, String courseName) {
        // step 1,2,3
        UserCourse userCourse = getUserCourse(userName, courseName);
        // remove
        userCourseRepository.deleteByUserAndCourse(userCourse.getUser(), userCourse.getCourse());
    }

    public List<courseDTO> listCourse() {
        List<Course> courses = courseRepository.findAll();
//        List<courseDTO> courseDTOList = new ArrayList<>();
//        for (Course course : courses) {
//            courseDTOList.add(courseMapper.courseToCourseDTO(course));
//        }
//        return courseDTOList;
        // Java 8 stream
        return courses.stream()
                .map(course -> courseMapper.courseToCourseDTO(course))
            .collect(Collectors.toList());
    }

    /**
     * 1. User exists -> get User
     * 2. Get List<UserCourse> based on User
     * 3. Get List<Course> from List<UserCourse>
     * 4. Convert to DTO
     * @param userName
     * @return
     */
    public List<courseDTO> listStudentCourses(String userName) {
        Optional<User> optionalUser = userRepository.findOneByLogin(userName);
        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("No such user: " + userName));
        List<UserCourse> allByUser = userCourseRepository.findAllByUser(user);

        return allByUser.stream()
            .map(userCourse -> userCourse.getCourse())
            .map(course -> courseMapper.courseToCourseDTO(course))
            .collect(Collectors.toList());
    }

    /**
     * 1. check user exist based on name? -> get User
     * 2. check course exist based on name? -> get course
     * 3. new UserCourse(User, Course)
     * 4. check if this relationship(UserCourse) exist
     * 5. save this new UserCourse
     * @param userName
     * @param courseName
     */
    public void addCourse(String userName, String courseName) {
        // step 1,2,3
        UserCourse userCourse = getUserCourse(userName, courseName);
        // 4. check relationship
        Optional<UserCourse> optionalUserCourse = userCourseRepository.findOneByUserAndCourse(userCourse.getUser(), userCourse.getCourse());
        optionalUserCourse.ifPresent(existingUserCourse -> {
            throw new IllegalArgumentException("UserCourse already exists: " + existingUserCourse.toString());
        });
        // 5. save
        userCourseRepository.save(userCourse);

    }

    /**
     * 1. check user exist based on name? -> get User
     * 2. check course exist based on name? -> get course
     * 3. new UserCourse(User, Course)
     * @param userName
     * @param courseName
     */
    private UserCourse getUserCourse(String userName, String courseName) {
        Optional<User> optionalUser = userRepository.findOneByLogin(userName);
        // unbox it, if it's null, throw exception, else assign it to user
        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("No such user: " + userName));

        Optional<Course> optionalCourse = courseRepository.findOneByCourseName(courseName);
        Course course = optionalCourse.orElseThrow(() -> new IllegalArgumentException("No such course: " + courseName));

        return new UserCourse(user, course);
    }
}
