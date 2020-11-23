
const submitQuiz = function(event) {
    //console.log('test');

    //event.preventDefault();

    let data = {};
    data.republican = 0;
    data.democrat = 0;

    let radios = document.getElementsByName('q1');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "increasemilitaryspending") {
                data.republican += 1;
                //console.log(radios[i].value);
                break;
            } 
            if (radios[i].value == "decreasemilitaryspending") {
                data.democrat += 1;
                //console.log(radios[i].value);
                break;
            }            
        }
    }

    radios = document.getElementsByName('q2');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "pro-life") {
                data.republican += 1;
                //console.log(radios[i].value);
                break;
            } 
            if (radios[i].value == "pro-choice") {
                data.democrat += 1;
                //console.log(radios[i].value);
                break;
            }            
        }
    }

    radios = document.getElementsByName('q3');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
                //console.log(radios[i].value);
                break;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
                //console.log(radios[i].value);
                break;
            }            
        }
    }

    radios = document.getElementsByName('q4');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
                //console.log(radios[i].value);
                break;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
                //console.log(radios[i].value);
                break;
            }            
        }
    }

    radios = document.getElementsByName('q5');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "yes") {
                data.republican += 1;
                break;
            } 
            if (radios[i].value == "no") {
                data.democrat += 1;
                break;
            }            
        }
    }

    radios = document.getElementsByName('q6');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
                break;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
                break;
            }            
        }
    }

    radios = document.getElementsByName('q7');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "yes") {
                data.republican += 1;
                break;
            } 
            if (radios[i].value == "no") {
                data.democrat += 1;
                break;
            }            
        }
    }

    radios = document.getElementsByName('q8');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
                break;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
                break;
            }            
        }
    }

    radios = document.getElementsByName('q9');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
                break;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
                break;
            }            
        }
    }

    console.log(data);

    /*
    compare republican and democrat votes

    for now, append the answer to the bottom of the page
        (can render a new page once its interacting with the backend)
    */
    if ((data.republican + data.democrat == 9) && data.republican > data.democrat) {
        
        //you are republican
        //make async function for axios + redirect to republican.html
        republican();
        

    } else if ((data.republican + data.democrat == 9) && data.democrat > data.republican) {

        //you are democrat
        //make async function for axios + redirect to democrat.html
        democrat();

    } else {
        //alert telling user to fill out all questions
        alert("Please answer every question before submitting quiz");
    }
}

async function republican() {

    //axios request
    const result = await axios({
        method: 'put',
        url: "https://limitless-spire-89622.herokuapp.com/updateAffiliation",
        withCredentials: true,
        data: {
            pa: "Republican"
        },
      });

    /*
    const test = await axios({
        method: 'get',
        url: "https://limitless-spire-89622.herokuapp.com/userPersonalInfo",
        withCredentials: true
    });
    
    console.log(test);
    */

    //changing page
    window.location.href = "republican.html";
}

async function democrat() {
    
    //axios request
    const result = await axios({
        method: 'put',
        url: "https://limitless-spire-89622.herokuapp.com/updateAffiliation",
        withCredentials: true,
        data: {
            pa: "Democrat"
        },
      });

    /*
    const test = await axios({
        method: 'get',
        url: "https://limitless-spire-89622.herokuapp.com/userPersonalInfo",
        withCredentials: true
    });
    
    console.log(test);
    */

    //changing page
    window.location.href = "democrat.html";
}

const returnHome = function() {
    window.location.href = "homePage.html";
}

function loadIntoDOM() {
    const $root = $('#root');

    //console.log('test');

    //add listener to submit button
    $root.on("click", ".submitquiz", submitQuiz);

    //add listener to home button
    $root.on("click", ".return", returnHome);
}

$(function() {
    loadIntoDOM();
});