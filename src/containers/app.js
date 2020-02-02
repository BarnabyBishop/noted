import ListLayout from '../components/list-layout';
import LoginForm from '../components/login-form';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as listActions from '../actions/list';
import * as appActions from '../actions/app';

const App = props => {
    return <div className="app">{props.authorized ? <ListLayout {...props} /> : <LoginForm {...props} />}</div>;
};

const mapStateToProps = state => {
    const selectedListItemId = state.app.selectedListItemId;
    const selectedListItem = selectedListItemId && state.list.find(item => item.id === selectedListItemId);

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
        modalActive: state.app.modalActive
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, ...appActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
