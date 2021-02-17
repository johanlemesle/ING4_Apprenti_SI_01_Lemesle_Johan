# ING4_APPRENTI_SI_01_LEMESLE_JOHAN

## TP2 : 02.expressjs

### **Assignments**

On va créer notre premier serveur nodejs avec express.

Le but de ce TP est de créer plusieurs routes.

On va créer des routes dans le but de :

- Lister tous les utilisateurs :
    - retourner un tableau d'objet utilisateur
- Récuperer les données d'un utilisateur :
    - retourner 404 si l'utilisateur n'existe pas,
    - retourner l'objet utilisateur si il existe
- Créer un utilisateur :
    - retourner le nouvel utilisateur créé. Code 201.
    - Bonus si des blindages sont mis en place (email obligatoire/unique, etc) -> Code 400 / 422
- Modifier un utilisateur :
    - retourner 404 si l'utilisateur n'existe pas,
    - retourner l'utilisateur modifié.
    - Bonus si des blindages sont mis en place (email obligatoire/unique, etc) -> Code 400 / 422
- Supprimer un utilisateur :
    - retourner 404 si l'utilisateur n'existe pas,
    - retourner une réponse 204 si l'utilisateur est correctement supprimé.


### **Instructions**

To test the app, follow those instructions (you can put any variables you want in curl commands):

1. GET :
    - run : "curl --request GET http://localhost:8000/users/"
    - run : "curl --request GET http://localhost:8000/users/1"
2. POST :
    - run : "curl --header "Content-Type: application/json" --request POST --data '{"id":"4","name":"user4"}' http://localhost:8000/users"
3. PUT :
    - run : "curl --header "Content-Type: application/json" --request PUT --data '{"id":"1","name":"newname"}' http://localhost:8000/users/1"
4. DELETE :
    - run : "curl --header "Content-Type: application/json" --request DELETE http://localhost:8000/users/4"
