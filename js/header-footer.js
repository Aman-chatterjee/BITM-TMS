// main.js
class MyHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.loadContent('../html/header-main.html').then(()=>{

            //Hiding and showing registration tab in the nav-bar
            document.addEventListener('authStateChanged', (event) => {
                const user = event.detail.user;
        
                const idRegisterElement = this.shadowRoot.getElementById('id-register');
        
                if (idRegisterElement) {
                    // Check if the user is authenticated and hide 'id-register' accordingly
                    if (user) {
                        idRegisterElement.style.display = 'none';
                    } else {
                        idRegisterElement.style.display = 'block'; // or 'initial' depending on your design
                    }
                } else {
                    console.error("Element with id 'id-register' not found");
                }
            });

          
                // Find and hide the "Home" tab if on the home page
                const currentPage = document.body.id;
                console.log(currentPage);
              
                if (currentPage === 'home-page') {
                  const homeTab = this.shadowRoot.getElementById('home-tab');
                  if (homeTab) {
                    homeTab.style.display = 'none';
                  }else{
                    homeTab.style.display = 'block';
                  }
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
