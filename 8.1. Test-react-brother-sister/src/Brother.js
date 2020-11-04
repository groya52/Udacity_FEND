import React from 'react'

export default class Brother extends React.Component {
    render() {
        const {places} = this.props;

        return (
            <div><h2>Brother</h2>
            <ul>
                {places.map((place) => (
                 <li key = {place.id} onClick = {(e) => this.props.test(place.id)}>
                        {'place #' + place.id}
                 </li>))
                }
            </ul>
            </div>
    )}
}
