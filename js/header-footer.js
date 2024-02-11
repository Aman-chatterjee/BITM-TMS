// main.js
class MyHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });

        this.loadContent('../html/header-main.html');
    }

    async loadContent(url) {
        const response = await fetch(url);
        const content = await response.text();

        const container = document.createElement('div');
        container.innerHTML = content;
        this.shadowRoot.appendChild(container);
    }
}



class MyFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });

        this.loadContent('../html/footer-main.html');
    }

    async loadContent(url) {
        const response = await fetch(url);
        const content = await response.text();

        const container = document.createElement('div');
        container.innerHTML = content;
        this.shadowRoot.appendChild(container);
    }
}



customElements.define('my-header', MyHeader);
customElements.define('my-footer', MyFooter);
