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
        this.element.formSubmitButton = document.querySelector('.form-submit');
    },
};

//UI Controllers 
const uiController = {
    closeDialogue: function() {
        this.element.newBookForm.reset();
        this.element.formDialogue.close();
    },
    init: function() {
        this.element.addNewButton.addEventListener('click', () => {
            this.element.formDialogue.showModal();
        });
        this.element.formCloseButton.addEventListener('click', () => this.closeDialogue());
        this.element.formSubmitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.closeDialogue();
        });
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
    createCard: function(title, author, pages, isRead, bookId) {
    const card = this.elementCreate('div', {class: 'book-card', 'data-book-id': bookId});

    const bookDetails = this.elementCreate('div', {class: 'book-details'});
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-title'}, title));
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-author'}, author));
    bookDetails.appendChild(this.elementCreate('div', {class: 'book-pages'}, `${pages} Pages`));

    const cardTags = this.elementCreate('div', {class: 'card-tags'});
    const readTrueTag = this.elementCreate('div', {class: 'tag read-tag'}, 'Read');
    const readFalseTag = this.elementCreate('div', {class: 'tag unread-tag'}, 'Unread');
    cardTags.appendChild(isRead ? readTrueTag : readFalseTag);

    const cardButtons = this.elementCreate('div', {class: 'card-buttons'});
    cardButtons.appendChild(this.elementCreate('button', {class: 'read card-button', 'data-book-id': bookId}, 'Read'));
    cardButtons.appendChild(this.elementCreate('button', {class: 'delete card-button', 'data-book-id': bookId}, 'Delete'));

    card.appendChild(bookDetails);
    card.appendChild(cardTags);
    card.appendChild(cardButtons);

    return card;
},
    displayBooks: function() {
        for (let key in this.myLibrary) {
            if (this.myLibrary.hasOwnProperty(key)) {
                this.element.bookShelf.appendChild(this.createCard(this.myLibrary[key].title,
                    this.myLibrary[key].author,
                    this.myLibrary[key].pages,
                    this.myLibrary[key].read,
                    this.myLibrary[key].bookId
                ));
            }
        }
    },
};

Object.setPrototypeOf(Library, uiElement);

//ID generators
const idGenerator = {
    generateBookId: (function outerIdGen() {
    let newId = 0;
    return () => {
        return `bkID-${++newId}`;
    }
    })(),
}

//Book Object Constructor
function BookObject(bookId, title, author, pages, read) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

BookObject.prototype.readToggle = function() {
    this.read = !this.read;
};

document.addEventListener('DOMContentLoaded', () => {
    uiElement.elementSelector();
    uiController.init();
    Library.displayBooks();
});