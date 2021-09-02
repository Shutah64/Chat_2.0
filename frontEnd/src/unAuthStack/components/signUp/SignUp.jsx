import React, {useState, useContext, useEffect} from 'react';
import {Link as Link2} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { context } from '../../../App';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {SIGNUP_MUTATION} from '../../../graphQL'
import {useMutation} from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress';

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
  root: {
    height: '100vh',
    width: '100%'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formWrapper:{
      maxWidth: '714px !important'
  },
  loading:{
    fontSize: '100px',
    width: "100px",
    height: "100px",
    transform: 'scale(5.5)'
  },
  loading_wrapper: {
    position: 'fixed',
    left: "0",
    top: '0',
    height: '100%',
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#474b7b"
  }
}));

export default function SignUp() {
  // Hooks
  const classes = useStyles();
  // States
  const {value, setValue} = useContext(context)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
    // GraphQL Mutation Hook
  const [signUp, {data, loading, error}] = useMutation(SIGNUP_MUTATION)
  // SignUp function
  const handleSubmit = (e)=>{
    e.preventDefault()
    const isAll = userName.length > 4 && password.length > 4 && firstName && lastName;
    const name = firstName+" "+lastName
    if(isAll) signUp({variables: {email: userName, password, name, username: userName}})
    }

    useEffect(()=>{
      // Authorize function
      if(data){
        const checker = ()=>{
        if(data && data.signUp.password != null) {
      const signUp = data.signUp
      const user = {
        id: signUp.id,
        email: signUp.email,
        password: signUp.password,
        name: signUp.name,
      }
      setValue({...value, user, authorized: true})
    }
  }
  checker();
  }
}, [data])
if(loading) return (
  <div className={classes.loading_wrapper}>
  <CircularProgress className={classes.loading} color="secondary"/>
    </div>
)
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square className={classes.formWrapper}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={e=> setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e=> setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="User Name"
                autoComplete="User Name"
                value={userName}
                onChange={(e)=> setUserName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={[password]}
                onChange={(e)=> {setPassword(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e=> handleSubmit(e)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
                <Link2 to='/Login'>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
                </Link2>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Grid>
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
    </Grid>
  );
}