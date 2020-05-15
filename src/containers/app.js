import LoginForm from '../components/login-form';
import Home from '../components/home';
import Today from '../components/today';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from '../actions/list';
import * as appActions from '../actions/app';

const App = (props) => {
    return (
        <Router>
            <div className="app">
                {props.authorized ? (
                    <Switch>
                        <Route path="/today">
                            <Today {...props} />
                        </Route>
                        <Route path="/">
                            <Home {...props} />
                        </Route>
                    </Switch>
                ) : (
                    <LoginForm {...props} />
                )}
            </div>
        </Router>
    );
};

const mapStateToProps = (state) => {
    const selectedListItemId = state.app.selectedListItemId;
    const selectedListItem = selectedListItemId && state.list.find((item) => item.id === selectedListItemId);

    return {
        date: state.app.date,
        tag: state.app.tag,
        search: state.app.search,
        filterType: state.app.filterType,
        list: state.list,
        tags: state.tags,
        selectedListItem,
        loading: state.app.loading,
        authorized: !!state.app.authToken,
        loginStatus: state.app.loginStatus,
        modalActive: state.app.modalActive,
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ ...listActions, ...appActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
