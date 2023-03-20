//modal

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('#modal-close');

function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

modal.addEventListener('click', hideModal);
modalContent.addEventListener('click', function(e) {
  e.stopPropagation();
});
modalClose.addEventListener('click', hideModal);


//ajout des travaux dans la modal

const imagesModalContainer = document.querySelector('.gallery-modal')

const reponses = fetch('http://localhost:5678/api/works')
    .then((reponse) => reponse.json())
    .then((datas) => {
        datas.forEach((works) => {
            const figure = document.createElement('figure')
            const figureCaption = document.createElement('figcaption')
            const figureImage = document.createElement('img')
            const deleteIcon = document.createElement('i') 
            figureImage.src = works.imageUrl
            figureImage.alt = works.title
            figureCaption.innerHTML = "éditer"
            figure.className = works.category.name

            deleteIcon.className = "fa-regular fa-trash-can" 

            imagesModalContainer.appendChild(figure)
            figure.appendChild(figureImage)
            figure.appendChild(figureCaption)
            figure.appendChild(deleteIcon) 
        });
    });