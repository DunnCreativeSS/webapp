import React from 'react';
import LoadingIndicator from '../elements/LoadingIndicator';
import SvgImage from '../elements/SvgImage';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

class PostWrapper extends React.Component {

    constructor() {
        super();

        this.state = {
            loading: true
        }
    }

    componentWillMount() {
        const route_params = this.props.routeParams;
        const post = route_params.username + '/' + route_params.slug;
        const dis = this.props.content.get(post);
        if (!dis) {
            this.props.getContent({author: route_params.username, permlink: route_params.slug})
                .then(content => {
                    if (content) {
                        browserHistory.replace(`/${content.category}/@${post}`)
                    }
                }).catch(() => {
                this.setState({loading: false});
            });
        } else if (dis.get("id") === "0.0.0") { // non-existing post
            this.setState({loading: false});
        } else {
            if (browserHistory) browserHistory.replace(`/${dis.get('category')}/@${post}`)
        }
    }

    shouldComponentUpdate(np, ns) {
        return (
            ns.loading !== this.state.loading
        )
    }

    render() {
        return (
            <div>
                {this.state.loading ?
                    <center><LoadingIndicator type="circle"/></center> :
                    <div className="NotFound float-center">
                        <a href="/"><SvgImage name="404" width="640px" height="480px"/></a>
                    </div>}
            </div>
        );
    }
}

const StoreWrapped = connect(
    state => {
        return {
            content: state.global.get('content')
        };
    },
    dispatch => ({
        getContent: (payload) => (new Promise((resolve, reject) => {
            dispatch({type: 'GET_CONTENT', payload: {...payload, resolve, reject}})
        }))
    })
)(PostWrapper);

module.exports = {
    path: '/@:username/:slug',
    component: StoreWrapped
};
