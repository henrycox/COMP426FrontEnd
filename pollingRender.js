
const submitPoll = function(event) {

    event.preventDefault();
    //create data object to submit later in axios request
    let data = {};
    //count to make sure every choice is filled out
    let count = 0;
    let radios = document.getElementsByName('president');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "donaldtrump") {
                data.president = "DonaldTrump";
                count++;
                break;
            } 
            if (radios[i].value == "joebiden") {
                data.president = "JoeBiden";
                count++;
                break;
            }            
        }
    }

    radios = document.getElementsByName('governor');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "danforest") {
                data.governor = "DanForest";
                count++;
                break;
            } 
            if (radios[i].value == "roycooper") {
                data.governor = "RoyCooper";
                count++;
                break;
            }            
        }
    }

    radios = document.getElementsByName('ncsenator');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "thomtillis") {
                data.NCsenator = "ThomTillis";
                count++;
                break;
            } 
            if (radios[i].value == "calcunningham") {
                data.NCsenator = "CalCunningham";
                count++;
                break;
            }            
        }
    }

    radios = document.getElementsByName('alsenator');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "tommytuberville") {
                data.ALsenator = "TommyTuberville";
                count++;
                break;
            } 
            if (radios[i].value == "dougjones") {
                data.ALsenator = "DougJones";
                count++;
                break;
            }            
        }
    }

    radios = document.getElementsByName('azsenator');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "marthamcsally") {
                data.AZsenator = "MarthaMcsally";
                count++;
                break;
            } 
            if (radios[i].value == "markkelly") {
                data.AZsenator = "MarkKelly";
                count++;
                break;
            }            
        }
    }

    radios = document.getElementsByName('mesenator');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "susancollins") {
                data.MEsenator = "SusanCollins";
                count++;
                break;
            } 
            if (radios[i].value == "saragideon") {
                data.MEsenator = "SaraGideon";
                count++;
                break;
            }            
        }
    }

    radios = document.getElementsByName('approval');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "yes") {
                data.approval = "yes";
                count++;
                break;
            } 
            if (radios[i].value == "no") {
                data.approval = "no";
                count++;
                break;
            }            
        }
    }
    if(count >= 7) {
        sendPollToDB(data, event);
    } else {
        alert("Please answer every question before submitting quiz");
    }
}

async function sendPollToDB(data, event) {

    event.preventDefault();

    //redirect to results page first
    window.location.href = "./pollingResults.html";

    const result = await axios({
        method: 'post',
        url: "https://limitless-spire-89622.herokuapp.com/pollEntry",
        data: {
            president: data.president,
            governor: data.governor,
            NCsenator: data.NCsenator,
            ALsenator: data.ALsenator,
            AZsenator: data.AZsenator,
            MEsenator: data.MEsenator,
            approval: data.approval
        },
      });
}

const returnHome = function() {
    window.location.href = "./homePage.html";
}

function loadIntoDOM() {
    //root element
    const $root = $('#root');
    //html page displays the poll for the candidates

    //add listener to submit button
    $root.on("click", ".submitpoll", submitPoll);

    //add listener to home button
    $('#body').on("click", ".return", returnHome);
    $('.body').on("click", ".logOut", handleLogoutButtonPress)
    
}

async function handleLogoutButtonPress() {
    const result = await axios({
        method: 'get',
        url: 'https://limitless-spire-89622.herokuapp.com/logout',
        withCredentials: true,
      });
    window.location.href = "./index.html"
}


$(function() {
    loadIntoDOM();
});