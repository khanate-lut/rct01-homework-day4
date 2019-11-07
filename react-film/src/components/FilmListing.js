import React, { Component } from 'react';
import FilmRow from './FilmRow';

class FilmListing extends Component {
  state = {
    filter: 'all',
    films: [...this.props.films],
    faves: []
  }

  handleFilterClick = filter => {
    console.log(`Setting filter to ${filter}`);
    this.setState({ filter })
  }

  handleFaveToggle = (film,fave) => {
    console.log('FilmListing handleFaveToggle:', film.id);
    console.log('FilmListing handleFaveToggle:', fave);
    // this.props.onFaveToggle(film, fave);

    const oldFilms = this.state.films;
    const oldFave = this.state.faves;
    let newFilms = [];
    let newFaves = [];
    
    if (this.state.filter === 'faves') {
      oldFave.forEach((item) => {
        if (item.id !== film.id) {
          console.log(item.id);
          newFaves.push(item);
        }
      });
    } else {
      if (fave) {
        // add fave
        newFaves = [...oldFave];
        newFaves.push(film);
      } else {
        // remove fave
        oldFave.forEach((item) => {
          if (item.id !== film.id) {
            console.log(item.id);
            newFaves.push(film);
          }
        });
      }
    }
    
    oldFilms.forEach((item) => {
      // let exist = false;
      // newFaves.forEach((ex) => {
      //   if (ex.id === item.id) {
      //     exist = true;
      //   }
      // });
      // if (!exist) {
      //   newFilms.push(item);
      // }
      newFilms.push(item);
    });
    
    this.setState( {
      faves: newFaves
    })
  }

  handleRowClick = (film) => {
    console.log('FilmListing handleRowClick');
    this.props.onRowClick(film);
  }

  render() {
    let films;
    if (this.state.filter === 'all') {
      films = this.state.films;
    } else {
      films = this.state.faves;
    }

    const listFilms = films.map((film) => {
      return (
        <FilmRow
        film={film}
        key={film.id}
        onFaveToggle={(fave) => this.handleFaveToggle(film,fave)} 
        onRowClick={ () => this.handleRowClick(film) }
        />
      )
    });
    
    // const allFilms = this.props.films.map(film => <FilmRow key={film.id} film={film} onFaveToggle={ this.handleFaveToggle } />);
    return (
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <div className={"film-list-filter " + (this.state.filter === "all" ? "is-active" : "")} onClick={() => this.handleFilterClick('all')}>
            ALL
      <span className="section-count">{this.state.films.length}</span>
          </div>
          <div className={"film-list-filter " + (this.state.filter === "faves" ? "is-active" : "")} onClick={() => this.handleFilterClick('faves')}>
            FAVES
      <span className="section-count">{ this.state.faves.length}</span>
          </div>
        </div>

        {listFilms}
      </div>
    )
  }
}

export default FilmListing;