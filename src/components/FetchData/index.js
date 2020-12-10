import React, { useEffect } from 'react';
import * as dateFns from 'date-fns';
import firebase from '../../config/firebase';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const db = firebase.firestore();

const FetchData = ({
  name,
  birthDate,
  setSchoolData,
  activeStep,
  setActiveStep,
  setResult,
}) => {
  useEffect(() => {
    console.log(dateFns.format(birthDate, 'dd/MM/yyyy'));
    console.log(name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, ''));
    Promise.all([
      setTimeout(() => { setActiveStep(activeStep + 1) }, 3000),
      db.collection('students2021')
        .where('searchName', '==', name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, ''))
        .where('birthDate', '==', dateFns.format(birthDate, 'dd/MM/yyyy'))
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            setResult('error');
          }
          snapshot.forEach(doc => {
            console.log(doc.data())
            if(doc.data().enrolled) {
              setResult('enroll');
            } else {
              setResult('success');
            }
            setSchoolData({
              name: doc.data().schoolName,
              phones: doc.data().phones,
            });
          });
        })
    ])
  }, [])
  return (
    <React.Fragment>
      <Grid container justify='center' spacing={3}>
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <CircularProgress />
        </Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={7}>
          <h3>
            Estamos validando os dados do aluno.
          </h3>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default FetchData;
