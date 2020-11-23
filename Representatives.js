
async function getRepresentatives() {
    let firstTime = false
    let address = await formURL()

    console.log(address)
    const result = await axios({
        method: 'get',
        url: address,
      });
    console.log(result)
    const userData = await axios({
        method: 'get',
        url: 'https://limitless-spire-89622.herokuapp.com/userData',
        withCredentials: true,
      });
      if(userData === null) {
          let firstTime = true;
          renderRepresentatives(result.data.officials);
      } else {
          renderRepsAndNotes(result.data.officials, userData);
      }

}

async function formURL() {
    const result = await axios({
        method: 'get',
        url: 'https://limitless-spire-89622.herokuapp.com/userpersonalinfo',
        withCredentials: true,
      });
    console.log(result)
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
    console.log(url)
    return url
}


async function renderRepresentatives(results) {
    const $reps = $('ul.reps');
    console.log(results[0]);
    for(let i=0; i<7; i++){
        $reps.append('<li><img alt="photo of representative" src ="'+ results[i].photo+'"<h1>'+ results[i].name +'</h1><h2>'+ results[i].party +'</h2><input type="textfield" id="likely" placeholder="likelihood"><input type="textfield" id="notes" placeholder="notes"></li>');
    }
}

async function renderRepsAndNotes(results){

}



$(function() {
    getRepresentatives();
});