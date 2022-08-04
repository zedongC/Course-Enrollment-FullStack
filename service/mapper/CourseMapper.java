package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Course;
import com.mycompany.myapp.service.dto.courseDTO;
import org.springframework.stereotype.Service;

@Service
public class CourseMapper {

    public courseDTO courseToCourseDTO(Course course) {
        return courseDTO.builder()
            .courseName(course.getCourseName())
            .courseContent(course.getCourseContent())
            .courseLocation(course.getCourseLocation())
            .teacherId(course.getTeacherId()).build();
    }
}
