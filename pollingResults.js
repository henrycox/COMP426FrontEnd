async function getfromDB() {

    //console.log('test 2');

    const result = await axios({
        method: 'get',
        url: "https://limitless-spire-89622.herokuapp.com/pollResults",
      });

    //console.log(result);
    $('#root').append(renderGraph(result.data));
}

const renderGraph = function(data) {

    return `<div id="pollresults">
        <h4>Presidential Poll Results:</h4>
        <p>Trump: ${data.president.donaldTrump}</p>
        <p>Biden: ${data.president.joeBiden}</p>
        <h4>Governor</h4>
        <p>Dan Forest: ${data.governor.danForest}</p>
        <p>Roy Cooper: ${data.governor.royCooper}</p>
        <h4>NC Senator</h4>
        <p>Thom Tillis: ${data.NCsenator.thomTillis}</p>
        <p>Cal Cunnignham: ${data.NCsenator.calCunningham}</p>
        <h4>AL Senator</h4>
        <p>Tommy Tuberville: ${data.ALsenator.tommyTuberville}</p>
        <p>Doug Jones: ${data.ALsenator.dougJones}</p>
        <h4>AZ Senator</h4>
        <p>Martha Mcsally: ${data.AZsenator.marthaMcsally}</p>
        <p>Mark Kelly: ${data.AZsenator.markKelly}</p>
        <h4>ME Senator</h4>
        <p>Susan Collins: ${data.MEsenator.susanCollins}</p>
        <p>Sara Gideon: ${data.MEsenator.saraGideon}</p>
        <h4>Approval</h4>
        <p>Yes: ${data.approval.yes}</p>
        <p>No: ${data.approval.no}</p>
    </div>`;
}

const getPoll = function() {

    //console.log('test');

    getfromDB();

}

const returnHome = function() {
    window.location.href = "homePage.html";
}

function loadIntoDOM() {

    const $root = $('#root');

    //get poll data & render poll results
    getPoll();

    //make a listener to return to the home page
    //make once homepage is developed

    $('#body').on("click", ".return", returnHome);
}

$(function() {
    loadIntoDOM();
});