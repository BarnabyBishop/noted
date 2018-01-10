import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from '../components/date-picker';
import List from '../components/list';
import Details from '../components/details';
import * as listActions from '../actions/list';
import * as appActions from '../actions/app';

const App = ({ list, currentDate, selectedListItem, actions }) => {
    return (
        <div>
            <DatePicker currentDate={currentDate} actions={actions} />
            <div className="content">
                <List list={list} currentDate={currentDate} actions={actions} />
                <Details selectedListItem={selectedListItem} actions={actions} />
            </div>
        </div>
    );
};

App.propTypes = {
    list: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    const currentDate = state.app.currentDate;
    const list = state.list.filter(
        item =>
            moment(currentDate).isSame(item.created, 'day') ||
            moment(currentDate).isBetween(item.created, item.completed, 'day', '[]')
    );
    const selectedListItemId = state.app.selectedListItemId;
    const selectedListItem = selectedListItemId && list.find(item => item.id === selectedListItemId);
    return {
        currentDate,
        list,
        selectedListItem
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, ...appActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
