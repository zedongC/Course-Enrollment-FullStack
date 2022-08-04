import axios from "../axios/config"

export const CourseService = {
    getAllCourses: function() {
        return axios.get('/api/allCourse');
    },

    getEnrolledCourse: function () {
      return axios.get('/api/student/courses');
    },

    enrolledCourse: function (courseName) {
      return axios.post(`api/student/course/${courseName}`);  // return a promise that's how we get courseName
    },

    dropCourse: function (courseName) {
      return axios.delete(`api/student/course/${courseName}`);
    }





}
