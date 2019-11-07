import React, { Component } from "react";
import TMDB from "./TMDB";
import FilmListing from "./components/FilmListing";
import FilmDetails from "./components/FilmDetails";
import "./App.css";

const { films } = TMDB;

class App extends Component {
  state = {
    films: [...films],
    filmDetail: {}
  };

  // onFaveToggle = (film, fave) => {
  //   console.log("App onFaveToggle", film);
  //   console.log("App onFaveToggle", fave);

  //   // do stuff here
  //   const faveList = [...this.state.faves];
  //   this.setState({
  //     faves: faveList
  //   });
  // };

  onRowClick = film => {
    console.log("App onRowClick", film);
    const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data); // Take a look at what you get back.
        this.setState({
          filmDetail: data
        });
      });
  };

  render() {
    return (
      <div className="film-library">
        <FilmListing
          films={films}
          onFaveToggle={this.onFaveToggle}
          onRowClick={this.onRowClick}
        />
        <FilmDetails film={this.state.filmDetail} />
      </div>
    );
  }
}

export default App;
