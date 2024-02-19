// main.js
class MyHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.loadContent('../html/header-main.html').then(() => { 
       
            //Hiding and showing registration tab in the nav-bar
            document.addEventListener('authStateChanged', (event) => {
                const user = event.detail.user;

                let currentPage = window.location.pathname;
                const idRegisterElement = this.shadowRoot.getElementById('id-register');
                const idLoginElement = this.shadowRoot.getElementById('id-login');
                const idLogoutElement = this.shadowRoot.getElementById('id-logout');
                
                if (idRegisterElement && idLoginElement && idLogoutElement) {
                
                    if (user) {
                        idRegisterElement.style.display = 'none';
                        idLoginElement.style.display = 'none';
                        
                        // Check if the current page is not the home page
                        if (currentPage !== '/Index.html') {
                            idLogoutElement.style.display = 'block';
                        }
        

                    } else {
                        idRegisterElement.style.display = 'block';
                        idLogoutElement.style.display = 'none';

                        // Check if the current page is not the home page
                        if (currentPage !== '/Index.html') {
                            idLoginElement.style.display = 'block';
                        }
                       
                    }
                } else {
                    console.error("Element with id 'id-register' or 'id-login' not found");
                }
            });


            
            // Add event listener to toggle menu
            const menuToggle = this.shadowRoot.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', () => {
                    const menu = this.shadowRoot.querySelector('.menu');
                    menu.classList.toggle('active');
                });
            } else {
                console.error("Element with class 'menu-toggle' not found");
            }



        });

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
