//modal

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalPhoto = document.querySelector('#modal-photo');
const modalClose = document.querySelector('#modal-close');

function showModal() {
  modal.style.display = 'block';
}

function hideModal() {
  modal.style.display = 'none';
}

modalContent.addEventListener('click', function(e) {
  e.stopPropagation();
});
modalPhoto.addEventListener('click', function(e) {
  e.stopPropagation();
});

modalClose.addEventListener('click', hideModal);


modal.addEventListener('click', hideModal);
modalContent.addEventListener('click', function(e) {
  e.stopPropagation();
});

//Afficher la modal photo//

const newPhotoBtn = document.querySelector('#new-photo');
const returnBtn = document.querySelector('#modal-return');
const modalPhotoClose = document.querySelector("#modal-photo-close");


newPhotoBtn.addEventListener('click', function() {
  modalContent.style.display = 'none';
  modalPhoto.style.display = 'block';
});

returnBtn.addEventListener('click', function(){
  modalContent.style.display = 'flex';
  modalPhoto.style.display = 'none';
})

modalPhotoClose.addEventListener('click', hideModal);



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
        figure.setAttribute('data-id', works.id); // Ajouter un attribut data-id pour stocker l'ID du travail
      
        deleteIcon.className = "fa-regular fa-trash-can" 
      
        imagesModalContainer.appendChild(figure)
        figure.appendChild(figureImage)
        figure.appendChild(figureCaption)
        figure.appendChild(deleteIcon)
      
        // Ajouter un événement de suppression au clic sur l'icône "supprimer"
        deleteIcon.addEventListener('click', (event) => {
          event.stopPropagation();
          event.stopImmediatePropagation();
          event.preventDefault();
          deleteWorkById(works.id);
        });
      });
    });


//Supression travaux//

function deleteWorkById(workId) {
  const token = sessionStorage.getItem("Token");
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    })
    const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    if (modalWorkToRemove) {
      modalWorkToRemove.remove();
      
    const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
    if (galleryWorkToRemove) {
        galleryWorkToRemove.remove();
    } else {
        console.error('Élément à supprimer non trouvé dans la galerie principale');
      }
    } else {
  console.error('Élément à supprimer non trouvé dans la modale');
    }
  }    
}  

//supprimer toute la gallerie

function deleteGallery() {
  const token = sessionStorage.getItem("Token");
  const galleryWorks = document.querySelectorAll('.gallery-modal figure, .gallery figure');
  galleryWorks.forEach((galleryWork) => {
    const workId = galleryWork.getAttribute('data-id');
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        "Accept" : 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    });
    galleryWork.remove();
  });
}

document.getElementById("delete-gallery").addEventListener("click", function() {
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer la galerie ?");
  if (confirmation) {
    deleteGallery();
  }
});

//ajout d'un nouveau travail//

const form = document.querySelector('form');
form.addEventListener('submit', addNewWork);

function addNewWork(event) {
  event.preventDefault(); 

  const token = sessionStorage.getItem("Token");

  const title = document.getElementById("modal-photo-title").value;
  const category = document.getElementById("modal-photo-category").value;
  const image = document.getElementById("image").files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      "Accept" : 'application/json', 
      "Authorization" : `Bearer ${token}`
    }
  })
  window.location.replace("index.html");
}