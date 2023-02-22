// Récupération des projets de l'architecte//
const imagesContainer = document.querySelector('.gallery')

const reponse = fetch('http://localhost:5678/api/works')
    .then((reponse) => reponse.json())
    .then((data) => {
        data.forEach((image) => {
            const figure = document.createElement('figure')
            const figureCaption = document.createElement('figcaption')
            const figureImage = document.createElement('img')

            figureImage.src = image.imageUrl
            figureImage.alt = image.title
            figureCaption.innerHTML = image.title

            imagesContainer.appendChild(figure)
            figure.appendChild(figureImage)
            figure.appendChild(figureCaption)       
    });
});
    
