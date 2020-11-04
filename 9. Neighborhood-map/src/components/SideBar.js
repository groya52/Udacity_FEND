import React from 'react'
import './App.css'

export default class App extends React.Component {
    render() {
        const {places, showSidebar} = this.props;
        const className = showSidebar ? 'sidebar' : 'sidebar hide'

        return(
        <aside className = {className}>
            <input 
                id = 'input'
                type = 'text' 
                placeholder = 'search ' 
                aria-label = 'search'
                tabIndex = '0'
                onChange = {(e) => this.props.filter(e.target.value)}
            />
            <ul aria-label = 'list of places'>
                {places.map((place) => (
                    <li 
                        key = {place.id}
                        aria-label = {place.name}
                        tabIndex = '0'
                        onClick = {(e) => this.props.getInfo(place.id)}
                    >
                        {place.name}
                    </li>))
                }
            </ul>
        </aside>
    )}
}