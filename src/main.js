import api from './api';

class App {
    constructor() {
        this.repos = [];
        this.formElement = document.getElementById("repo-form");
        this.inputElement = document.querySelector("input[name=repository]");
        this.listElement = document.getElementById("repo-list");
        this.loadElement = document.querySelector("#loading-status h3");
        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = event => {
            this.AddRepo(event);
        }
    }

    setLoading(loading = true) {
        if (loading === true) {
            this.loadElement.innerHTML = "";
            this.loadElement.appendChild(document.createTextNode('Carregando...'));
        } else {
            this.loadElement.innerHTML = "";
        }
    }

    async AddRepo(event) {
        event.preventDefault();  

        const userNameInput = this.inputElement.value;
        if (userNameInput.length === 0) {
            return;
        }

        this.setLoading();

        try {
            this.repos = [];
            const response = await api.get(`/users/${userNameInput}/repos`);
            response.data.forEach(repo => {
                const { name, description, html_url, owner:{ avatar_url }} = repo;
                let desc = (description === null) ? "Esse repositório não possui descrição... :/" : description;
                this.repos.push({
                    name,
                    desc,
                    avatar_url,
                    html_url
                });
            });

            this.inputElement.value = '';
            this.render();
            this.setLoading(false);
            
        } catch (error) {
            this.inputElement.value = '';
            this.loadElement.innerHTML = "";
            this.loadElement.appendChild(document.createTextNode('Usuário não encontrado :('));
        }
    }

    render() {
        this.listElement.innerHTML = '';
        this.repos.forEach(repo => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', repo.avatar_url);
            
            let aElement = document.createElement('a');
            aElement.setAttribute('href', repo.html_url);
            aElement.appendChild(document.createTextNode(repo.name));
            
            let strongElement = document.createElement('strong');
            strongElement.appendChild(aElement);
            
            let pElement = document.createElement('p');
            pElement.appendChild(document.createTextNode(repo.desc));
            
            
            let liItem = document.createElement('li');
            liItem.appendChild(imgElement);
            liItem.appendChild(strongElement);
            liItem.appendChild(pElement);
            
            this.listElement.appendChild(liItem);
        });
    }
}

new App();