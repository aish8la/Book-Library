const addNewButton = document.querySelector('new-button');
const formDialogue = document.querySelector('form-dialogue');

addNewButton.addEventListener('click', () => {
    formDialogue.showModal();
});

