import React from 'react'

export default class Sister extends React.Component {
    render() {
        const {placeId} = this.props;

        return (
            <div>
                <h2>Sister</h2>
                <div>{'place #' + placeId}</div>
            </div>
    )}
}
