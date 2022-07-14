
const addButton = document.querySelector('.open-form')
const submitButton = document.querySelector('.submit-form')
const statusButton = document.querySelector('.status-button')
const deleteCard = document.querySelector('.delete-card')
const form = document.querySelector('form')
const mainDisplay = document.querySelector('.cards')


class Library {
    books = []

    constructor(inBooks){
        if(inBooks === undefined){
            this.books = []
        }else{
            this.books = inBooks    
        }
         
    }

    addBook(inBook){
        this.books.push(inBook)
    }

    deleteBook(bookName){
        this.books = this.books.filter((book) => book.getName() !== bookName)
    }

    getBooks(){
        return this.books
    }
}

class Book{
    constructor(name, author, pages, status){
        this.name = name
        this.author = author
        this.pages = pages
        this.status = status
    }

    getName(){
        return this.name
    }

    getAuthor(){
        return this.author
    }

    getPages(){
        return this.pages
    }

    getStatus(){
        return this.status
    }

    setStatus(){
        this.status = !this.status
    } 
}


