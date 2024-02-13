# API 
/auth/register      POST        nom, prenom, mail ,motDePasse, role         inscription
/auth/login         POST        email , motDePasse                          login
/auth/users         GET                                                     liste users

# Insription

## role 
    manager
    employee
    client

## authentification
### Client
    seul le mail confirmer peut se connecter
### employe
    seul le mail confirmé
    et mail validé par le manager
    