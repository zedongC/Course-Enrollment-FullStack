package com.mycompany.myapp.service.dto;

import lombok.Builder;
import lombok.Data;

@Data  //for getter and setter
@Builder  // for constructor, a design pattern
public class courseDTO {
    private String courseName;
    private String courseContent;
    private String courseLocation;
    private  Long teacherId;
}
