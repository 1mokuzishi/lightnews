import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './../pages/Loading';


let Home = Loadable({
    loader: () => import('./../pages/Home'),
    loading: Loading
})
let Channel = Loadable({
    loader: () => import('./../pages/Channel'),
    loading: Loading
})

let Article = Loadable({
    loader: () => import('./../pages/Article'),
    loading: Loading
})

let Search = Loadable({
    loader: () => import('./../pages/Search'),
    loading: Loading
})
let Login = Loadable({
    loader: () => import('../pages/Login'),
    loading: Loading
})
let Register = Loadable({
    loader: () => import('./../pages/Register'),
    loading: Loading
})
let User = Loadable({
    loader: () => import('./../pages/User'),
    loading: Loading
})


export default  class RootRouter extends React.Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/home" component={Home} />
                    <Route path="/search" component={Search} />
                    <Route path="/channel/:channelId" component={Channel} />
                    <Route path="/article/:articleId" component={Article} />
                    <Route path="/user" component={User} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    {/*路由不正确时，默认跳回home页面*/}
                    <Route render={() => <Redirect to="/" />} />
                </Switch>
            </div >
        )
    }
}
