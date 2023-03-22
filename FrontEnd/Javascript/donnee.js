// Récupération des projets de l'architecte//

const imagesContainer = document.querySelector('.gallery')


const reponse = fetch('http://localhost:5678/api/works')
    .then((reponse) => reponse.json())
    .then((data) => {
        data.forEach((work) => {
            const figure = document.createElement('figure')
            const figureCaption = document.createElement('figcaption')
            const figureImage = document.createElement('img')

            figureImage.src = work.imageUrl
            figureImage.alt = work.title
            figureCaption.innerHTML = work.title
            figure.className = work.category.name
            figure.setAttribute('data-id', work.id);
            
            imagesContainer.appendChild(figure)
            figure.appendChild(figureImage)
            figure.appendChild(figureCaption)    
        });
    });
    
//Filtres//
//Filtre Objets//
        
function filtreObjet(){
    //afficher les Objets//
    var elementObjets = document.querySelectorAll('.Objets');

    for (var i = 0; i < elementObjets.length; i++){
        elementObjets[i].style.display = 'block';
    }

    //cacher les autres travaux//
    var elementsAppartements = document.querySelectorAll(".Appartements");
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

    for (var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'none';
    }

    for (var j = 0; j < elementsHotelRestaurants.length; j++){
        elementsHotelRestaurants[j].style.display = 'none';
    }
}
var bouton = document.getElementById('btnObjet');
bouton.addEventListener('click',filtreObjet);
              
       
//Filtre Hotel & resutaurants//
        
function filtreHotelsRestaurants(){
    //afficher les Hotels & restaurants//
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

    for (var i = 0; i < elementsHotelRestaurants.length; i++){
        elementsHotelRestaurants[i].style.display = 'block';
    }

    //cacher  les autrex travaux//
    var elementsAppartements = document.querySelectorAll('.Appartements');
    var elementsObjets = document.querySelectorAll('.Objets');

    for (var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'none';
    }

    for (var j = 0; j < elementsObjets.length; j++){
        elementsObjets[j].style.display = 'none';
    }
}

var bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click',filtreHotelsRestaurants);

        
//Filtre Appartements//

function filtreAppartements(){
            
    //afficher les Appartements//
    var elementsAppartements = document.querySelectorAll('.Appartements');

    for(var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'block';
    }

    //cacher le autrex travaux//
    var elementsObjets = document.querySelectorAll('.Objets');
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

    for (var j = 0; j < elementsObjets.length; j++){
        elementsObjets[j].style.display = 'none';
    }

    for(var j= 0; j < elementsHotelRestaurants.length; j++){
        elementsHotelRestaurants[j].style.display = 'none';
    }
}

var bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click',filtreAppartements);

//Filtre Tous//

function filtreTous(){
    //Afficher tout les travaux//
    var elementsObjets = document.querySelectorAll('.Objets');
    var elementsAppartements = document.querySelectorAll('.Appartements');
    var elementsHotelRestaurants = document.querySelectorAll("[class*=Hotels][class*=restaurants]");

    for (var i = 0; i < elementsObjets.length; i++){
        elementsObjets[i].style.display = 'block';
    }

    for(var i = 0; i < elementsAppartements.length; i++){
        elementsAppartements[i].style.display = 'block';
    }

    for (var i = 0; i < elementsHotelRestaurants.length; i++){
        elementsHotelRestaurants[i].style.display = 'block';
    }
}

var bouton = document.getElementById('btnTous');
bouton.addEventListener('click',filtreTous);


// Fonction qui garde le bouton filtre selectionné//

const boutons = document.querySelectorAll('.bouton-css');

boutons.forEach((bouton) => {
    bouton.addEventListener('click', function() {
      boutons.forEach((bouton) => {
        bouton.classList.remove('selected');
      });
      this.classList.add('selected');
      sessionStorage.setItem('boutonSelectionne', this.id);
    });
  });

window.onbeforeunload = function(){
sessionStorage.removeItem('boutonSelectionne');
}


//PARTIE LOGIN//

const loginStatus = document.querySelector("#login")
const logoutStatus = document.querySelector("#logout")
const adminStatus = document.querySelector("#admin-logged",)
const figureModify = document.querySelector("#figure-modify")
const portfolioModify = document.querySelector("#portfolio-l-modify")

console.log(sessionStorage.getItem("isConnected"));

if (JSON.parse(sessionStorage.getItem("isConnected"))) {
    loginStatus.style.display = 'none'
    logoutStatus.style.display = 'block'
    adminStatus.style.display = 'flex'
    figureModify.style.display = 'flex'
    portfolioModify.style.display = 'flex'
      
} else {
    loginStatus.style.display = 'block'
    logoutStatus.style.display = 'none'
    adminStatus.style.display = 'none'
    figureModify.style.display = 'none'
    portfolioModify.style.display = 'none'
}

// Réinitialise l'état de connexion de l'utilisateur
logoutStatus.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("Token");
    sessionStorage.removeItem("isConnected");
    console.log(sessionStorage.getItem("isConnected")); 
    window.location.replace("index.html");
});

const verifierToken = sessionStorage.getItem("Token");
console.log(verifierToken);

