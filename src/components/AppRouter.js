import React, { useContext } from 'react';
// import {Switch, Route, Redirect} from 'react-router-dom'
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Main from './Main/Main';
import Auth from '../pages/Auth';
import { Routes, Route } from 'react-router-dom';
import Registration from '../pages/Registration';
import User from './User/User';
import PriceComparison from './PriceComparison/PriceComparison'
import ChartsUser from './Charts/ChartsUser';

const AppRouter = observer(() => {
    const { user } = useContext(Context)

    console.log(user.email)
    return (
        <>
            <Routes>
            {/* {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route  path={path} element={Component} />
            )}
             {publicRoutes.map(({path, Component}) =>
                <Route  path={path} element={Component} />
            )} */}
                <Route path='/main' element={<Main />} />
                <Route path='/login' element={<Auth />} />
                <Route path='/user' element={<User />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/comparison' element={<PriceComparison />} />
                <Route path='/history' element={<ChartsUser />} />


            </Routes>


        </>
        // <Switch>
        //     {user.isAuth && authRoutes.map(({path, Component}) =>
        //         <Route key={path} path={path} component={Component} exact/>
        //     )}
        //     {publicRoutes.map(({path, Component}) =>
        //         <Route key={path} path={path} component={Component} exact/>
        //     )}
        //     <Redirect to={MAIN_ROUTE}/>
        // </Switch>
    );
});

export default AppRouter;