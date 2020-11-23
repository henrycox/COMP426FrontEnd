const returnHome = function(event) {
    //console.log('test');
    window.location.href = "homePage.html";
}

function loadIntoDOM() {

    const $root = $('#root');

    $root.on("click", ".return", returnHome);

}

$(function() {
    loadIntoDOM();
});