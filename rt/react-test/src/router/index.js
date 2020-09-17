import React from 'react'
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
// A Redux binding for React Router v4
// import {ConnectedRouter} from 'connected-react-router';
import loadable, { lazy } from '@loadable/component';
import { hot } from 'react-hot-loader'

import NotFound from "components/NotFound";

const Home = loadable(() => import('views/App/App'));
const About = loadable(() => import('views/About/About'));
const List = loadable(() => import('views/List/List'));
const Test = loadable(() => import('views/Test/Test'));


const routes = function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" render={({ history, location, match }) => (
                    <div className="wrap">
                        {/* <Suspense fallback={<div>Loading...</div>}> */}
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/list" component={List} />
                            <Route exact path="/test" component={Test} />
                            <Route component={NotFound} />
                            <Redirect to="/" />
                        </Switch>
                        {/* </Suspense> */}
                    </div>
                )} />
            </Switch>
        </BrowserRouter>
    )
}

// c3: ConnectedRouter as child of react-redux's provider
export default routes