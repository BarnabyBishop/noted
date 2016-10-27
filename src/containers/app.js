import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import List from '../components/list'
import * as listActions from '../actions'

const App = ({list, actions}) => {
    return (
        <div>
            <List list={list} actions={actions} />
        </div>
    );
};

App.propTypes = {
  list: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
        list: state.list
    }
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(listActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
