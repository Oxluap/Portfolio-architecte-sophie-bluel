// Récupération des projets de l'architecte//
const reponse = fetch('http://localhost:5678/api/works')
.then((reponse) => reponse.json())
.then((works) => {
    
//création balise et import element//
async function imageElement() {
const createImg = document.createElement("img");
createImg.src = works.imageUrl;
}

//Rattachement//
async function rattachGallery() {
const sectionGallery = document.querySelector(".gallery");
sectionGallery.appendChild(createImg);
}})
