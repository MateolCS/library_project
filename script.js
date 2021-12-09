let library = []

//Buttons and areas that we will be working with

let addButton = document.querySelector('.open-form')
let submitButton = document.querySelector('.submit-form')
let statusButton = document.querySelector('.status-button')
let deleteCard = document.querySelector('.delete-card')
let form = document.querySelector('form')
let mainDisplay = document.querySelector('cards')

// creating book class

class Book{
    constructor(title, author, pages, status){
        this.title = title
        this.author = author
        this.pages = pages
        this.status = status
        this.createCard = function(){
            let card = document.createElement('div')
            card.classList.add('card')
            let deleteButton = document.createElement('button')
            deleteButton.classList.add('delete-card')
            deleteButton.innerText = '&times;'
            card.appendChild(deleteButton)
            let cardTitle = document.createElement('h3')
            cardTitle.innerText = `${title}`
            cardTitle.classList.add('desc')
            card.appendChild(cardTitle)
            let cardAuthor = document.createElement('h3')
            cardAuthor.innerText = `${author}`
            cardAuthor.classList.add('desc')
            card.appendChild(cardAuthor)
            let cardPages = document.createElement('h3')
            cardPages.innerText = `${pages}`
            cardPages.classList.add('desc')
            card.appendChild(cardPages)
            let cardStatus = document.createElement('button')
            cardStatus.classList.add('status-button')
            if(status == 'Done!'){
                cardStatus.style.backgroundColor = 'green'
            }else{
                cardStatus.style.backgroundColor = 'red'
            }
            mainDisplay.appendChild(card)
    }
}}

//Creating book objects


const getBook = () =>{
    let inputs = document.querySelector('.inputs')
    let statusInfo = document.getElementById('status')
    let status = ''

    let title = inputs.children[0].value
    let author = inputs.children[1].value
    let pages = inputs.children[2].value

    if(statusInfo.checked){
        status = 'Done!'
    }else{
         status = 'In progress'
    }

    return new Book(title, author, pages, status)
}


addButton.addEventListener('click', () =>{
    form.style.visibility = 'visible'
})

submitButton.addEventListener('click', () =>{
    
})


