import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage';
import SearchPage from './SearchPage';

export default class BooksApp extends Component {

    state = { 
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }
    
    handlerShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            BooksAPI.getAll().then(books => {this.setState({books})
            })
        })
    }

    render() {
        const books = this.state.books

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <MainPage 
                        books = {books} handlerShelf = {this.handlerShelf} 
                    />
                )}/>
                <Route exact path="/search" render={() => (
                    <SearchPage 
                        handlerShelf = {this.handlerShelf}
                    />
                )}/>
            </div>
          )
    }
}