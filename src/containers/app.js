import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from '../components/date-picker';
import TagPicker from '../components/tag-picker';
import List from '../components/list';
import Details from '../components/details';
import Search from '../components/search';
import * as listActions from '../actions/list';
import * as appActions from '../actions/app';

const App = ({ actions, currentList, list, tags, tag, date, search, selectedListItem, filterType }) => {
    return (
        <div className="app">
            <div className="header">
                <div className="filters column-left">
                    <TagPicker actions={actions} tags={tags} currentTag={tag} />
                    <DatePicker actions={actions} currentDate={date} filterType={filterType} />
                </div>
                <Search actions={actions} list={list} search={search} />
            </div>
            <div className="content">
                <List actions={actions} list={currentList} currentDate={date} selectedListItem={selectedListItem} />
                <Details actions={actions} selectedListItem={selectedListItem} />
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
    const loweredText = text.toLowerCase();
    return list.filter(
        item =>
            (item.title && item.title.toLowerCase().indexOf(loweredText) > -1) ||
            (item.text && item.text.toLowerCase().indexOf(loweredText) > -1)
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
        tag: state.app.tag,
        search: state.app.search,
        filterType: state.app.filterType,
        currentList,
        list: state.list,
        tags: state.tags,
        selectedListItem
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, ...appActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
