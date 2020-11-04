import React from 'react';
import Brother from './Brother.js';
import Sister from './Sister.js';

export default class App extends React.Component {

    state = {
        places: [{id: '1'}, {id: '2'}, {id: '3'}]
        , placeId: '0'
    }


    test = (placeId) => {
    	this.setState({placeId:placeId});
    }

    render() {
        const {places, placeId} = this.state;

        return (
            <div className = 'app'>
                <h1>App</h1>
                <Brother places = {places} test = {this.test}/>
                {placeId > '0' && <Sister placeId = {placeId} test = {this.test}/>}
            </div>
          )
    }
}