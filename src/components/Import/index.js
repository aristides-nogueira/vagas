import React from 'react';
import Grid from '@material-ui/core/Grid';
import firebase from '../../config/firebase';
const db = firebase.firestore();

const Import = () => {
  const students = [
    {
        "name": "JOSÉ PEREIRA DA SILVA",
        "birthDate": "10/10/2000",
        "schoolName": "EMEF JOSE PEGORARO, PADRE",
        "phones": "5528-1533"
    },
    {
        "name": "SATORU IWATA",
        "birthDate": "1/2/1960",
        "schoolName": "E. E. IRMÃ CHARLITA",
        "phones": "5528-1111 / 5528-1220"
    },
    {
        "name": "SAKAMOTO-SAN",
        "birthDate": "20/4/1980",
        "schoolName": "E. E. ANIZ BRADA",
        "phones": "5528-1780"
    },
    {
        "name": "CONCEIÇÃO DA CONCEIÇÃO",
        "birthDate": "30/10/1990",
        "schoolName": "EMEF JOÃO DE DEUS",
        "phones": "5513-4033"
    }
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
