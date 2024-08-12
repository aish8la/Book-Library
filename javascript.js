const addNewButton = document.querySelector('#add-new-btn');
const formDialogue = document.querySelector('form-dialogue');

addNewButton.addEventListener('click', () => {
    formDialogue.showModal();
});

