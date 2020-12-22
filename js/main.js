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
$favorite.setAttribute('class', 'no favorite');
$favorite.setAttribute('id','favorite?');
var $favoriteView = document.querySelector('.favorites');
var $animationTitle2Location = document.querySelector('.animationTitle2');
var count = 0;
$favorite.textContent = 'Add to Favorite🤍';
var myStorage = window.localStorage;

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
  console.log(event.target.id)
  if (event.target.className === 'titles') {
    $container.className = 'hidden';
    $animationDetails.className = 'animationDetails view';
    $animationList.textContent = event.target.textContent;
    $bigAnime.setAttribute('src', 'images/' + event.target.textContent.toLowerCase().replace(/\s/g, '') + '.jpeg');
    $bigAnime.setAttribute('class', 'bigImage');
    $animationDetails.append($animationList);
    $animationDetails.append($bigAnime);

    for (var i = 0; i <data.title.length; i++) {
      if (event.target.textContent !== data.title[i]) {
        count = 0;
        $favorite.className = 'no favorite';
        $favorite.textContent = 'Add to Favorite🤍';
      }
      if(event.target.textContent === data.title[i]){
        count = 1 ;
        $favorite.className = 'favorite';
        $favorite.textContent = '♥️';
      }
    }

  }
  if (event.target.className === 'img') {
    $container.className = 'hidden';
    $animationDetails.className = 'animationDetails view';
    $animationList.textContent = event.target.id;
    $bigAnime.setAttribute('src', event.target.src);
    $bigAnime.setAttribute('class', 'bigImage');
    $animationDetails.append($animationList);
    $animationDetails.append($bigAnime);

    for (var i = 0; i < data.title.length; i++) {
      if (data.title[i]!==event.target.id) {
        count = 0;
        $favorite.className = 'no favorite';
        $favorite.textContent = 'Add to Favorite🤍';
      }
      if (data.title[i] === event.target.id) {
        count =1 ;
        $favorite.className = 'favorite';
        $favorite.textContent = '♥️';
      }
    }

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
    $animationDetails.className = 'animationDetails hidden';
    $favoriteView.className = "favorites hidden"
    var $previousImage = document.querySelector('.bigImage');
    if ($previousImage.length > 1 && document.querySelector('.list2').length > 1 && document.querySelector('.description') > 1 && document.getElementById('favorite?')<1){
      $previousImage.remove();
      document.querySelector('.list2').remove();
      document.querySelector('.description').remove();
      document.getElementById('favorite?').remove();
    }
    var $favoriteReset = document.getElementsByClassName('animationInfo2')
      for (var i = 0 ; i < $favoriteReset.length ; i ++){
        if($favoriteReset.length >0 ){
          $favoriteReset[i].remove();
        }
      }
  }

  if (event.target.textContent === 'Favorites' && document.querySelectorAll('.animationInfo2').length < 1) {
    $container.className = 'hidden';
    $favoriteView.className = "favorites view"
    $animationDetails.className = "animationDetails hidden"
    var $animationInfo2 = document.createElement('div');
    $animationInfo2.setAttribute('class','animationInfo2');
    $favoriteView.append($animationInfo2);
    var $animationTitle2 = document.createElement('div');
    $favoriteView.append($animationInfo2);
    $animationTitle2.setAttribute('class','animationTitle2');
    $animationInfo2.append($animationTitle2);

    for (var i = 0; i < data.title.length; i++) {
    var $favoriteTitle = document.createElement('div');
    $favoriteTitle.setAttribute('class', 'title')
    $favoriteTitle.setAttribute('id','favoriteTitle_'+i);
    $favoriteTitle.textContent = data.title[i]
    $animationTitle2.append($favoriteTitle);
    var $favoriteImageLocation = document.createElement('div');
    $favoriteImageLocation.setAttribute('class', 'favoriteImageLocation');
    $favoriteImageLocation.setAttribute('id', data.title[i]);
    var $favoriteImage = document.createElement('img')
    $favoriteImage.setAttribute('class', 'favoriteImg');
      $favoriteImage.setAttribute('src', data.image[i]);
      $favoriteImageLocation.append($favoriteImage);
      $favoriteTitle.append($favoriteImageLocation);
    }

    if (event.target.textContent === 'Home'){
      for (var i = 0; i < $favoriteTitle.length; i++) {
        $favoriteTitle[i].remove();
      }
    }
  }
   });

window.addEventListener('click', function (event) {

  if (event.target.className === 'no favorite' || event.target.className === 'favorite') {
      count++;

    if (count % 2 === 1) {
      alert('added to favorites!');
      $favorite.textContent = '♥️';
      $favorite.className = "favorite"
      for(var i = 0 ; i < data.title.length ; i ++){
        if($animationList.textContent === data.title[i]){
          alert('Already in the Favorite!');
          return'';
        }
      }
      for (var i = 0; i < xhrFilms.response.length; i++) {
        if (xhrFilms.response[i].title === $animationList.textContent) {
          data.title.push($animationList.textContent);
          data.image.push($bigAnime.src);

        }
      }
    }
    if (count % 2 === 0 || count === 0) {
      $favorite.textContent = 'Add to Favorite🤍';
      $favorite.className = "no favorite"

      for (var i = 0; i < data.title.length; i++) {
          if (data.title[i] === $animationList.textContent) {
            data.title.splice(i, 1);
            data.image.splice(i,1);

          }
      }
    }
  }
    myStorage.setItem('Favorites', JSON.stringify(data))
});
