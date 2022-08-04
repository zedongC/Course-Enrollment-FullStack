package com.mycompany.myapp.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_course")
@Data
@NoArgsConstructor
public class UserCourse {
    // create an entry of data
    // id is system-generated, so we do not need it
    public UserCourse(User user, Course course) {
        this.user = user;
        this.course = course;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne
    private User user;

    @JoinColumn(name = "course_id", referencedColumnName = "id")
    @ManyToOne
    private Course course;

}
