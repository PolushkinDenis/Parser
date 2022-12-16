import React, {useContext, useState} from 'react';
// import {Container, Form} from "react-bootstrap";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import {NavLink, useLocation, useHistory} from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/const";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchUser } from '../store/userReducer';


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    // const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                console.log(data)
               
                dispatch(fetchUser(data))
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate('/main')
            // history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    const theme = createTheme();


    return (

        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email "
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={click}
              >
                Войти
              </Button>
              <Grid container>
               
                <Grid item>
                <NavLink className="navLink" style={{color:'blue'}} to='/registration'>Еще не зарегистрированы?</NavLink>
                  {/* <Link href="/registration" variant="body2"> */}
                    {/* {"Еще не зарегистрированы?"} */}
                  {/* </Link> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>

        // <div
        //     className="d-flex justify-content-center align-items-center"
        // >
        //     <div style={{width: 600}} className="p-5">
        //         <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
        //         <div className="d-flex flex-column">
        //             <input
        //                 className="mt-3"
        //                 placeholder="Введите ваш email..."
        //                 value={email}
        //                 onChange={e => setEmail(e.target.value)}
        //             />
        //             <input
        //                 className="mt-3"
        //                 placeholder="Введите ваш пароль..."
        //                 value={password}
        //                 onChange={e => setPassword(e.target.value)}
        //                 type="password"
        //             />
        //             <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
        //                 {isLogin ?
        //                     <div>
        //                         Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
        //                     </div>
        //                     :
        //                     <div>
        //                         Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
        //                     </div>
        //                 }
        //                 <button
        //                     variant={"outline-success"}
        //                     onClick={click}
        //                 >
        //                     {isLogin ? 'Войти' : 'Регистрация'}
        //                 </button>
        //             </div>

        //         </div>
        //     </div>
        // </div>
    );
});

export default Auth;
