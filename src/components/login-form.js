import React from 'react';

import styled from 'styled-components';

export default class LoginForm extends React.Component {
    state = {
        email: null,
        password: null
    };

    updateField(field, e) {
        this.setState({ [field]: e.target.value });
    }

    login() {
        const { email, password } = this.state;
        this.props.actions.login(email, password);
    }

    render() {
        return (
            <FormContainer>
                <Form>
                    <Input
                        type="text"
                        placeholder="Email"
                        onInput={this.updateField.bind(this, 'email')}
                        value={this.state.email}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        onInput={this.updateField.bind(this, 'password')}
                        value={this.state.password}
                    />
                    <Submit type="submit" onClick={this.login.bind(this)}>
                        Login
                    </Submit>
                </Form>
            </FormContainer>
        );
    }
}

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
`;

const Form = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
`;

const Input = styled.input`
    display: block;
    width: 250px;
    padding: 10px;
    border-radius: 5px;
    border: solid 1px #ddd;
    font-size: 17px;
    margin-bottom: 10px;
`;

const Submit = styled.button`
    padding: 10px;
    font-size: 13px;
    font-weight: bold;
    background-color: cornflowerblue;
    color: #ffffff;
    border-radius: 5px;
    width: 100px;
`;
