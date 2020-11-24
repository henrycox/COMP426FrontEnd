async function deleteAccount() {
    //axios call
    const result = await axios({
        method: 'delete',
        url: "https://limitless-spire-89622.herokuapp.com/user",
        withCredentials: true
      });
      
    //now send back to login page
    window.location.href="./login.html";
}

async function updatePassword(event) {
    event.preventDefault();

    let newpass = document.getElementById("newpassword").value;

    //axios call
    const result = await axios({
        method: 'put',
        url: "https://limitless-spire-89622.herokuapp.com/updatePassword",
        withCredentials: true,
        data: {
            password: newpass
        },
      });

    //change page
    window.location.href="./login.html";
}

function returnToHome() {
    window.location.href="homePage.html";
}


function loadIntoDom() {

    const $root = $('.body');

    //listener for delete button
    $root.on("click", ".delete", deleteAccount);

    //listener for update password
    $root.on("click", ".updatepassword", updatePassword);

    //listener for return home
    $root.on("click", ".return", returnToHome);

}

$(function() {
    loadIntoDom();
});