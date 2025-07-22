document.addEventListener("DOMContentLoaded", () => {

    const repoName = "FinalGrabacr.github.io";

    const baseURL = window.location.origin + (repoName ? '/' + repoName : '');

    fetch(baseURL + '/_header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.innerHTML = html;

                const navButtons = headerPlaceholder.querySelectorAll('.nav-button');
                navButtons.forEach(button => {
                    const dataPath = button.getAttribute('data-path');
                    if (dataPath) {
                        button.href = baseURL + '/' + dataPath;
                    }
                });
            } else {
                console.error("Header placeholder div not found!");
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
});