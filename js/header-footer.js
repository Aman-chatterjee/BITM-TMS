// main.js
class MyHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.loadContent('../html/header-main.html').then(() => { 
       

        navFunctions(this.shadowRoot);

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








    function navFunctions(sRoot){

            let currentPage = window.location.pathname;
            const idRegisterElement = sRoot.getElementById('id-register');
            const idLoginElement = sRoot.getElementById('id-login');
            const idLogoutElement = sRoot.getElementById('id-logout');
            const menuToggle = sRoot.querySelector('.menu-toggle');

            //Hiding and showing registration tab in the nav-bar
            document.addEventListener('authStateChanged', (event) => {
                const user = event.detail.user;

                if (idRegisterElement && idLoginElement && idLogoutElement) {
                
                    if (user) {
                        idRegisterElement.style.display = 'none';
                        idLoginElement.style.display = 'none';
                        idLogoutElement.style.display = 'block';   

                    } else {
                        idRegisterElement.style.display = 'block';
                        idLogoutElement.style.display = 'none';

                        // Check if the current page is not the home page
                        if (currentPage !== '/Index.html') {
                            idLoginElement.style.display = 'block';
                        }
                       
                    }
                } 
            });


            //Signout tab event listner
            idLogoutElement.addEventListener('click', ()=>{
                triggerLogout();
            });


            
            // Add event listener to toggle menu
            if (menuToggle) {
                menuToggle.addEventListener('click', () => {
                    const menu = sRoot.querySelector('.menu');
                    menu.classList.toggle('active');
                });
            } else {
                console.error("Element with class 'menu-toggle' not found");
            }
    
}




function triggerLogout() {
    const logoutEvent = new CustomEvent('logoutUser');
    document.dispatchEvent(logoutEvent);
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
