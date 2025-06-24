-----

Create by flourdau & Google Gemini

-----

## Documentation de l'API des Villes de France

Cette API RESTful permet de gérer et de consulter les données des villes de France, basées sur les informations de la poste.

**URL de base de l'API :** `http://localhost:3000/api/villes`

-----

### Conventions Générales

  * **Format de Données :** Toutes les requêtes et réponses utilisent le format **JSON**.
  * **Codes de Statut HTTP :** L'API utilise les codes de statut HTTP standards pour indiquer le succès ou l'échec des requêtes.
      * `200 OK` : La requête a été traitée avec succès.
      * `201 Created` : Une nouvelle ressource a été créée avec succès.
      * `204 No Content` : La requête a été traitée avec succès, mais il n'y a pas de contenu à renvoyer (souvent pour les suppressions).
      * `400 Bad Request` : La requête est mal formée ou contient des données invalides.
      * `404 Not Found` : La ressource demandée n'a pas été trouvée.
      * `409 Conflict` : La requête n'a pas pu être complétée en raison d'un conflit (ex: ressource déjà existante).
      * `500 Internal Server Error` : Une erreur inattendue s'est produite côté serveur.

-----

### 1\. Routes de Lecture (GET)

Ces routes permettent de récupérer des informations sur les villes.

#### 1.1. Obtenir toutes les villes (avec pagination)

Récupère une liste paginée de toutes les villes.

  * **Endpoint :** `/api/villes`
  * **Méthode :** `GET`
  * **Paramètres de requête (Query Parameters) :**
      * `page` (Optionnel) : Numéro de la page à récupérer (par défaut : `1`).
      * `limit` (Optionnel) : Nombre de villes par page (par défaut : `10`).
  * **Exemple de Requête :**
    ```
    GET http://localhost:3000/api/villes?page=2&limit=5
    ```
  * **Exemple de Réponse (200 OK) :**
    ```json
    {
        "next": {
            "page": 3,
            "limit": 5
        },
        "previous": {
            "page": 1,
            "limit": 5
        },
        "total": 36625,
        "data": [
            {
                "_id": "...",
                "code_commune_insee": "01004",
                "nom_de_la_commune": "AMBERIEU EN BUGEY",
                "code_postal": "01500",
                "libelle_d_acheminement": "AMBERIEU EN BUGEY",
                "ligne_5": null,
                "_geopoint": [ 5.3418579, 45.9627798 ],
                "latitude": 45.9627798,
                "longitude": 5.3418579,
                "__v": 0
            },
            // ... 4 autres villes
        ]
    }
    ```

#### 1.2. Obtenir toutes les villes (sans limite)

Récupère la totalité de la liste des villes. **Attention :** Cette route peut retourner une très grande quantité de données et doit être utilisée avec précaution pour éviter de surcharger le réseau ou le client.

  * **Endpoint :** `/api/villes/all`
  * **Méthode :** `GET`
  * **Paramètres :** Aucun
  * **Exemple de Requête :**
    ```
    GET http://localhost:3000/api/villes/all
    ```
  * **Exemple de Réponse (200 OK) :**
    ```json
    [
        {
            "_id": "...",
            "code_commune_insee": "01001",
            "nom_de_la_commune": "L ABERGEMENT CLEMENCIAT",
            "code_postal": "01400",
            // ... autres champs
        },
        // ... toutes les villes
    ]
    ```

#### 1.3. Rechercher des villes par requête

Recherche des villes par `code_postal` ou `nom_de_la_commune` (recherche insensible à la casse).

  * **Endpoint :** `/api/villes/search/:query`
  * **Méthode :** `GET`
  * **Paramètres d'URL (Path Parameters) :**
      * `query` (Obligatoire) : La chaîne de caractères à rechercher (ex: "paris", "01400").
  * **Exemple de Requête :**
    ```
    GET http://localhost:3000/api/villes/search/paris
    ```
  * **Exemple de Réponse (200 OK) :**
    ```json
    [
        {
            "_id": "...",
            "code_commune_insee": "75056",
            "nom_de_la_commune": "PARIS",
            "code_postal": "75001",
            // ... autres champs
        },
        // ... autres villes correspondant à la recherche
    ]
    ```
  * **Exemple de Réponse (404 Not Found) :**
    ```json
    {
        "message": "Ville(s) non trouvée(s)."
    }
    ```

#### 1.4. Obtenir une ville par code INSEE

