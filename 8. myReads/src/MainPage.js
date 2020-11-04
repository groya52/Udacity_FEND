import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import BooksShelf from './BooksShelf';

export default class ListBooks extends Component {

    render() {
        const books = this.props.books
            , handlerShelf = this.props.handlerShelf

        return(
		<div className = "list-books">
			<div className = "list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className = "list-books-content">
				<BooksShelf handlerShelf = {handlerShelf} books = { books.filter((book) => book.shelf === "currentlyReading") } shelf = "Currently Reading" />
				<BooksShelf handlerShelf = {handlerShelf} books = { books.filter((book) => book.shelf === "wantToRead") } shelf = "Want to read" />
				<BooksShelf handlerShelf = {handlerShelf} books = { books.filter((book) => book.shelf === "read") } shelf = "Read" />
            </div>
            <div className = "open-search">
                <Link to = "/search">Add a book</Link>
            </div>
        </div>
        )
    }
    }