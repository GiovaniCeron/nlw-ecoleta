import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home/home';
import CreatePoint from './pages/CreatePoint/createPoint';
import ConfirmPoint from './pages/ConfirmPoint/confirmPoint';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
            <Route component={ConfirmPoint} path="/confirm-point" />
        </BrowserRouter>
    )
}

export default Routes;