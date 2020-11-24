
async function renderDemocrat() {
    $('.body').on("click", ".return", handleReturnHome);
    $('.body').on("click", ".logOut", handleLogOut);
}

function handleReturnHome() {
    window.location.href = "./homePage.html"
}

async function handleLogOut() {
    const result = await axios({
        method: 'get',
        url: 'https://limitless-spire-89622.herokuapp.com/logout',
        withCredentials: true,
      });
    window.location.href = "./index.html"
}

$(function() {
    renderDemocrat();
});