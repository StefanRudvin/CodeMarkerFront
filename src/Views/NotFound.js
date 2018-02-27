import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import logo from './../Assets/CodeMarkerLogo.png'
import { Jumbotron } from 'react-bootstrap'
import React from 'react'

class NotFound extends React.Component {

    render () {
        return (
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={300}
                transitionName="SlideIn"
                className="home">
                <Jumbotron>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2 className="App-title">Woops! You're trying to access a page that does not exist.</h2>
                </Jumbotron>
            </ReactCSSTransitionGroup>
        )
    }
}

export default NotFound