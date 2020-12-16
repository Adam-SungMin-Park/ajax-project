var xhrFilms = new XMLHttpRequest();
xhrFilms.open('GET', 'https://ghibliapi.herokuapp.com/films');
xhrFilms.responseType = 'json';


xhrFilms.addEventListener('load', function () {

  for (var i = 0; i < xhrFilms.response.length; i++) {
    var titleElement = document.createElement('div');
    titleElement.setAttribute('class', 'titles');
    var titles = xhrFilms.response[i].title;
    titleElement.textContent = titles;
    var imageName = titles.toLowerCase().replace(/\s/g, '');
    var titleImage = document.createElement('img');
    titleImage.setAttribute('id',titles)
    titleImage.setAttribute('src', 'images/' + imageName + '.jpeg');
    var $animationTitle = document.querySelector('.animationTitle');
    var titleImages = document.createElement('div');
    titleImages.setAttribute('class', 'imageLocation');
    titleImage.setAttribute('class', 'img');

    $animationTitle.append(titleElement);
    titleElement.append(titleImages);
    titleImages.append(titleImage);
    console.log(xhrFilms.response);
  }
});
xhrFilms.send();



var $container = document.querySelector('.container');
var $animationDetails = document.querySelector('.animationDetails');
var $animationList = document.querySelector('.list2');



window.addEventListener('click',function(){
  var $navBar = document.querySelector('.navBar');
  console.log(event.target);
  $container.className = 'hidden';
  $animationDetails.className = 'view';

   if(event.target.className === "titles"){
    $animationList.textContent = event.target.textContent;
     var $bigAnime = document.createElement('img');
     $bigAnime.setAttribute('src', 'images/' + event.target.textContent.toLowerCase().replace(/\s/g, '')+ '.jpeg');
     $bigAnime.setAttribute('class', 'bigImage');
     $animationDetails.append($bigAnime);
  }
  if(event.target.className === "img"){
    $animationList.textContent = event.target.id;
    var $bigAnime = document.createElement('img');
    $bigAnime.setAttribute('src', event.target.src);
    $bigAnime.setAttribute('class', 'bigImage');
    $animationDetails.append($bigAnime);
  }
  if (event.target.textContent === "Home") {
    $container.className = "container";
    $animationDetails.className = 'hidden';
    var $previousImage = document.querySelector('.hidden');
    $previousImage.lastElementChild.remove();
  }

})
