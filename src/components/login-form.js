import React from 'react';
import styled from 'styled-components';
import Loader from './loader';

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
    };

    updateField(field, e) {
        this.setState({ [field]: e.target.value });
    }

    login(event) {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.actions.login(email, password);
    }

    render() {
        const { loginStatus } = this.props;
        let status;
        switch (loginStatus) {
            case 'LOGGING_IN':
                status = <Loader />;
                break;
            case 'LOGIN_FAILED':
                status = <ErrorMessage>Invalid credentials</ErrorMessage>;
                break;
            default:
                status = null;
                break;
        }

        return (
            <FormContainer>
                <Form onSubmit={this.login.bind(this)}>
                    <Input
                        type="text"
                        placeholder="Email"
                        onInput={this.updateField.bind(this, 'email')}
                        value={this.state.email}
                        autoFocus={true}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        onInput={this.updateField.bind(this, 'password')}
                        value={this.state.password}
                    />
                    <Submit type="submit">Login</Submit>
                    {status}
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

const Form = styled.form`
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

const ErrorMessage = styled.div`
    display: block;
    text-align: center;
    width: 100%;
    margin-top: 20px;
    background-color: #fdbfbf;
    border: solid 1px #ff4c4c;
    padding: 5px;
    border-radius: 5px;
    font-size: 11px;
`;
