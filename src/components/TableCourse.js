import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function TableCourse(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell align="right">Course name</TableCell>
            <TableCell align="right">CourseContent</TableCell>
            <TableCell align="right">Course location</TableCell>
            <TableCell align="right">Teacher Id</TableCell>
            <TableCell align="right">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.courses.map((row, index) => (
            <TableRow
              key={row.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{row.courseName}</TableCell>
              <TableCell align="right">{row.courseContent}</TableCell>
              <TableCell align="right">{row.courseLocation}</TableCell>
              <TableCell align="right">{row.teacherId}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color={props.buttonColor}
                        onClick={() => props.handleButtonOnClick(row.courseName)}>
                {props.buttonText}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
// when we are in allCourse view, we parse the enrolledCourse method in props, so when
// we click, we enroll courses, when we are in enrolledCourse view, we parse dropCourse
// method, so when we click, we delete.
