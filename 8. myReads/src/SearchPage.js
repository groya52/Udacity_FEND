import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BookInfo from './BooksInfo'

export default class BookSearch extends Component {

    state = {
        query: ''
        , books: []
    }

    update = (query) => {
        this.setState({query})

        if (query > '') {
            BooksAPI.search(query).then(books => this.setState({books:books}))
        } else {
            this.setState({books:[]})
        }
    }

    render() {
        const query = this.state.query 
            , books = this.state.books
            , handlerShelf = this.props.handlerShelf

        return (
			<div className = "search-books">
				<div className = "search-books-bar">
					<Link to = "/" className = "close-search">Close</Link>
					<div className = "search-books-input-wrapper">
						<input onChange = {(e) => this.update(e.target.value)} value = {query} type = "text" placeholder = "Search by title or author"/>
					</div>
				</div>
				<div className = "search-books-results">
					<ol className = "books-grid">
						{books.map(book => (
						<li key = {book.id}>
                            <BookInfo book = {book} handlerShelf = {handlerShelf}/>
                        </li>
						))}
                    </ol>
                </div>
            </div>
        ) 
    }
}