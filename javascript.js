const addNewButton = document.querySelector('.new-button');
const formDialogue = document.querySelector('.form-dialogue');
const formCloseButton = document.querySelector('.form-close-button');
const bookShelf = document.querySelector('.book-shelf');
const myLibrary = [
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
];

addNewButton.addEventListener('click', () => {
    formDialogue.showModal();
});

formCloseButton.addEventListener('click', () => {
    formDialogue.close();
});

function BookObject(bookId, title, author, pages, read) {
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

BookObject.prototype.readToggle = function() {
    this.read = !this.read;
}

const generateUniqueId = (function outerIdGen() {
    let newId = 0;
    return () => {
        return `bkID-${++newId}`;
    }
})();


// For creating elements
function elementCreate(tagName, attribute = {}, textContent) {
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
}


// Function to create the card element
function createCard(title, author, pages, isRead, bookId) {
    const card = elementCreate('div', {class: 'book-card', 'data-book-id': bookId});

    const bookDetails = elementCreate('div', {class: 'book-details'});
    bookDetails.appendChild(elementCreate('div', {class: 'book-title'}, title));
    bookDetails.appendChild(elementCreate('div', {class: 'book-author'}, author));
    bookDetails.appendChild(elementCreate('div', {class: 'book-pages'}, `${pages} Pages`));

    const cardTags = elementCreate('div', {class: 'card-tags'});
    const readTrueTag = elementCreate('div', {class: 'tag read-tag'}, 'Read');
    const readFalseTag = elementCreate('div', {class: 'tag unread-tag'}, 'Unread');
    cardTags.appendChild(isRead ? readTrueTag : readFalseTag);

    const cardButtons = elementCreate('div', {class: 'card-buttons'});
    cardButtons.appendChild(elementCreate('button', {class: 'read card-button', 'data-book-id': bookId}, 'Read'));
    cardButtons.appendChild(elementCreate('button', {class: 'delete card-button', 'data-book-id': bookId}, 'Delete'));

    card.appendChild(bookDetails);
    card.appendChild(cardTags);
    card.appendChild(cardButtons);

    return card;
}

for (let key in myLibrary) {
    if (myLibrary.hasOwnProperty(key)) {
        bookShelf.appendChild(createCard(myLibrary[key].title, myLibrary[key].author, myLibrary[key].pages, myLibrary[key].read, myLibrary[key].bookId));
    }
}