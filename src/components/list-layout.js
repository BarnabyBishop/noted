import React from 'react';
import DatePicker from './date-picker';
import TagPicker from './tag-picker';
import List from './list';
import Details from './details';
import Search from './search';

export default ({ actions, list, tags, tag, date, search, selectedListItem, loading, filterType }) => {
    return (<div>
        <div className="header">
            <div className="filters column-left">
                <TagPicker actions={actions} tags={tags} currentTag={tag} />
                <DatePicker actions={actions} filterType={filterType} currentDate={date} />
            </div>
            <Search actions={actions} list={list} search={search} />
        </div>
        <div className="content">
            <List actions={actions} list={list} filterType={filterType} currentDate={date} currentTag={tag} selectedListItem={selectedListItem} loading={loading} />
            <Details actions={actions} selectedListItem={selectedListItem} />
        </div>
    </div>);
};