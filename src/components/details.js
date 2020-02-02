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

        return (
            <DetailsContainer modalActive={this.props.modalActive}>
                <InfoPanel>
                    <InfoUpdatedAt>{`${title} - ${updatedAt && `Saved ${moment().to(updatedAt)}`}`}</InfoUpdatedAt>
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
                    <CloseIcon className="fas fa-times" onClick={() => this.props.actions.setModalDeactive()} />
                </InfoPanel>
                <div className="RichEditor-root">
                    <div className="RichEditor-editor">
                        <RichEditor selectedListItem={this.props.selectedListItem} actions={this.props.actions} />
                    </div>
                </div>
            </DetailsContainer>
        );
    }
}

const DetailsContainer = styled.div`
    ${props =>
        props.modalActive &&
        `
            position: absolute;
            background-color: #ffffff;
            padding: 5px;
            width: 90%;
            left: 5%;
            height: 90%;
            top: 5%;
            border-radius: 10px;
            box-shadow: #aaa 0px 2px 7px 0px;
        `}
`;

const InfoPanel = styled.div`
    border-top: solid 1px #e5e5e5;
    @media (max-width: 420px) {
        border: none;
    }
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

    @media (max-width: 420px) {
        display: none;
    }
`;

const CloseIcon = styled.i`
    display: none;
    width: 50px;
    font-size: 17pt;
    text-align: center;
    color: #aaa;
    @media (max-width: 420px) {
        display: block;
    }
`;

const InfoUpdatedAt = styled.div`
    font-size: 8pt;
    color: #999;
`;
