
function onLoginLoad() {
    const $body = $('.body');
    $('.body').on("click", ".Login", handleLoginButtonPress)
    $('.body').on("click", ".createAccount", handleCreateButtonPress)
}

async function handleCreateButtonPress(event) {
    window.location.href = "./createAccount.html"
}


async function handleLoginButtonPress(event) {
    username = document.getElementById("username")
    password = document.getElementById("password")
    let response = await sendLoginMessage(username, password)
    if (response.data == "Not Found") {
        renderUserNotFound()
    } else if (response.data == "unauthorized") {
        renderIncorrectPassword()
    } else if (response.data == true) {
        window.location.href = "./homePage.html"
    }
}

function renderUserNotFound() {
    const $alert = $('div.alert');
    $alert.replaceWith('<div class = alert><h3>User not found. Click Create Account to join!</h3></div>');
}

function renderIncorrectPassword() {
    const $alert = $('div.alert');
    $alert.replaceWith('<div class = alert><h3>Incorrect password was entered</h3><br><p>Remember letters are case-sensitive.</p></div>');
}



async function sendLoginMessage(username, password) {
    const result = await axios({
        method: 'post',
        url: "https://limitless-spire-89622.herokuapp.com/login",
        withCredentials: true,
        data: {
            login: username.value,
            password: password.value
        }
      })
    return result
}

$(function() {
    onLoginLoad();
});
