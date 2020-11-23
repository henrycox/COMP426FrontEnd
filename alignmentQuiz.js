
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
            if (radios[i].value == "increasemillitaryspending") {
                data.republican += 1;
            } 
            if (radios[i].value == "decreasemillitaryspending") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q2');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "pro-life") {
                data.republican += 1;
            } 
            if (radios[i].value == "pro-choice") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q3');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q4');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q5');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "yes") {
                data.republican += 1;
            } 
            if (radios[i].value == "no") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q6');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q7');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "yes") {
                data.republican += 1;
            } 
            if (radios[i].value == "no") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q8');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
            }            

            break;
        }
    }

    radios = document.getElementsByName('q9');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "no") {
                data.republican += 1;
            } 
            if (radios[i].value == "yes") {
                data.democrat += 1;
            }            

            break;
        }
    }

    /*
    compare republican and democrat votes

    for now, append the answer to the bottom of the page
        (can render a new page once its interacting with the backend)
    */
    if (data.republican > data.democrat) {
        //you are republican

        

    } else {
        //you are democrat
    }


}

function loadIntoDOM() {
    const $root = $('#root');

    //console.log('test');

    //add listener to submit button
    $root.on("click", ".submitquiz", submitQuiz);
}

$(function() {
    loadIntoDOM();
});