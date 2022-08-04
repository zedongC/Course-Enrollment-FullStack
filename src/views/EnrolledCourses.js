import React, {useEffect} from "react";
import TableCourse from "../components/TableCourse";
import {CourseService} from "../service/CourseService";


// class EnrolledCourses extends React.Component {
//     state = {
//         courses: []
//     }
//
//   componentDidMount() {
//     CourseService.getEnrolledCourse().then(response => {
//       this.setState({
//         courses: response.data
//       })
//     }).catch(error => {
//       console.error(error);
//     })
//   }
//
//   dropCourse(courseName) {
//     CourseService.dropCourse(courseName).then(response => {
//       alert(`Congrats! ${courseName} drop successfully!`);
//       window.location.reload();
//     }).catch(error => {
//       alert(`Sorry, ${courseName} fail to drop due to ${error}`);
//     });
//   }
//     render() {
//         return (
//             <div>
//                 <h1>This is Enrolled Courses</h1>
//               <TableCourse courses={this.state.courses}
//                            buttonText={"Drop"}
//                            buttonColor={"error"}
//                            handleButtonOnClick={this.dropCourse}/>
//             </div>
//         )
//     }
// }
//
// export default EnrolledCourses;


//
export default function EnrolledCourse() {
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    CourseService.getEnrolledCourse()
      .then(response => {
      setCourses(response.data)
    }).catch(error => {
      console.error(error);
    });
  }, [])

  function dropCourse(courseName) {
    CourseService.dropCourse(courseName)
      .then(response => {
      alert(`Congrats! ${courseName} drop successfully!`);
      window.location.reload();  // after we update the data, act like a rerender, but it's more specific
    }).catch(error => {
      alert(`Sorry, ${courseName} fail to drop due to ${error}`);
    });
  }


      return (
            <div>
              <TableCourse courses={courses}
                           buttonText={"Drop"}
                           buttonColor={"error"}
                           handleButtonOnClick={dropCourse}/>
            </div>
        )

}
