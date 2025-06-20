        node app.js

Ouvrez votre navigateur ou utilisez un outil comme Postman, Insomnia, ou curl pour tester vos endpoints :  

### **1. GET /api/cities**



  * **Description :** Récupère une liste de villes. C'est l'endpoint principal pour la lecture des données.

  * **Méthode HTTP :** `GET`

  * **Paramètres de requête (Query Parameters) :**

      * `search` (optionnel) : Permet de filtrer les villes par leur nom, code postal ou code INSEE (recherche insensible à la casse).

          * **Exemple :** `http://localhost:3000/api/cities?search=Paris`

      * `limit` (optionnel) : Nombre maximum de villes à retourner par page. Par défaut, 10.

          * **Exemple :** `http://localhost:3000/api/cities?limit=20`

      * `page` (optionnel) : Numéro de la page à récupérer. Par défaut, 1.

          * **Exemple :** `http://localhost:3000/api/cities?page=2&limit=5`

  * **Réponse :** Un objet JSON contenant les données des villes (`data`), le nombre total de villes correspondant à la requête (`total`), la page actuelle (`page`), la limite par page (`limit`), et le nombre total de pages (`totalPages`).

  * **Codes de Statut possibles :**

      * `200 OK` : Requête réussie.

      * `500 Internal Server Error` : Erreur côté serveur (par exemple, problème de connexion à la base de données).



-----



### **2. GET /api/cities/:id**



  * **Description :** Récupère les détails d'une ville spécifique en utilisant son ID unique.

  * **Méthode HTTP :** `GET`

  * **Paramètre de chemin (Path Parameter) :**

      * `:id` : L'identifiant numérique unique de la ville (celui que nous avons ajouté lors de l'importation).

          * **Exemple :** `http://localhost:3000/api/cities/123`

  * **Réponse :** Un objet JSON représentant la ville trouvée.

  * **Codes de Statut possibles :**

      * `200 OK` : Ville trouvée et retournée.

      * `404 Not Found` : Aucune ville trouvée avec l'ID spécifié.

      * `500 Internal Server Error` : Erreur côté serveur.



-----



### **3. POST /api/cities**



  * **Description :** Crée une nouvelle ville dans la base de données.

  * **Méthode HTTP :** `POST`

  * **Corps de la requête (Request Body) :** Un objet JSON contenant les informations de la nouvelle ville. Vous devez fournir les champs correspondant à votre schéma Mongoose : `Code_commune_INSEE`, `Nom_de_la_commune`, `Code_postal`, `Libelle_d_acheminement`, et `Ligne_5`. L'ID de la ville sera généré automatiquement.

      * **Exemple de corps JSON :**

        ```json

        {

            "Code_commune_INSEE": "99001",

            "Nom_de_la_commune": "Nouvelle Ville Test",

            "Code_postal": "99999",

            "Libelle_d_acheminement": "NOUVELLE VILLE TEST",

            "Ligne_5": ""

        }

        ```

  * **Réponse :** L'objet JSON de la ville nouvellement créée, y compris son ID généré.

  * **Codes de Statut possibles :**

      * `201 Created` : La ville a été créée avec succès.

      * `500 Internal Server Error` : Erreur lors de la création de la ville (par exemple, problème de validation ou de base de données).



-----



### **4. PUT /api/cities/:id**



  * **Description :** Met à jour **complètement** une ville existante identifiée par son ID.

  * **Méthode HTTP :** `PUT`

  * **Paramètre de chemin (Path Parameter) :**

      * `:id` : L'identifiant numérique de la ville à mettre à jour.

  * **Corps de la requête (Request Body) :** Un objet JSON contenant **toutes les nouvelles informations** de la ville. Si un champ n'est pas inclus, il pourrait être supprimé ou remis à zéro si le schéma ne le permet pas.

      * **Exemple de corps JSON :**

        ```json

        {

            "Code_commune_INSEE": "01001",

            "Nom_de_la_commune": "L ABERGEMENT CLEMENCIAT MODIFIE",

            "Code_postal": "01400",

            "Libelle_d_acheminement": "L ABERGEMENT CLEMENCIAT",

            "Ligne_5": "Info sup"

        }

        ```

  * **Réponse :** L'objet JSON de la ville mise à jour.

  * **Codes de Statut possibles :**

      * `200 OK` : La ville a été mise à jour avec succès.

      * `404 Not Found` : Aucune ville trouvée avec l'ID spécifié.

      * `500 Internal Server Error` : Erreur lors de la mise à jour (par exemple, problème de validation).



-----



### **5. DELETE /api/cities/:id**



  * **Description :** Supprime une ville existante identifiée par son ID.

  * **Méthode HTTP :** `DELETE`

  * **Paramètre de chemin (Path Parameter) :**

      * `:id` : L'identifiant numérique de la ville à supprimer.

  * **Corps de la requête :** Aucun corps n'est nécessaire pour cette requête.

  * **Réponse :** Un message de succès.

  * **Codes de Statut possibles :**

      * `200 OK` : La ville a été supprimée avec succès.

      * `404 Not Found` : Aucune ville trouvée avec l'ID spécifié.

      * `500 Internal Server Error` : Erreur lors de la suppression.



-----