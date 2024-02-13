# API 
/auth/register      POST        nom, prenom, mail ,motDePasse, role         inscription
/auth/login         POST        email , motDePasse                          login
/auth/users         GET                                                     liste users

# Insription

## role 
    manager
    employee
    client

## logique d'inscription
formulaire = nom , prenom , email , motDePasse , role
si role === manager
    insertion dans table User
    insertion dans table Manager
si role === employe
    insertion dans table User
    insertion dans table Employe
    envoie mail pour confirmation de cette email
si role === client 
    insertion dans table User
    insertion dans table Employe
    envoie mail pour confirmation de cette email

## authentification
### Client
    seul le mail confirmer peut se connecter
### employe
    seul le mail confirmé
    et mail validé par le manager
    