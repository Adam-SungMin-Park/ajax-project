

var xhrFilms = new XMLHttpRequest();
xhrFilms.open('GET', 'https://ghibliapi.herokuapp.com/films');
xhrFilms.responseType = 'json';
var $container = document.querySelector('.container');
var $bigAnime = document.createElement('img');
var $animationDetails = document.querySelector('.animationDetails');
var $animationList = document.createElement('div');
$animationList.setAttribute('class', 'list2');
var $favoritesButton = document.createElement('div');
var $description = document.createElement('div');
var $navBar = document.querySelector('.navBar');
$description.setAttribute('class', 'description');
$favoritesButton.setAttribute('class', 'favoritesButton');


var $favoriteView = document.querySelector('.favorites');
var $animationTitle2Location = document.querySelector('.animationTitle2');

var myStorage = window.localStorage;

xhrFilms.addEventListener('load', function (event) {
  for (var i = 0; i < xhrFilms.response.length-1; i++) {

    var titleElement = document.createElement('div');
    titleElement.setAttribute('class', 'titles');
    var titles = xhrFilms.response[i].title;
    titleElement.textContent = titles;
    data.description.push(xhrFilms.response[i].description);
    data.score.push(xhrFilms.response[i].rt_score);

    var imageName = titles.toLowerCase().replace(/\s/g, '');
    var titleImage = document.createElement('img');
    titleImage.setAttribute('id', titles);
    titleImage.setAttribute('src', 'images/' + imageName + '.jpeg');
    var $animationTitle = document.querySelector('.animationTitle');
    var titleImages = document.createElement('div');
    titleImages.setAttribute('class', 'imageLocation');
    titleImage.setAttribute('class', 'img');
    $animationTitle.append(titleElement);
    titleElement.append(titleImages);
    titleImages.append(titleImage);
  }
});
xhrFilms.send();



window.addEventListener('click',()=> {
  if (event.target.textContent === 'Home') {
    $animationDetails.className = 'animationDetails hidden';
    $favoriteView.className = "favorites hidden"
    $container.className = 'container';
    if(document.querySelectorAll('.favoriteAnimations').length !== 0) {
      for (var i = 0; i < document.querySelectorAll('.favoriteAnimations').length; i++){
        document.querySelectorAll('.favoriteAnimations')[i].remove()
      }
    }

  }

  if (event.target.textContent === 'Favorites' && document.querySelectorAll('.favoriteAnimations').length === 0) {


    $container.className = 'hidden';
    $favoriteView.className = "favorites view"
    $animationDetails.className = "animationDetails hidden"


    for (var i = 0 ; i < data.favorite.length ; i++){
    let $favoriteAnimations = document.createElement('div');
    $favoriteAnimations.setAttribute('class','favoriteAnimations');
    $favoriteView.append($favoriteAnimations);

    let $favoriteAnimationTitle = document.createElement('div');
    $favoriteAnimationTitle.setAttribute('class','favoriteAnimationTitle');
    $favoriteAnimationTitle.textContent = data.favorite[i].title;
    let $column = document.createElement('div');
    $column.setAttribute('class','column');
    let $firstHalf = document.createElement('div');
    $firstHalf.setAttribute('class','firstHalf');
    let $favoriteAnimationImageLocation = document.createElement('div');
    $favoriteAnimationImageLocation.setAttribute('class','favoriteAnimationImageLocation');

    let $favoriteAnimationImage = document.createElement('img');
    $favoriteAnimationImage.setAttribute('src', data.favorite[i].image);
      $favoriteAnimationImage.setAttribute('class', "favoriteAnimationImage");


    let $secondHalf = document.createElement('div');
    $secondHalf.setAttribute('class','secondHalf');
    let $favoriteDescription = document.createElement('div');
    $favoriteDescription.setAttribute('class','favoriteDescription');
    $favoriteDescription.textContent = data.favorite[i].description;
    let $favoriteScore = document.createElement('div');
    $favoriteScore.setAttribute('class','favoriteScore');
    $favoriteScore.textContent = "Rotten Tomato Score : " + data.favorite[i].score


    $favoriteAnimations.append($favoriteAnimationTitle);
    $favoriteAnimations.append($column);
    $column.append($firstHalf);
    $column.append($secondHalf);
    $firstHalf.append($favoriteAnimationImageLocation);
    $favoriteAnimationImageLocation.append($favoriteAnimationImage)
    $secondHalf.append($favoriteDescription);
    $secondHalf.append($favoriteScore);
    }
  }
  if (event.target.textContent === 'Favorites' && document.querySelectorAll('.favoriteAnimations').length === 1) {
    return ''
  }
  if (event.target.className === 'img') {

    $animationDetails.className = 'animationDetails view';
    $favoriteView.className = "favorites hidden"
    $container.className = 'hidden';
    $animationList.textContent = event.target.id;
    $bigAnime.setAttribute('src', event.target.src);
    $bigAnime.setAttribute('class', 'bigImage');


    for (var i = 0; i < xhrFilms.response.length; i++) {
      if (event.target.id === xhrFilms.response[i].title) {
        $description.textContent = "Description : "+ xhrFilms.response[i].description;
        $animationDetails.append($description);
      }
    }



      if (data.title.includes(event.target.id)) {
        $favoritesButton.textContent = "remove from favorite"
        $animationDetails.append($animationList);
        $animationDetails.append($bigAnime);
        $animationDetails.append($description);

      }
      else {
        $favoritesButton.textContent = "Add to Favorite"
        $animationDetails.append($animationList);
        $animationDetails.append($bigAnime);
        $animationDetails.append($description);

      }
    $animationDetails.append($favoritesButton);
  }


  if (event.target.textContent === 'Add to Favorite') {
    $animationDetails.className = 'animationDetails hidden';
    $container.className = 'container';
    for (var i = 0; i < xhrFilms.response.length; i++) {
      if (xhrFilms.response[i].title === $animationList.textContent) {
        data.title.push($animationList.textContent);
        data.image.push($bigAnime.src);
        const test = {
          title: $animationList.textContent,
          image: $bigAnime.src,
          description: $description.textContent,
          score : data.score[i]
        }

        data.favorite.push(test);
      }
    }
    myStorage.setItem('Favorites', JSON.stringify(data))
  }

  if (event.target.textContent === 'remove from favorite') {
    $animationDetails.className = 'animationDetails hidden';
    $favoriteView.className = "favorites hidden"
    $container.className = 'container';
    for(var i = 0 ; i < data.favorite.length ; i++){
      if(document.querySelector('.list2').textContent === data.favorite[i].title){
        data.favorite.splice(i,1);
        data.title.splice(i,1);

      }
    }
  }
})
