import React from 'react';
import Grid from '@material-ui/core/Grid';

const Result = ({
  name,
  result,
  schoolData
}) => {
  if (result === 'success') {
    return (
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
            Por favor, para saber mais sobre:
            <ul>
              <li>a matrícula</li>
              <li>documentação de matrícula</li>
              <li>se há possibilidade de transferência</li>
              <li>ou outras informações sobre a nova unidade escolar</li>
            </ul>
            Entre em contato com eles através do(s) telefone(s):
          </Grid>
          <span><b>{schoolData.phones}</b></span>
        </Grid>
      </React.Fragment>
    );
  }

  if (result === 'enroll') {
    return (
      <React.Fragment>
        <Grid container justify='center' spacing={3}>
          <Grid item xs={12}>
            O(a) aluno(a) irá permanecer na <i>EMEI Aristides Nogueira</i> e sua rematrícula já está garantida! 🎉
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid container justify='center' direction='column' spacing={3}>
        <span>
          Os dados não conferem.
        </span>
        <span>
          Por favor, clique em VOLTAR e verifique se colocou os dados corretamente e tente outra vez. <br /> <br />
        </span>
        <span>
          Caso o problema persista e o aluno está matriculado atualmente na <i>EMEI Aristides Nogueira</i>, entre em contato conosco através do telefone: (11) 5528-1873 de segunda a sexta das 10h às 15h30 para que possamos te ajudar.
        </span>
      </Grid>
    </React.Fragment>
  )
}

export default Result;
