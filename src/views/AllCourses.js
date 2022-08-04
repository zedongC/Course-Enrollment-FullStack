import React from "react";
import { CourseService } from "../service/CourseService";
import TableCourse from "../components/TableCourse";

class AllCourses extends React.Component {

  // whenever the state is changed, rerender
    state = {
        courses: []
    }

    componentDidMount() {
        CourseService.getAllCourses().then(response => {
            this.setState({
                courses: response.data
            })
        }).catch(error => {
                console.error(error);
        })
    }
    enrollCourse(courseName) {
      CourseService.enrolledCourse(courseName).then(response => {
        alert(`Congrats! ${courseName} enrolled successfully!`);
      }).catch(error => {
        alert(`Sorry, ${courseName} enrollment failed due to ${error}`);
      });
    }

    render() {
        return (
            <div>
                <TableCourse courses={this.state.courses}
                             buttonText={"Enroll"}
                             buttonColor={"success"}
                             handleButtonOnClick={this.enrollCourse}/>
            </div>
        )
    }
}

export default AllCourses;
