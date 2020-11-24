
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
          renderRepresentatives(result.data.officials);
    } else {
        renderRepsAndNotes(result.data.officials, userData.data);
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

async function handleSaveAllPress(event){
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

async function renderRepresentatives(results) {
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
    for(let i=0; i<7; i++){
        let photo = "";
        if(results[i].photoUrl == null) {
            photo = 'https://cdn2.iconfinder.com/data/icons/outlined-set-1/29/no_camera-512.png';
        } else {
            photo = results[i].photoUrl;
        }
        $reps.append(`<li class="reps"><div class="namePhoto"><img class="photo" alt="photo of representative" src ="'+ photo +'"><h1>'+ results[i].name +'</h1><h2>'+ results[i].party +'</h2></div><div class="inputs">
        <div class="autocomplete" style="width:300px;">
        <textarea rows="1" cols="30" class="likes" id="likely'+ i +'" placeholder="How Likely to get your vote?">'+userData.notes[i].likelihood +'</textarea>
        </div>
        <br><textarea rows="4" cols="30" class="notefield" id="notes'+ i +'" placeholder="Record your thoughts:">'+ userData.notes[i].notes +'</textarea><div></li>`);
    }
}

async function renderRepsAndNotes(officials, userData ){
    const $reps = $('ul.reps');
    console.log(userData)
    
    for(let i=0; i<7; i++){
        let photo = "";
        if(officials[i].photoUrl == null) {
            photo = 'https://cdn2.iconfinder.com/data/icons/outlined-set-1/29/no_camera-512.png';
        } else {
            photo = officials[i].photoUrl;
        }
        $reps.append('<li class="reps"><div class="namePhoto"><img class="photo" alt="photo of representative" src ="'+ photo +'"><h1>'+ officials[i].name +'</h1><h2>'+ officials[i].party +'</h2></div><div class="inputs"><textarea rows="1" cols="30" class="likes" id="likely'+ i +'" placeholder="How Likely to get your vote?">'+userData.notes[i].likelihood +'</textarea><br><textarea rows="4" cols="30" class="notefield" id="notes'+ i +'" placeholder="Record your thoughts:">'+ userData.notes[i].notes +'</textarea></div></li>');
    }
}


var likely = ["Definitively", "Very Likely", "Somewhat Likely", "Undecided", "Somewhat Unlikely", "Very Unlikely", "Definitely Not"]


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  } 








$(function() {
    getRepresentatives();
    autocomplete(document.getElementById("likely0"), likely);
    const $body = $('.body');
    $body.on("click",".saveAll", handleSaveAllPress);
});