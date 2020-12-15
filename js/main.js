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
