
async function renderDemocrat() {
    $('.body').on("click", ".return", handleReturnHome);
    $('.body').on("click", ".logOut", handleLogOut);
}

function handleReturnHome() {
    window.location.href = "./homePage.html"
}

function handleLogOut() {
    window.location.href = "./index.html"
}

$(function() {
    renderDemocrat();
});