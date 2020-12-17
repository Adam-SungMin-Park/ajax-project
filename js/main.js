var xhrFilms = new XMLHttpRequest();
xhrFilms.open('GET', 'https://ghibliapi.herokuapp.com/films');
xhrFilms.responseType = 'json';
var $container = document.querySelector('.container');
var $bigAnime = document.createElement('img');
var $animationDetails = document.querySelector('.animationDetails');
var $animationList = document.createElement('div');
$animationList.setAttribute('class', 'list2');
var $favorite = document.createElement('div');
var $description = document.createElement('div');
var $navBar = document.querySelector('.navBar');
$description.setAttribute('class', 'description');
$favorite.setAttribute('class', 'favorite');
$favorite.textContent = 'Add to Favorite🤍';
var count = 0;

xhrFilms.addEventListener('load', function (event) {

  for (var i = 0; i < xhrFilms.response.length; i++) {
    var titleElement = document.createElement('div');
    titleElement.setAttribute('class', 'titles');
    var titles = xhrFilms.response[i].title;
    titleElement.textContent = titles;
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

window.addEventListener('click', function (event) {

  if (event.target.className === 'titles') {
    $container.className = 'hidden';
    $animationDetails.className = 'animationDetails view';
    $animationList.textContent = event.target.textContent;
    $bigAnime.setAttribute('src', 'images/' + event.target.textContent.toLowerCase().replace(/\s/g, '') + '.jpeg');
    $bigAnime.setAttribute('class', 'bigImage');
    $animationDetails.append($animationList);
    $animationDetails.append($bigAnime);
    count = 0;
  }
  if (event.target.className === 'img') {
    $container.className = 'hidden';
    $animationDetails.className = 'animationDetails view';
    $animationList.textContent = event.target.id;
    $bigAnime.setAttribute('src', event.target.src);
    $bigAnime.setAttribute('class', 'bigImage');
    $animationDetails.append($animationList);
    $animationDetails.append($bigAnime);
    count = 0;
  }
});

window.addEventListener('click', function (event) {
  for (var i = 0; i < xhrFilms.response.length; i++) {
    if (event.target.className === 'titles' && event.target.textContent === xhrFilms.response[i].title) {
      $description.textContent = xhrFilms.response[i].description;
      $animationDetails.append($description);
      $animationDetails.append($favorite);
    }
    if (event.target.className === 'img' && event.target.id === xhrFilms.response[i].title) {
      $description.textContent = xhrFilms.response[i].description;
      $animationDetails.append($description);
      $animationDetails.append($favorite);
    }
  }
});

$navBar.addEventListener('click', function (event) {
  if (event.target.textContent === 'Home') {
    $container.className = 'container';
    $animationDetails.className = 'animationDetails view';
    var $previousImage = document.querySelector('body > div.animationDetails.view>img');
    $previousImage.remove();
    document.querySelector('body > div.animationDetails.view > div.list2').remove();
    document.querySelector('body > div.animationDetails.view > div.description').remove();
    document.querySelector('body > div.animationDetails.view > div.favorite').remove();
  }
});

window.addEventListener('click', function (event) {

  if (event.target.className === 'favorite') {
    count++;
    if (count % 2 === 0) {
      alert('added to favorites!');
      $favorite.textContent = '♥️';
    }
    if (count % 2 === 1) {
      $favorite.textContent = 'Add to Favorite🤍';
    }
  }
});