Récupère les détails d'une ville spécifique en utilisant son `code_commune_insee`.

  * **Endpoint :** `/api/villes/:codeInsee`
  * **Méthode :** `GET`
  * **Paramètres d'URL (Path Parameters) :**
      * `codeInsee` (Obligatoire) : Le code INSEE de la commune (ex: "01001").
  * **Exemple de Requête :**
    ```
    GET http://localhost:3000/api/villes/01001
    ```
  * **Exemple de Réponse (200 OK) :**
    ```json
    {
        "_id": "...",
        "code_commune_insee": "01001",
        "nom_de_la_commune": "L ABERGEMENT CLEMENCIAT",
        "code_postal": "01400",
        "libelle_d_acheminement": "L ABERGEMENT CLEMENCIAT",
        "ligne_5": null,
        "_geopoint": [ 4.9306005, 46.1517018 ],
        "latitude": 46.1517018,
        "longitude": 4.9306005,
        "__v": 0
    }
    ```
  * **Exemple de Réponse (404 Not Found) :**
    ```json
    {
        "message": "Ville non trouvée."
    }
    ```

-----

### 2\. Route de Création (POST)

Cette route permet d'ajouter une nouvelle ville à la base de données.

#### 2.1. Créer une nouvelle ville

  * **Endpoint :** `/api/villes`
  * **Méthode :** `POST`
  * **Corps de la Requête (Request Body) :** JSON avec les données de la nouvelle ville.
      * **Champs requis :** `code_commune_insee`, `nom_de_la_commune`, `code_postal`.
      * **Exemple de corps :**
        ```json
        {
            "code_commune_insee": "99999",
            "nom_de_la_commune": "NOUVELLE_VILLE_TEST",
            "code_postal": "99999",
            "libelle_d_acheminement": "NOUVELLE_VILLE_TEST",
            "latitude": 45.0,
            "longitude": 5.0
        }
        ```
  * **Exemple de Requête :**
    ```
    POST http://localhost:3000/api/villes
    Content-Type: application/json

    {
        "code_commune_insee": "99999",
        "nom_de_la_commune": "NOUVELLE_VILLE_TEST",
        "code_postal": "99999",
        "libelle_d_acheminement": "NOUVELLE_VILLE_TEST",
        "latitude": 45.0,
        "longitude": 5.0
    }
    ```
  * **Exemple de Réponse (201 Created) :**
    ```json
    {
        "_id": "...",
        "code_commune_insee": "99999",
        "nom_de_la_commune": "NOUVELLE_VILLE_TEST",
        "code_postal": "99999",
        // ... autres champs, y compris ceux qui sont optionnels
    }
    ```
  * **Exemple de Réponse (400 Bad Request) :** Si des champs requis sont manquants ou des données sont invalides.
    ```json
    {
        "message": "Les champs \"code_commune_insee\", \"nom_de_la_commune\" et \"code_postal\" sont requis."
    }
    ```
  * **Exemple de Réponse (409 Conflict) :** Si une ville avec le même `code_commune_insee` existe déjà.
    ```json
    {
        "message": "Une ville avec ce code INSEE existe déjà."
    }
    ```

-----

### 3\. Route de Mise à Jour (PUT)

Cette route permet de mettre à jour les informations d'une ville existante. Elle effectue une mise à jour partielle (`PATCH`-like) des champs fournis.

#### 3.1. Mettre à jour une ville par code INSEE

  * **Endpoint :** `/api/villes/:codeInsee`
  * **Méthode :** `PUT`
  * **Paramètres d'URL (Path Parameters) :**
      * `codeInsee` (Obligatoire) : Le code INSEE de la commune à mettre à jour.
  * **Corps de la Requête (Request Body) :** JSON avec les champs à modifier. Tous les champs sont optionnels.
      * **Exemple de corps :**
        ```json
        {
            "nom_de_la_commune": "VILLE_TEST_MODIFIEE",
            "code_postal": "12345"
        }
        ```
  * **Exemple de Requête :**
    ```
    PUT http://localhost:3000/api/villes/99999
    Content-Type: application/json

    {
        "nom_de_la_commune": "VILLE_TEST_MODIFIEE",
        "code_postal": "12345"
    }
    ```
  * **Exemple de Réponse (200 OK) :**
    ```json
    {
        "_id": "...",
        "code_commune_insee": "99999",
        "nom_de_la_commune": "VILLE_TEST_MODIFIEE",
        "code_postal": "12345",
        // ... autres champs (inchangés ou mis à jour)
    }
    ```
  * **Exemple de Réponse (404 Not Found) :**
    ```json
    {
        "message": "Ville non trouvée."
    }
    ```

-----

### 4\. Route de Suppression (DELETE)

Cette route permet de supprimer une ville de la base de données.

#### 4.1. Supprimer une ville par code INSEE

  * **Endpoint :** `/api/villes/:codeInsee`
  * **Méthode :** `DELETE`
  * **Paramètres d'URL (Path Parameters) :**
      * `codeInsee` (Obligatoire) : Le code INSEE de la commune à supprimer.
  * **Exemple de Requête :**
    ```
    DELETE http://localhost:3000/api/villes/99999
    ```
  * **Exemple de Réponse (204 No Content) :**
    (Pas de corps de réponse, succès de la suppression)
  * **Exemple de Réponse (404 Not Found) :**
    ```json
    {
        "message": "Ville non trouvée."
    }
    ```

-----