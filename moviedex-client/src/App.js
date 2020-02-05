import React from 'react';
import './Movie';
import './App.css';
import Movie from './Movie';
import MovieForm from './MovieForm';

class App extends React.Component {

  constructor( props ){
    super( props );

    this.state = {
      peliculas : []
    }
  }

  componentDidMount(){
    fetch('http://localhost:8080/api/moviedex',{method: "GET"})
    .then(response => {
      if(response.ok) {
        response.json()
          .then(responseJSON => {
            this.setState({peliculas: responseJSON});
          })
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  render(){
    return (
      <div>
        <h1>Welcome to the movies web app</h1>
        <div className="contentContainer">
          <div id="movies">
            {this.state.peliculas.map((movie,index) => {
              return(
                <Movie title={movie.title} year={movie.year} rating={movie.rating}/>
              )
            })}
          </div>
          <div id="movieForm">
            <MovieForm/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
