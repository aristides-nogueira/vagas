import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Form from './components/Form';
import Result from './components/Result';
import FetchData from './components/FetchData';
import Import from './components/Import';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Identificação', 'Validação dos dados', 'Resultado'];

function getStepContent({
  step,
  name,
  setName,
  birthDate,
  setBirthDate,
  schoolData,
  setSchoolData,
  activeStep,
  setActiveStep,
  result,
  setResult,
}) {
  switch (step) {
    case 0:
      return <Form
        name={name}
        setName={setName}
        birthDate={birthDate}
        setBirthDate={setBirthDate}
      />;
    case 1:
      return <FetchData
        name={name}
        birthDate={birthDate}
        setSchoolData={setSchoolData}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setResult={setResult}
      />;
    case 2:
      return <Result result={result} schoolData={schoolData} />;
    default:
      throw new Error('Unknown step');
  }
}

function getTitle(step) {
  if (step === 0) {
    return <>
      <Typography component="h1" variant="h5" align="center">
        Nesse primeiro momento precisamos identificar qual é o(a) aluno(a).
      </Typography>
      <Typography component="h1" variant="h5" align="center">
        Por favor, nos informe o nome completo e data de nascimento:
      </Typography>
    </>;
  } else if (step === 1) {
    return <>
      <Typography component="h1" variant="h5" align="center">
        Aguarde um instante
      </Typography>
    </>
  }
}
export default function Vagas() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [ name, setName ] = useState('');
  const [ birthDate, setBirthDate ] = useState(new Date('2000-10-11'));
  const [ schoolData, setSchoolData ] = useState({});
  const [ result, setResult ] = useState('');

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(0);
  };
  // return <Import/>

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            EMEI Aristides Nogueira - DIVULGAÇÃO 1º ANO 2021
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {getTitle(activeStep)}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {
                  getStepContent({
                    step: activeStep,
                    name,
                    setName,
                    birthDate,
                    setBirthDate,
                    schoolData,
                    setSchoolData,
                    activeStep,
                    setActiveStep,
                    result,
                    setResult,
                  })
                }
                <div className={classes.buttons}>
                  {activeStep > 1 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Voltar
                    </Button>
                  )}
                  {
                    activeStep !== 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Deu tudo certo' : 'Próximo'}
                      </Button>
                    )
                  }
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
