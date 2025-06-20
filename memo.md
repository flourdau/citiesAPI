#   Init
    npm init -y  
    npm install express csv-parser cors

#   Git Init
    git init
    git add .
    git commit -m "Initial commit: Setup REST API for French cities"
    git remote add origin git@github.com:flourdau/citiesAPI.git
    git branch -M main
    git push -u origin main

#   MongoDB
    npm install mongoose dotenv
    sudo apt-get install gnupg curl
    curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
    sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
    --dearmor
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl enable mongod
    sudo systemctl status mongod