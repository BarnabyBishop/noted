import React from 'react';

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
            <div className="form">
                <input
                    type="text"
                    placeholder="Email"
                    onInput={this.updateField.bind(this, 'email')}
                    value={this.state.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onInput={this.updateField.bind(this, 'password')}
                    value={this.state.password}
                />
                <button type="submit" onClick={this.login.bind(this)} />
            </div>
        );
    }
}
