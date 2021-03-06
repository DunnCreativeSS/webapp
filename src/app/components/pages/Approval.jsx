import React from 'react';
import {connect} from 'react-redux';

class Approval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm_email: false
        }
    }

    componentWillMount() {
        if (this.props.location.query.confirm_email) {
            this.setState({confirm_email: true});
        }
    }

    render() {
        let body = '';
        if (this.state.confirm_email) {
            body = <div>
                <h4>Thanks for confirming your email!</h4>
                <p>After validating your sign up request with us we'll look it over for approval. As soon as your turn
                    is up and you're approved, you'll be sent a link to finalize your account!</p>
                <p>You'll be among the earliest members of the Smoke community!</p>
            </div>
        } else {
            body = <div>
                {/*<h4>Thanks for confirming your phone number!</h4>*/}
                <h4>Thanks for signing up!</h4>
                <p>You're a few steps away from getting to the top of the list. Check your email and click the email
                    validation link.</p>
                <p>After validating your sign up request with us we'll look it over for approval. As soon as your turn
                    is up and you're approved, you'll be sent a link to finalize your account!</p>
                <p>You'll be among the earliest members of the Smoke community!</p>
            </div>
        }
        return (
            <div className="row">
                <div className="column" style={{maxWidth: '36rem', margin: '2rem auto'}}>
                    <div>
                        {body}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'approval',
    component: connect(
        state => {
            return {}
        },
        dispatch => ({})
    )(Approval)
};
