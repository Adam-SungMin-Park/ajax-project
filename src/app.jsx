import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      titles : [],
      description:[],
      images: ["images/castleinthesky.jpeg", "images/graveofthefireflies.jpeg", "images/myneighbortotoro.jpeg",
        "images/kiki'sdeliveryservice.jpeg", "images/onlyyesterday.jpeg", "images/porcorosso.jpeg", "images/pompoko.jpeg"
        , "images/whisperoftheheart.jpeg", "images/princessmononoke.jpeg", "images/myneighborstheyamadas.jpeg", "images/spiritedaway.jpeg", "images/thecatreturns.jpeg"
        , "images/howl'smovingcastle.jpeg", "images/talesfromearthsea.jpeg", "images/ponyo.jpeg", "images/arrietty.jpeg", "images/fromuponpoppyhill.jpeg"
        , "images/thewindrises.jpeg", "images/thetaleoftheprincesskaguya.jpeg", "images/whenmarniewasthere.jpeg"],
      score:[],
      favorites: [],
      view: "Home",
      clicked:
        {
        title:"",
        img:"",
        description:"",
        score:""
      }
    ,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  removeFavorite(){
    let test = this.state.favorites;
    for (var i = 0 ; i < this.state.favorites.length ; i++){
      if( this.state.clicked.title === this.state.favorites[i].title){
        test.splice(i,1);
        this.setState({
          favorites:test,
          view:"Home"
        })
        console.log(this.state.favorites)
      }
    }
  }






  componentDidMount(){
    let titlesArray = [];
    let descriptionArray = [];
    let scoreArray = [];


  fetch('https://ghibliapi.herokuapp.com/films')
  .then(res => res.json())
  .then(result =>{
    for(var i = 0 ; i < result.length ; i++){

      titlesArray.push(result[i].title)
      descriptionArray.push(result[i].description)
      scoreArray.push(result[i].rt_score)
    }
    this.setState({
      titles: titlesArray,
      description: descriptionArray,
      score: scoreArray
  })
  })
  .catch(err => console.log(err))
  }

  handleClick(e){

    this.setState({
      view:e.target.textContent
    })
  }

  addFavorite(){
    this.setState({
      favorites:this.state.favorites.concat(this.state.clicked),
      view:"Home"
    })

  }
  handleAnimation(e, index){
    console.log(index)
    let test = {};
    test.title = this.state.titles[index];
    test.img = this.state.images[index];
    test.description = this.state.description[index];
    test.score = this.state.score[index];
    test.index = index;
    this.setState({
      clicked:test,
      view: "animation"
    })
    for(var i = 0 ; i< this.state.favorites.length ; i++){
      if(this.state.favorites[i].title===test.title){

        this.setState({
          clicked:test,
          view:"favoriteAnimation"
        })
      }
    }


  }




  render(){
    console.log(this.state)

    if(this.state.view ==="Home"){
      return(
        <div className = "container">
          <div className = "navbar">
            <div className ="home">
              <h1 onClick={e=>{this.handleClick(e)}} className = "Home" >Home</h1>
            </div>
            <div className = "favorites">
              <h1 onClick = {e=>{this.handleClick(e)}} className = "Favorites">Favorites</h1>
            </div>
          </div>
          <div className = "animationList">
            <div className ="animationListText">
              <h1>Animations List</h1>
            </div>
          </div>
          <div className="animationTable">
            {this.state.titles.map((titles,index)=>{
              return (

                  <div onClick = {e=>this.handleAnimation(e, index)} key = {index} value = "animation" className ="animationTitles">
                    <h3>{this.state.titles[index]}</h3>
                    <img className = "mainImage" src={this.state.images[index]}></img>
                  </div>

              )
            })}
          </div>
        </div>
      )
    }
    if(this.state.view === "Favorites" && this.state.favorites.length !==0){
      return(
        <div className="container">
          <div className="navbar">
            <div className="home">
              <h1 onClick={e => { this.handleClick(e) }} value="Home" >Home</h1>
            </div>
            <div className="favorites">
              <h1 onClick={e => { this.handleClick(e) }} value="Favorites">Favorites</h1>
            </div>
          </div>
          <div className="animationList">
            <div className="animationListText">
              <h1>Favorites</h1>
            </div>
          </div>
          <div className="favoritesAnimationTable">
            {this.state.favorites.map((favorite, index) => {
              return (
                <>
                 <h3 className="favoriteHeading">{this.state.favorites[index].title}</h3>

                <div onClick={e=>{this.handleClick(e)}} key={index} className="favoritesAnimationTitles" value = "animation">

                  <div className = "favoritesFirstHalf">

                    <img className ="favoritesImage" src= {this.state.favorites[index].img}></img>
                  </div>
                  <div className = "favoritesSecondHalf">
                    <div className ="detailDescription">
                        <b>Description :</b><br></br>  {this.state.favorites[index].description}
                    </div>
                    <div className = "detailScore">
                      <b>Rotten Tomatoes Score :</b> {this.state.favorites[index].score}
                    </div>
                  </div>
                </div>
                </>
              )
            })}
          </div>
        </div>
      )
    }
    if(this.state.view ==="Favorites" && this.state.favorites.length === 0) {
      return(

        <div className="container">
          <div className="navbar">
            <div className="home">
              <h1 onClick={e => { this.handleClick(e) }} value="Home" >Home</h1>
            </div>
            <div className="favorites">
              <h1 onClick={e => { this.handleClick(e) }} value="Favorites">Favorites</h1>
            </div>
          </div>
            <div className="animationList">
              <div className="animationListText">
                <h1>No Favorites Yet</h1>
              </div>
            </div>
        </div>
      )
    }
    if (this.state.view === "animation" ){
      return(
        <div className="container">
          <div className="navbar">
            <div className="home">
              <h1 onClick={e => { this.handleClick(e) }} value="Home" >Home</h1>
            </div>
            <div className="favorites">
              <h1 onClick={e => { this.handleClick(e) }} value="Favorites">Favorites</h1>
            </div>
          </div>
          <div className="animationList">
            <div className="animationListText">
              <h1>{this.state.clicked.title} Detail Page</h1>
            </div>
          </div>
          <div className="detailAnimationTable">
            <div className ="firstHalf">
              <img className ="detailAnimation" src = {this.state.clicked.img}></img>
            </div>
            <div className = "secondHalf">
              <div className = "detailDescription">
                <b>Description :</b><br></br> {this.state.clicked.description}
              </div>
              <div className = "detailScore">
                <b>Rotten Tomatoes Score :</b> {this.state.clicked.score}
              </div>
            </div>
          </div>
          <div className ="favoriteButton">
            <button className ="addButton" onClick ={this.addFavorite}>Add to Favorite</button>
          </div>
        </div>
      )
    }



      if (this.state.view === "favoriteAnimation") {

      return (
        <div className="container">
          <div className="navbar">
            <div className="home">
              <h1 onClick={e => { this.handleClick(e) }} value="Home" >Home</h1>
            </div>
            <div className="favorites">
              <h1 onClick={e => { this.handleClick(e) }} value="Favorites">Favorites</h1>
            </div>
          </div>
          <div className="animationList">
            <div className="animationListText">
              <h1>{this.state.clicked.title} Detail Page</h1>
            </div>
          </div>
          <div className="detailAnimationTable">
            <div className="firstHalf">
              <img className="detailAnimation" src={this.state.clicked.img}></img>
            </div>
            <div className="secondHalf">
              <div className="detailDescription">
                <b>Description :</b><br></br>{this.state.clicked.description}
              </div>
              <div className="detailScore">
                <b>Rotten Tomatoes Score :</b>{this.state.clicked.score}
              </div>
            </div>
          </div>
          <div className="favoriteButton">
            <button className ="removeButton" onClick={this.removeFavorite}>Remove From Favorite</button>
          </div>
        </div>
      )
    }



  }
}
export default App
