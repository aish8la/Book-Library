// UI Object
const uiElement = {
    elementCreate: function(tagName, attribute = {}, textContent) {
        const element = document.createElement(tagName);
    
        for (const key in attribute) {
            if (attribute.hasOwnProperty(key)) {
                element.setAttribute(key, attribute[key]);
            }
            if (textContent) {
                element.textContent = textContent;
            }
        }
        return element;
    },
    element: {},
    elementSelector: function() {
        this.element.bookShelf = document.querySelector('.book-shelf');
        this.element.addNewButton = document.querySelector('.new-button');
        this.element.formDialogue = document.querySelector('.form-dialogue');
        this.element.newBookForm = document.querySelector('.new-book-form');
        this.element.formCloseButton = document.querySelector('.form-close-button');
    },
};

//UI Controllers 
const uiController = {

    closeDialogue: function() {
        this.element.newBookForm.reset();
        this.element.formDialogue.close();
    },

    formSubmit: function(e) {
        e.preventDefault();
        let isFilled = true;
        const inputs = this.element.newBookForm.querySelectorAll('input');
        let newBookData = {};
        let focusInput;
        for(input of inputs) {
            if (input.type === 'checkbox') {
                newBookData[input.name] = input.checked;
            } else if (input.value) {
                newBookData[input.name] = input.value;
            } else {
                isFilled = false;
                newBookData = {};
                focusInput = input;
                break;
            };    
        };
        if (isFilled) {
            this.closeDialogue();
        } else return;
        Library.addNewBook(newBookData);
    },

    cardButtonClick: function(e) {
        console.log(e);
        if (e.target.matches('[data-button="read"]')) {
            console.log('read button');
        } else if (e.target.matches('[data-button="delete"]')) {
            console.log('delete button');
            Library.deleteBook(e.target);
        }
    },

    init: function() {
        this.element.addNewButton.addEventListener('click', () => {
            this.element.formDialogue.showModal();
        });
        this.element.formCloseButton.addEventListener('click', () => this.closeDialogue());
        this.element.newBookForm.addEventListener('submit', (e) => this.formSubmit(e));
        this.element.bookShelf.addEventListener('click', (e) => this.cardButtonClick(e));
    },

};

Object.setPrototypeOf(uiController, uiElement);

//Library Object
const Library = {
    myLibrary: [
    {
        bookId: "1",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 281,
        read: true
    },
    {
        bookId: "2",
        title: "1984",
        author: "George Orwell",
        pages: 328,
        read: false
    },
    {
        bookId: "3",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 180,
        read: true
    },
    {
        bookId: "4",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        pages: 432,
        read: false
    },
    {
        bookId: "5",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        pages: 234,
        read: true
    },
    {
        bookId: "6",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 310,
        read: false
    },
],
    createCard: function(bookId, title, author, pages, isRead) {
    const card = this.elementCreate('div', {class: 'book-card', 'data-book-id': bookId, 'data-element-type': 'book-card'});

    const bookDetails = this.elementCreate('div', {class: 'book-details'});
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-title'}, title));
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-author'}, author));
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-pages'}, `${pages} Pages`));

    const cardTags = this.elementCreate('div', {class: 'card-tags'});
    const readTrueTag = this.elementCreate('div', {class: 'tag read-tag'}, 'Read');
    const readFalseTag = this.elementCreate('div', {class: 'tag unread-tag'}, 'Unread');
    cardTags.appendChild(isRead ? readTrueTag : readFalseTag);

    const cardButtons = this.elementCreate('div', {class: 'card-buttons'});
    cardButtons.appendChild(this.elementCreate(
        'button',
        {
            class: 'read card-button','data-book-id': bookId,
            'data-element-type': 'card-button',
            'data-button':'read'
        },
        'Read'
    ));
    cardButtons.appendChild(this.elementCreate(
        'button',
        {class: 'delete card-button',
            'data-book-id': bookId,
            'data-element-type': 'card-button',
            'data-button': 'delete'
        },
        'Delete'
    ));

    card.appendChild(bookDetails);
    card.appendChild(cardTags);
    card.appendChild(cardButtons);

    return card;
},
    displayBooks: function() {
        for (let key in this.myLibrary) {
            if (this.myLibrary.hasOwnProperty(key)) {
                this.element.bookShelf.appendChild(this.createCard(this.myLibrary[key].bookId, 
                    this.myLibrary[key].title,
                    this.myLibrary[key].author,
                    this.myLibrary[key].pages,
                    this.myLibrary[key].read,
                ));
            }
        }
    },

    addNewBook: function (bookDetails = {}) {
        const {book_title: title, book_author: author, book_pages: pages, read_status: isRead} = bookDetails;
        const bookId = idGenerator.generateBookId();
        const newBook = new BookObject(bookId,  title, author, pages, isRead);
        const newCard = this.createCard(bookId, title, author, pages, isRead);
        this.myLibrary.push(newBook);
        this.element.bookShelf.appendChild(newCard);
    },

    

    deleteBook: function (e) {
        const cardElement = e.closest('[data-element-type="book-card"]');
        const bookId = e.dataset.bookId;
        console.log(bookId);
    }
};

Object.setPrototypeOf(Library, uiElement);

//ID generators
const idGenerator = {
    newId: 0,
    generateBookId: function () {
    return `bkID-${++this.newId}`;
    }
};

//Book Object Constructor
function BookObject(bookId, title, author, pages, isRead) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
};

BookObject.prototype.readToggle = function() {
    this.read = !this.read;
};

document.addEventListener('DOMContentLoaded', () => {
    uiElement.elementSelector();
    uiController.init();
    Library.displayBooks();
});