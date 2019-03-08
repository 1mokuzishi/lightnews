import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import App from './../App';
import Home from './../pages/Home';
import Channel from './../pages/Channel';
import Article from './../pages/Article';
import Search from './../pages/Search';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Root = () => (
    <div>
        <Switch>
            <Route
                path="/"
                render={props => (
                    <App>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/home" component={Home} />
                            <Route path="/search" component={Search} />
                            <Route path="/channel/:channelId" component={Channel} />
                            <Route path="/article/:articleId" component={Article} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            {/*路由不正确时，默认跳回home页面*/}
                            <Route render={() => <Redirect to="/" />} />
                        </Switch>
                    </App>
                )}
            />
        </Switch>
    </div>
);

export default Root;