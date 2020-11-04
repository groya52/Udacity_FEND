import React, { Component } from 'react';
import BooksInfo from './BooksInfo';

export default class BooksShelf extends Component {
    render() {
        const books = this.props.books
            , shelf = this.props.shelf
            , handlerShelf = this.props.handlerShelf

        return (
            <div className = "bookshelf">
                <h2 className = "bookshelf-title">{shelf}</h2>
                <div className = "bookshelf-books">
                    <ol className = "books-grid">
                        {books.map((book) => (<li key = {book.id}> <BooksInfo handlerShelf = {handlerShelf} book = {book}/></li>))}
                    </ol>
                </div>
            </div>
        )
    }
}