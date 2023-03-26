//MODAL//

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

//Add photo button//

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



//ADD WORKS TO THE MODAL//

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
        figure.setAttribute('data-id', works.id); // Add a data-id attribute to store the work ID
        deleteIcon.className = "fa-regular fa-trash-can" 
      
        imagesModalContainer.appendChild(figure)
        figure.appendChild(figureImage)
        figure.appendChild(figureCaption)
        figure.appendChild(deleteIcon)
      
        // Add a delete event when clicking on the "delete" icon
        deleteIcon.addEventListener('click', (event) => {
          event.preventDefault();
          deleteWorkById(works.id);
        });
      });
    });


//DELETE WORK//

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

//Delete all gallery//

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

//Check form filled//

const titleInput = document.getElementById('modal-photo-title');
const categorySelect = document.getElementById('modal-photo-category');
const imageInput = document.getElementById('image');
const submitButton = document.getElementById('modal-valider');

function checkForm() {
  if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
    submitButton.style.backgroundColor = '#1D6154';
  } else {
    submitButton.style.backgroundColor = '';
    }
  }

titleInput.addEventListener('input', checkForm);
categorySelect.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);


//ADD NEW WORK//

const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
  event.preventDefault(); 

  const token = sessionStorage.getItem("Token");

  const title = document.getElementById("modal-photo-title").value;
  const category = document.getElementById("modal-photo-category").value;
  const image = document.getElementById("image").files[0];


  if(!title || !category || !image) {
    alert('Veuillez remplir tous les champs du formulaire.')
    return;
  }

  //check if the image does not exceed 4mo//
  if (image.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }
  
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
.then(response => response.json()) 
.then(work => {
  //create and add the new element to the gallery//
  const figure = document.createElement('figure')
  const figureCaption = document.createElement('figcaption')
  const figureImage = document.createElement('img')

  figureImage.src = work.imageUrl
  figureImage.alt = work.title
  figureCaption.innerHTML = work.title
  figure.setAttribute('data-id', work.id);
  figure.setAttribute('category-id', work.categoryId)

  const gallery = document.querySelector('.gallery');
  gallery.appendChild(figure);
  figure.appendChild(figureImage);
  figure.appendChild(figureCaption);

  //create and add the new element to the modal gallery//
  const figureModal = document.createElement('figure')
  const figureCaptionModal = document.createElement('figcaption')
  const figureImageModal = document.createElement('img')
  const deleteIcon = document.createElement('i')

  figureImageModal.src = work.imageUrl
  figureImageModal.alt = work.title
  figureCaptionModal.innerHTML = "éditer"
  figureModal.setAttribute('data-id', work.id);
  deleteIcon.className = "fa-regular fa-trash-can" 

  const galleryModal = document.querySelector('.gallery-modal');
  galleryModal.appendChild(figureModal);
  figureModal.appendChild(figureImageModal);
  figureModal.appendChild(figureCaptionModal);
  figureModal.appendChild(deleteIcon);

  //Add a delete event when clicking on the "delete" icon//
  deleteIcon.addEventListener('click', (event) => {
    event.preventDefault();
    deleteWorkById(work.id);
  });
  alert('Le nouvel élément a été ajouté avec succès.');
})
.catch(error => console.error(error));
}

//PREVIEW IMG//
const inputImage = document.getElementById("image");
const labelImage = document.getElementById("label-image");
const pImage = document.querySelector("#form-photo-div > p");
const iconeImage = document.querySelector("#iModalImage");

inputImage.addEventListener("change", function () {
  const selectedImage = inputImage.files[0];

  const imgPreview = document.createElement("img");
  imgPreview.src = URL.createObjectURL(selectedImage);
  imgPreview.style.maxHeight = "100%";
  imgPreview.style.width = "auto";

  labelImage.style.display = "none";
  pImage.style.display = "none";
  inputImage.style.display = "none";
  iModalImage.style.display = "none";
  document.getElementById("form-photo-div").appendChild(imgPreview);
});
