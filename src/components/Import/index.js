import React from 'react';
import Grid from '@material-ui/core/Grid';
import firebase from '../../config/firebase';
const db = firebase.firestore();

const Import = () => {
  const students = [
]
  students.forEach((student) => {
    student.searchName = student.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '')
    db.collection('students2021').add(student);
  });

  return <React.Fragment>
    <Grid container justify='center' spacing={3}>
      Só ver
    </Grid>
  </React.Fragment>
}

export default Import;
