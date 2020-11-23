async function deleteAccount() {

    //console.log('test');

    
    //axios call
    const result = await axios({
        method: 'delete',
        url: "http://localhost:3030/user",
        withCredentials: true
      });
      

    //now send back to login page
    window.location.href="./login.html";
}

function loadIntoDom() {

    const $root = $('#root');

    //listener for delete button
    $root.on("click", ".delete", deleteAccount);

}

$(function() {
    loadIntoDom();
});