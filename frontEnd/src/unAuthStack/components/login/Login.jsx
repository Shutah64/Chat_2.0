import React, {useState, useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import {Link as Link2} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { context } from '../../../App';
import {LOGIN_MUTATION} from '../../../graphQL'
import {useMutation} from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
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
  link: {
    display: 'inline-block',
    textDecoration: 'none',
    color: '#fff',
    width: '100%',

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

export default function Login() {
  // Hooks
  const classes = useStyles();
  const {value, setValue} = useContext(context)
    // States
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
    // GraphQL Mutation Hook
  const [login, {data, loading, error}] = useMutation(LOGIN_MUTATION)
  // Login function
  const handleSubmit = (e)=>{
    e.preventDefault()     
    if(userName.length >= 3 && password.length >= 3) login({variables: {email: userName, password}})
  }
  useEffect(()=>{
    // Authorize function
  if(data){
    const checker = ()=>{
      if(data && data.login.password != null) {
        const login = data.login
    const user = {
      id: login.id,
        email: login.email,
        password: login.password,
        name: login.name,
      }
      setValue({...value, user, authorized: true})
      window.localStorage.setItem('getUser', JSON.stringify(user))
    }else{
      setValue({...value, user:{}, authorized: false})
    }
  }
  checker()
}

},[data])
  if(loading) return (
    <div className={classes.loading_wrapper}>
  <CircularProgress className={classes.loading} color="secondary"/>
    </div>
  )
  if(error) return <h1>Something went wrong sorry</h1>
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={9} className={classes.image} />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square className={classes.formWrapper}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="UserName"
              label="UserName Address"
              name="UserName"
              autoComplete="UserName"
              autoFocus
              value={userName}
              onChange={(e)=> {setUserName(e.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e=>handleSubmit(e)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  <Link2 to='/SignUp'>
                  {"Don't have an account? Sign Up"}
                  </Link2>
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}