async function renderHomePage() {
    let newsFeed = await retrieveNewsFeed()
    renderNewsFeed(newsFeed.data.results)
    const $body = $('.body');
    $('.body').on("click", ".reps", handleRepButtonPress)
    $('.body').on("click", ".takePoll", handlePollButtonPress)
    $('.body').on("click", ".takeQuiz", handleQuizButtonPress)
    $('.body').on("click", ".logOut", handleLogoutButtonPress)
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
function handleQuizButtonPress() {
    window.location.href = "./alignmentQuiz.html"
}
    
function handlePollButtonPress() {
    window.location.href = "./polling.html"
}

function handleRepButtonPress() {
    window.location.href = "./Representatives.html"
}

async function retrieveNewsFeed() {
    const result = await axios({
        method: 'get',
        url: 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=SgAae3IpNtJtnG1f2ySeckEkczkNntW0',
      });
    return result

    
}

async function renderNewsFeed(results) {
    const $news = $('ul.news');
    console.log(results[0]);
    for(let i=0; i<3; i++){
        $news.append('<li><a class="sourceLink" href="'+ results[i].short_url +'"><img alt="News source thumbnail" src=" '+ results[i].multimedia[1].url +'"><h1>'+ results[i].title+'</h1></a>');
    }
};

$(function() {
    renderHomePage();
});