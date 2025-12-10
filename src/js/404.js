// Handle 404 page interactions
const btnHome = document.getElementById('btnHome');
const btnGethelp = document.getElementById('btnHelp');
const overlayView = document.getElementById('helpView');
const btnCloseOverlayView = document.getElementById('closeHelpView');
const btnsSocialLinks = document.querySelectorAll('.social-links');

btnHome.addEventListener("click", 
    function gotoHome() {
        window.location.href = 'index.html';
});

btnGethelp.addEventListener("click", 
    function openGetHelpHere() {
        document.getElementById('helpView').style.display = "grid";
});

btnCloseOverlayView.addEventListener("click", 
    function ClosegetHelpHere() {
        overlayView.style.display = "none";
});

btnsSocialLinks.addEventListener("click", 
    function openSocialLinks() {
        overlayView.style.display = "none";
});