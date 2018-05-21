import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DatePicker from '../components/date-picker';
import TagPicker from '../components/tag-picker';
import List from '../components/list';
import Details from '../components/details';
import Search from '../components/search';
import * as listActions from '../actions/list';
import * as appActions from '../actions/app';

const App = ({ actions, list, tags, tag, date, search, selectedListItem, loading, filterType }) => {
    return (
        <div className="app">
            <div className="header">
                <div className="filters column-left">
                    <TagPicker actions={actions} tags={tags} currentTag={tag} />
                    <DatePicker actions={actions} filterType={filterType} currentDate={date} />
                </div>
                <Search actions={actions} list={list} search={search} />
            </div>
            <div className="content">
                <List
                    actions={actions}
                    list={list}
                    filterType={filterType}
                    currentDate={date}
                    currentTag={tag}
                    selectedListItem={selectedListItem}
                    loading={loading}
                />
                <Details actions={actions} selectedListItem={selectedListItem} />
            </div>
        </div>
    );
};

App.propTypes = {
    list: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
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
        loading: state.app.loading
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, ...appActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
