import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import './details.css';
import RichEditor from './editor';

export default class Details extends Component {
    render() {
        if (!this.props.selectedListItem)
            return (
                <div className="details">
                    <em>Select an item.</em>
                </div>
            );

        const { id, title, height, completed, created, sortOrder, createdAt, updatedAt } = this.props.selectedListItem;

        // const { editorState } = this.state;

        return (
            <div className="details">
                <InfoPanel>
                    <InfoUpdatedAt>{updatedAt && `Saved ${moment().to(updatedAt)}`}</InfoUpdatedAt>
                    <InfoIcon className="fas fa-info">
                        <ItemRaw>
                            <div>id: {id}</div>
                            <div>title: {title}</div>
                            <div>height: {height}</div>
                            <div>sortOrder: {sortOrder}</div>
                            <div>completed: {completed && completed.toString()}</div>
                            <div>created: {created && created.toString()}</div>
                            <div>createdAt: {createdAt && createdAt.toString()}</div>
                            <div>updatedAt: {updatedAt && updatedAt.toString()}</div>
                        </ItemRaw>
                    </InfoIcon>
                </InfoPanel>
                <div className="RichEditor-root">
                    <div className="RichEditor-editor">
                        <RichEditor selectedListItem={this.props.selectedListItem} actions={this.props.actions} />
                    </div>
                </div>
            </div>
        );
    }
}

const InfoPanel = styled.div`
    border-top: solid 1px #e5e5e5;
    width: 100%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
`;

const ItemRaw = styled.div`
    width: 350px;
    display: none;
    position: absolute;
    right: 5px;
    top: 15px;
    padding: 10px;
    background-color: #f1f2f3;
    text-align: left;
    border: solid 1px #ccc;
    border-radius: 5px;
`;

const InfoIcon = styled.i`
    cursor: pointer;
    width: 20px;
    margin-right: 10px;
    text-align: center;
    color: #828282;
    font-size: 10pt;
    position: relative;

    &:hover ${ItemRaw} {
        display: block;
    }
`;

const InfoUpdatedAt = styled.div`
    font-size: 8pt;
    color: #999;
`;
