const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#submitUserInfo"),
};

let bouton = element.submit.addEventListener("click", (a) => {
    a.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: element.email.value,
                password: element.password.value,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("Token", data.token);

            //Rajouter condition erreur//

            if (data.message || data.error) {
                alert("Identifiant ou mot de passe incorrect");
            } else {
                window.location = "http://127.0.0.1:5500/Portfolio/FrontEnd/index.html";
            }
        })
});

const verifierToken = localStorage.getItem("Token");
console.log(verifierToken);

if (verifierToken) {
    console.log("Token is ok");
};