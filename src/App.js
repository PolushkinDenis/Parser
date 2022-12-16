// import './App.css';
// import Main from './components/Main/Main'
// import { BrowserRouter } from "react-router-dom";
// import Websocket from './components/Websocket'
// import AppRouter from './components/AppRouter';

// const App = () => {



//   return (
//     <BrowserRouter>
//       <AppRouter />
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
// import {Spinner} from "react-bootstrap";
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import Auth from './pages/Auth';

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    console.log(user.email)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div>loading</div>
    }

    return (
        <BrowserRouter>
            {/* <Route path='/main' element={<Main />} />
            <Route path='/login' element={<Auth />} /> */}
            <NavBar /> 
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
