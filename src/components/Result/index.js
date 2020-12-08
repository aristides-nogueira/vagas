import React from 'react';
import Grid from '@material-ui/core/Grid';

const Result = ({
  name,
  result,
  schoolData
}) => {
  return result === 'success'
  ? (
    <React.Fragment>
      <Grid container justify='center' spacing={3}>
        <Grid item xs={12}>
          O(a) aluno(a) foi compatibilizado para a unidade:
        </Grid>
        <Grid item xs={12}>
          <h3>
            <i>{schoolData.name}</i>
          </h3>
        </Grid>
        <Grid item xs={12}>
          Por favor, entre em contato com a nova escola para saber mais sobre a matrícula pelos telefone(s) abaixo:
        </Grid>
        <span>{schoolData.phones}</span>
      </Grid>
    </React.Fragment>
  )
  : (
    <React.Fragment>
      <Grid container justify='center' spacing={3}>
        <span>
          Os dados não conferem.
        </span>
        <span>
          Por favor, verifique se colocou os dados corretamente e tente outra vez. <br />
          Caso o problema persista e o aluno está matriculado atualmente na EMEI Aristides Nogueira, entre em contato conosco através do telefone: <b>(11) 5528-1873</b> de segunda a sexta das 10h às 15h30 para que possamos te ajudar.
        </span>
      </Grid>
    </React.Fragment>
  )
}

export default Result;
