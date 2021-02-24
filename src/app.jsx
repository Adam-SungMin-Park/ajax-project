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
      clicked:[],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);

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
    console.log(e.target.textContent)
    this.setState({
      view:e.target.textContent
    })
  }
  handleAnimation(e, index){
    console.log(this.state.titles[index])
    let test = [];
    test.push(this.state.titles[index]);
    test.push(this.state.images[index]);
    this.setState({
      clicked: test,
      view:"animation"
    })
    console.log(this.state)
    console.log(test)
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
              <h2>Animations List</h2>
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
    if(this.state.view === "Favorites"){
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
              <h2>Favorites</h2>
            </div>
          </div>
          <div className="animationTable">
            {this.state.favorites.map((titles, index) => {
              return (

                <div onClick={e=>{this.handleClick(e)}} key={index} className="animationTitles" value = "animation">
                  <h3>{this.state.favorites[index]}</h3>
                  <img src= "./images/arrietty.jpeg"></img>
                </div>

              )
            })}
          </div>
        </div>
      )
    }
    if(this.state.view === "animation"){
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
              <h2>{this.state.clicked[0]} Detail Page</h2>
            </div>
          </div>
          <div className="animationTable">
            {this.state.favorites.map((titles, index) => {
              return (

                <div key={index} className="animationTitles">
                  <h3>{this.state.favorites[index]}</h3>
                  <img src="./images/arrietty.jpeg"></img>
                </div>

              )
            })}
          </div>
        </div>
      )
    }
  }
}
export default App
