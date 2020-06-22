import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import style from './style';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Result from '../Result';
import ReplayIcon from '@material-ui/icons/Replay';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const Form = ({
  classes
}) => {
  const [ name, setName ] = useState('');
  const [ birthDate, setBirthDate ] = useState(new Date('2015-01-02'));
  const [ confirm, setConfirm ] = useState(false);
  const [ validated, setValidated ] = useState(false);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <span className={classes.initialTip}>
        Saiba como acessar a sua sala de aula via Google classroom!
      </span>
      <div className={classes.form}>
        <Box boxShadow={3} className={classes.box}>
          {
            !confirm ?
            <>
              <span>Descubra seu acesso:</span>
              <div className={classes.formControl}>
                <TextField
                  label="Nome Completo do aluno"
                  variant="outlined"
                  value={name}
                  error={validated && name === ''}
                  className={classes.formField}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-zÀ-ú`´~^\s]/gi, '')
                    if (value.match(/[a-zA-Zâãàáêéèíìôóòõúù`´~^]/g) || value === '') {
                      setName(value)
                    }
                  }}
                />
              </div>
              <div className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                  <DatePicker
                    autoOk
                    disableFuture
                    variant="inline"
                    inputVariant="outlined"
                    openTo="year"
                    label="Data de Nascimento"
                    format="dd 'de' MMMM/yyyy"
                    className={classes.formField}
                    value={birthDate}
                    onChange={setBirthDate}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div>
                <Button
                  variant='contained'
                  color="primary"
                  onClick={() => {
                    setValidated(true);
                    if (name) {
                      setConfirm(true);
                    }
                  }}
                >
                  Pegar Acesso
                </Button>
              </div>
              <div className={classes.errorMessage}>
                {
                  validated && name === '' && <span>
                    Por favor, todos os campos devem ser preenchidos
                  </span>
                }
              </div>
            </>
            : <Button
                variant='contained'
                color="primary"
                startIcon={<ReplayIcon />}
                onClick={() => {
                  setConfirm(false);
                  setValidated(false);
                }}
              >
                Tentar Outra vez
              </Button>
          }

        </Box>
      </div>
      {
        confirm && <Result name={name} birthDate={birthDate} />
      }
    </Grid>
  );
}

export default withStyles(style)(Form);
