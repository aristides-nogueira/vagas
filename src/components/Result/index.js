import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import style from './style';
import { format } from 'date-fns';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Feedback from '../Feedback';
import firebase from '../../config/firebase';

const db = firebase.firestore();

const Result = ({
  name,
  classes,
  birthDate
}) => {
  const [ success, setSuccess ] = useState(null);
  const [ copy, setCopy ] = useState(false);

  const lowerCaseName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const splitName = lowerCaseName.split(' ');
  const relevantNames = splitName.filter((n) => ![ 'de', 'da', 'do', 'das', 'dos', 'e', '' ].includes(n));
  const formattedName = relevantNames.map((n, i) => {
    if (i === 0 || i === relevantNames.length - 1) {
      return n;
    }

    return n[0];
  });
  const namePart = formattedName.join('');
  const datePart = format(new Date(birthDate), 'ddMMyyyy');
  const studentEmail = `${namePart}.${datePart}@edu.sme.prefeitura.sp.gov.br`;

  return (
    <div className={classes.result}>
      <p>Seu email é</p>
      <p className={classes.email}>
        {studentEmail}
        <CopyToClipboard text={studentEmail} onCopy={() => setCopy(true)}>
          <FileCopyIcon className={classes.copyIcon} />
        </CopyToClipboard>
      </p>
      <p>
        e a senha inicial é
        <span className={classes.password}>12345678 </span>
        e precisa ser alterada no primeiro acesso.
      </p>
      <p>
        <a href='https://classroom.google.com/' target='_blank'>Clique aqui para acessar o Google Classroom</a>, por favor, <br />
        não esqueça de responder logo abaixo se você conseguiu ou não<br />
        acessar sem problemas, para que possamos ajudar quem estiver<br />
        com dificuldades!
      </p>
      <div className={classes.feedback} style={{
        display: (success != null ? 'none' : 'inherit')
      }}>
        <Button
          variant='contained'
          className={classes.success}
          onClick={() => {
            setSuccess(true);
            db.collection("contacts").add({
              name,
              date: datePart,
              studentEmail,
              success: true,
              timestamp: new Date()
            });
          }}
          startIcon={<ThumbUpIcon />}
          >
          Consegui!
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => {
            setSuccess(false);
          }}
          startIcon={<ThumbDownIcon />}
        >
          Não consegui!
        </Button>
      </div>
      {
        success != null &&
        <Feedback
          success={success}
          inputedName={name}
          inputedDate={datePart}
          studentEmail={studentEmail}
        />
      }
    </div>
  );
}

export default withStyles(style)(Result);
