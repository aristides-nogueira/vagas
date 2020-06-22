export default (theme) => ({
  result: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(4),
    '& p': {
      margin: 0,
      paddingTop: theme.spacing(2),
    }
  },
  email: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  password: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  copyIcon: {
    cursor: 'pointer',
    paddingLeft: theme.spacing(1)
  },
  feedback: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  success: {
    borderColor: '#4caf50 !important',
    backgroundColor: '#4caf50 !important',
  }
});
