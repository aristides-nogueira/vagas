import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export default function Form({
  name,
  setName,
  birthDate,
  setBirthDate,
}) {
  const [ confirm, setConfirm ] = useState(false);
  const [ validated, setValidated ] = useState(false);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome Completo do aluno"
            variant="outlined"
            value={name}
            error={validated && name === ''}
            onChange={(e) => {
              const value = e.target.value.replace(/[^A-zÀ-ú`´~^\s]/gi, '')
              if (value.match(/[a-zA-Zâãàáêéèíìôóòõúù`´~^]/g) || value === '') {
                setName(value)
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
            <DatePicker
              fullWidth
              autoOk
              disableFuture
              variant="inline"
              inputVariant="outlined"
              openTo="year"
              label="Data de Nascimento"
              format="dd 'de' MMMM/yyyy"
              value={birthDate}
              onChange={setBirthDate}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
