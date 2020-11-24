
async function getRepresentatives() {
    const $body = $('.body');
    $('.body').on("click", ".return", handleReturnButtonPress)
    $('.body').on("click", ".logOut", handleLogoutButtonPress)
    let firstTime = false;
    let address = await formURL();

    const result = await axios({
        method: 'get',
        url: address,
      });
    const userData = await axios({
        method: 'get',
        url: 'https://limitless-spire-89622.herokuapp.com/userData',
        withCredentials: true,
      });
    console.log(userData)
    if(userData.data == null) {
          let firstTime = true;
          renderRepresentatives(result.data);
    } else {
        renderRepsAndNotes(result.data, userData.data);
      }
}

function handleReturnButtonPress() {
    window.location.href = "./homePage.html"
}
async function handleLogoutButtonPress() {
    console.log("clicked")
    const result = await axios({
        method: 'get',
        url: 'https://limitless-spire-89622.herokuapp.com/logout',
        withCredentials: true,
      });
    window.location.href = "./index.html"
}

async function formURL() {
    const result = await axios({
        method: 'get',
        url: 'https://limitless-spire-89622.herokuapp.com/userpersonalinfo',
        withCredentials: true,
      });
    address = result.data.address.split(" ")
    city = result.data.city.split(" ")
    state = result.data.state
    zip = result.data.zip
    url = "https://civicinfo.googleapis.com/civicinfo/v2/representatives?address="
    address.forEach(element => {
        url = url + element + '%20'
    });
    city.forEach(element => {
        url = url + element + '%20'
    });
    url = url + state + '%20'
    url = url + zip
    key = '&key=AIzaSyBMSC-3HHlKMug6RgB7_5bthnwm6jLfU68'
    url = url + key
    return url
}

async function handleSaveAllPress(){
    let noteFile = [];
    for(let i=0; i<7; i++){
        let like = document.getElementById("likely" + i);
        let note = document.getElementById("notes" + i);
        if (like.value == "") {
            like.value = "How Likely to get your vote?"
            console.log('got here')
        }
        if (note.value == "") {
            note.value = "Record your thoughts:"
        }
        noteFile.push({likelihood: like.value, notes: note.value});
    }

    let response = await sendNoteMessage(noteFile);

}

async function sendNoteMessage(noteFile) {
    const result = await axios({
        method: 'put',
        url: "https://limitless-spire-89622.herokuapp.com/userData",
        withCredentials: true,
        data:{
            notes: noteFile,
        }
    })
    return result
}

async function renderRepresentatives(data) {
    let noteFile = [];
    for(let i=0; i<7; i++){
        let like = "How Likely to get your vote?"
        let note = "Record your thoughts:"
        noteFile.push({likelihood: like, notes: note});
    }



    const $reps = $('ul.reps');
    const result = await axios({
        method: 'post',
        url: "https://limitless-spire-89622.herokuapp.com/userData",
        withCredentials: true,
        data:{
            notes: noteFile,
        }
    })
    let results = data.officials;
    for(let i=0; i<7; i++){
        let photo = "";
        if(results[i].photoUrl == null) {
            photo = 'https://cdn2.iconfinder.com/data/icons/outlined-set-1/29/no_camera-512.png';
        } else {
            photo = results[i].photoUrl;
        }
        $reps.append('<li class="reps"><div class="namePhoto"><img class="photo" alt="photo of representative" src ="'+ photo +'"><h1>'+ results[i].name +'</h1><h2>'+ data.offices[i].name+'</h2><h2>'+ results[i].party +'</h2></div><div class="inputs"><textarea rows="1" cols="30" class="likes" id="likely'+ i +'" placeholder="How Likely to get your vote?">'+'</textarea><br><textarea rows="4" cols="30" class="notefield" id="notes'+ i +'" placeholder="Record your thoughts:">'+'</textarea><div></li>');
    }
    var likely = ["Definitively", "Very Likely", "Likely", "Somewhat Likely", "Undecided", "Somehwat Unlikely", "Unlikely", "Very Unlikely", "Definitively Not"]
        $("#likely0").autocomplete({
            source: likely
          });
          $("#likely1").autocomplete({
            source: likely
          });
          $("#likely2").autocomplete({
            source: likely
          });
          $("#likely3").autocomplete({
            source: likely
          });
          $("#likely4").autocomplete({
            source: likely
          });
          $("#likely5").autocomplete({
            source: likely
          });
          $("#likely6").autocomplete({
            source: likely
          });
        handleSaveAllPress()

}

async function renderRepsAndNotes(offData, userData ){
    let officials = offData.officials;
    const $reps = $('ul.reps');
    console.log(offData);
    
    for(let i=0; i<7; i++){
        let photo = "";
        if(officials[i].photoUrl == null) {
            photo = 'https://cdn2.iconfinder.com/data/icons/outlined-set-1/29/no_camera-512.png';
        } else {
            photo = officials[i].photoUrl;
        }
        $reps.append('<li class="reps"><div class="namePhoto"><img class="photo" alt="photo of representative" src ="'+ photo +'"><h1>'+ officials[i].name +'</h1><h2>'+ offData.offices[i].name+'</h2><h2>'+ officials[i].party +'</h2></div><div class="inputs"><textarea rows="1" cols="30" class="likes" id="likely'+ i +'" placeholder="How Likely to get your vote?">'+userData.notes[i].likelihood +'</textarea><br><textarea rows="4" cols="30" class="notefield" id="notes'+ i +'" placeholder="Record your thoughts:">'+ userData.notes[i].notes +'</textarea></div></li>');
    }


    var likely = ["Definitively", "Very Likely", "Likely", "Somewhat Likely", "Undecided", "Somewhat Unlikely", "Unlikely", "Very Unlikely", "Definitively Not"]
        console.log("got here")
        $("#likely0").autocomplete({
            source: likely
          });
          $("#likely1").autocomplete({
            source: likely
          });
          $("#likely2").autocomplete({
            source: likely
          });
          $("#likely3").autocomplete({
            source: likely
          });
          $("#likely4").autocomplete({
            source: likely
          });
          $("#likely5").autocomplete({
            source: likely
          });
          $("#likely6").autocomplete({
            source: likely
          });

}

$(function() {
    getRepresentatives();
    const $body = $('.body');
    $body.on("click",".saveAll", handleSaveAllPress);
});