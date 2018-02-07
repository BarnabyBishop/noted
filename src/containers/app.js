import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from '../components/date-picker';
import List from '../components/list';
import Details from '../components/details';
import Search from '../components/search';
import * as listActions from '../actions/list';
import * as appActions from '../actions/app';

const App = ({ currentList, list, date, selectedListItem, actions }) => {
    return (
        <div>
            <div className="header">
                <div className="filters column-left">
                    <DatePicker currentDate={date} actions={actions} />
                </div>
                <Search list={list} />
            </div>
            <div className="content">
                <List list={currentList} currentDate={date} selectedListItem={selectedListItem} actions={actions} />
                <Details selectedListItem={selectedListItem} actions={actions} />
            </div>
        </div>
    );
};

App.propTypes = {
    list: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const filterListByDate = (list, date) => {
    return list.filter(
        item =>
            moment(date).isSame(item.created, 'day') ||
            moment(date).isBetween(item.created, item.completed, 'day', '[]')
    );
}

const filterListByText = (list, text) => {
    return list.filter(
        item =>
            item.title.indexOf(text) > -1 ||
            item.text.indexOf(text) > -1
    );
}

const getFilteredList = (appState, list) => {
    switch (appState.filterType) {
        case 'date':
            return filterListByDate(list, appState.date);
        case 'search':
            return filterListByText(list, appState.search);
        case 'tag':
            return filterListByText(list, appState.tag);
        default:
            return null;
    }
}

const mapStateToProps = state => {
    const currentList = getFilteredList(state.app, state.list);
    const selectedListItemId = state.app.selectedListItemId;
    const selectedListItem = selectedListItemId && currentList.find(item => item.id === selectedListItemId);
    return {
        date: state.app.date,
        currentList,
        list: state.list,
        selectedListItem
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, ...appActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
