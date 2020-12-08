import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import style from './style';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../../config/firebase';
import Grid from '@material-ui/core/Grid';

const db = firebase.firestore();

const Feedback = ({
  success,
  inputedName,
  inputedDate,
  studentEmail,
  classes
}) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <div className={classes.main}>
        {
          success
          ? <SuccessFeedback />
          : <FailedFeedback
            classes={classes}
            name={inputedName}
            date={inputedDate}
            studentEmail={studentEmail}
          />
        }
      </div>
    </Grid>
  );
}

const SuccessFeedback = () => {
  return <div style={{ paddingTop: 8 }}>
    Ficamos felizes que tenha coseguido! Boas aulas!
    <div>
      <span style={{ color: 'white', fontSize: 6 }}>#gratidão</span>
    </div>
  </div>
};

const FailedFeedback = ({ classes, name, date, studentEmail }) => {
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [ complete, setComplete ] = useState(false);

  return <div>
    <p>
      Caso tenha logado, mas não apareceu a turma do aluno, certifique-se que <br />
      fez o acesso com a conta correta  <br />
      (não irá aparecer caso esteja com seu email pessoal,  <br />
      o acesso deve ser feito com o email e senha  acima)
    </p>
    <p>
      Se mesmo assim, não deu certo, por favor, nos deixe seu  <br />
      email e telefone para contato.  <br />
      A equipe de suporte da EMEI Aristides entrará em contato com você!
    </p>
    <div className={classes.feedbackForm}>
      <div className={classes.formControl}>
        <TextField
          label="Email para contato"
          variant="outlined"
          value={contactEmail}
          className={classes.formField}
          onChange={(e) => {
            setContactEmail(e.target.value)
          }}
          />
      </div>
      <div className={classes.formControl}>
        <TextField
          label="Telefone para contato"
          variant="outlined"
          value={contactPhone}
          className={classes.formField}
          onChange={(e) => {
            setContactPhone(e.target.value)
          }}
        />
      </div>
      <div className={classes.feedbackForm}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            db.collection("contacts").add({
              name,
              date,
              studentEmail,
              contactEmail,
              contactPhone,
              success: false,
              timestamp: new Date()
            });
            setComplete(true);
          }}
        >
          Solicitar contato
        </Button>
        {
          complete && <span style={{ paddingTop: 8 }}>
            Em breve entraremos em contato!
          </span>
        }
      </div>
    </div>
  </div>
};

export default withStyles(style)(Feedback);
