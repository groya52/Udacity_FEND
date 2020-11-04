import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'

export default class Book extends Component {

    state = {
        shelf: this.props.book.shelf
    }

    componentDidMount() {
        BooksAPI.get(this.props.book.id).then(book => { this.setState({shelf:book.shelf}) })
    }

    updateShelf = (book, shelf) => {
        this.props.handlerShelf(book, shelf)
        this.setState({shelf:shelf})
    }

    render() {
        const book =  this.props.book
            , shelf = this.state.shelf ? this.state.shelf : 'none'
            , image = book.imageLinks ? book.imageLinks.thumbnail : ''

        return(
        <div className = "book">
            <div className = "book-top">
                <div className = "book-cover" style = {{width: 128, height: 193, backgroundImage: `url(${image})`}}>
                </div>
                <div className = "book-shelf-changer">
                    <select onChange = {(e) => this.updateShelf(book, e.target.value)} value = {shelf}>}
                    <option value = "move" disabled>Move to...</option>
                    <option value = "currentlyReading">Currently Reading</option>
                    <option value = "wantToRead">Want to Read</option>
                    <option value = "read">Read</option>
                    <option value = "none">None</option>
                    </select>
                </div>
            </div>
            <div className = "book-title">{book.title}</div>
            <div className = "book-authors">{book.authors}</div>
        </div>
        )
    }
}