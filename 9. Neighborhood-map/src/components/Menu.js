import React from 'react'
export default class Menu extends React.Component {
    render() {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox = '0 0 48 48'
            width = '60px'
            height = '60px'
            fill = 'white'
            role = 'navigation'
            aria-label = 'toggle show/hide sidebar'
            tabIndex = '0'
            className = 'icon'
            onClick = {() => this.props.toggleSidebar()
            }>
            <path d="M 6 22 L 42 22 L 42 26 L 6 26 Z "/>
            <path d="M 6 10 L 42 10 L 42 14 L 6 14 Z "/>
            <path d="M 6 34 L 42 34 L 42 38 L 6 38 Z "/>
            </svg>
    )}
}