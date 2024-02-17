class ProgressBar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });    
        this.loadContent('../html/progress-bar.html');
    }

    async loadContent(url) {
        const response = await fetch(url);
        const content = await response.text();

        const container = document.createElement('div');
        container.innerHTML = content;
        this.shadowRoot.appendChild(container);
        this.progressBarElement = this.shadowRoot.querySelector('.progress-container');
    }

    showProgressBar() {
        if (this.progressBarElement) {
            this.progressBarElement.style.display = 'block';
            this.progressBarElement.scrollIntoView({ behavior: "smooth"});
        }
    }

    hideProgressBar() {
        if (this.progressBarElement) {
            this.progressBarElement.style.display = 'none';
        }
    }
}

customElements.define('my-progress-bar', ProgressBar);
