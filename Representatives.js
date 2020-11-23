
async function getRepresentatives() {
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

    if(userData.data == null) {
          let firstTime = true;
          renderRepresentatives(result.data.officials);
    } else {
        renderRepsAndNotes(result.data.officials, userData.data);
      }
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

async function handleSaveAllPress(event){
    let noteFile = [];
    for(let i=0; i<7; i++){
        let like = document.getElementById("likely" + i);
        let note = document.getElementById("notes" + i);
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

async function renderRepresentatives(results) {
    const $reps = $('ul.reps');
    const result = await axios({
        method: 'post',
        url: "https://limitless-spire-89622.herokuapp.com/userData",
        withCredentials: true,
        data:{
            notes: " ",
        }
    })
    for(let i=0; i<7; i++){
        $reps.append('<li class="reps"><div class="namePhoto"><img class="photo" alt="photo of representative" src ="'+ results[i].photoUrl+'"<h1>'+ results[i].name +'</h1><h2>'+ results[i].party +'</h2></div><div class="inputs"><input type="textfield" id="likely'+ i +'" placeholder="likelihood"><input type="textfield" id="notes'+ i +'" placeholder="notes"><div></li>');
    }
}

async function renderRepsAndNotes(officials, userData ){
    const $reps = $('ul.reps');
    for(let i=0; i<7; i++){
        $reps.append('<li class="reps"><div class="namePhoto"><img class="photo" alt="photo of representative" src ="'+ officials[i].photoUrl +'"<h1>'+ officials[i].name +'</h1><h2>'+ officials[i].party +'</h2></div><div class="inputs"><input type="textfield" id="likely'+i+'" value="'+ userData.notes[i].likelihood +'"><input type="textfield" id="notes'+ i +'" value="'+ userData.notes[i].notes +'"></div></li>');
    }
}

$(function() {
    getRepresentatives();
    const $body = $('.body');
    $body.on("click",".saveAll", handleSaveAllPress);
});