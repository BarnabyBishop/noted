import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment';
import List from '../components/list'
import DatePicker from '../components/date-picker'
import * as listActions from '../actions/list';
import * as dateActions from '../actions/date';

const App = ({list, currentDate, actions}) => {
    return (
        <div>
            <DatePicker currentDate={currentDate} actions={actions} />
            <List list={list} actions={actions} />
        </div>
    );
};

App.propTypes = {
  list: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    const currentDate = state.date.currentDate;
    const list = state.list.filter(item => moment(currentDate).isSame(item.created, 'day') || moment(currentDate).isBetween(item.created, item.completed, 'day', '[]'));
    return {
        currentDate,
        list
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...listActions, ...dateActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
