import React, { useContext } from 'react';
import { Context } from "../../index";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, COMPARISON_ROUTE } from "../../utils/const";
import { observer } from "mobx-react-lite";
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import './NavBar.css'

const NavBar = observer(() => {
    const { user } = useContext(Context)
    // const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink className="navLink" style={{ color: 'white' }} to={MAIN_ROUTE}>На главную</NavLink>
                        <NavLink className="navLink" style={{ color: 'white', marginLeft: "20px"  }} to={COMPARISON_ROUTE}>Сравнение цен</NavLink>

                    </Typography>

                    {user.isAuth ?
                        <div>
                            <NavLink className="navLink" style={{ color: 'white' }} to='/user'>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            </NavLink>
                            <Button color="inherit" onClick={() => logOut()}>Выйти</Button>

                        </div>
                        :
                        <NavLink className="navLink" style={{ color: 'white' }} to='/login'>Авторизация</NavLink>

                        // <Button color="inherit" onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
        // <div className='navBar'>
        //         {/* <NavLink style={{color:'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink> */}
        //         {user.isAuth ?
        //             <div>
        //                 <Button
        //                     onClick={() => history.push(ADMIN_ROUTE)}
        //                 >
        //                     Админ панель
        //                 </Button>
        //                 <Button
        //                     onClick={() => logOut()}
        //                 >
        //                     Выйти
        //                 </Button>
        //             </div>
        //             :
        //             <div>
        //                 <Button onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
        //             </div>
        //         }
        // </div>

    );
});

export default NavBar;
