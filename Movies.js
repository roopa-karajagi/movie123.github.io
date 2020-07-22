// import 'dotenv'
import React, { Component } from "react";
import axios from "axios";
import "./Movie.css";
import MovieList from "./MovieList/MovieList";
import About from "./About";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movielist: [],
      Title: "",
      isLoading: false,
      movieID:null,
      movieDetails: "Roopa"
    };
  }

  //By Default
  componentDidMount() {
    const apiKey = "b9bd48a6";
    console.log(apiKey);
    let Url = `http://www.omdbapi.com/?apikey=${apiKey}&s=batman&type=movie`;
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movielist: data.Search,
        });
        // console.log(this.state.movielist);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const apiKey = "b9bd48a6";
    axios
      .get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${this.state.Title}&type=movie`
      )
      .then((response) => {
        let data = response.data.Search;
        this.setState({
          movielist: data,
          isLoading: false,
        });
      });
  };

  SelectedMovie=(id)=>{
    //   console.log(event);
      console.log(id);
     axios
     .get(`http://www.omdbapi.com/?apikey=b9bd48a6&i=${id}&type=movie`)
     .then(response=>{
         console.log(response);
         this.setState({
             movieDetails:response.data,
             movieID:id
         },()=>{console.log(this.state.movieID)})
     })
  }

  handleChange = ({ target: { name, value } }) => {
    console.log(value);
    this.setState({
      [name]: value,
    });
  };
  //   getData = () => {
  //     console.log(this.state);
  //     const apiKey = "b9bd48a6";
  //     axios
  //       .get(
  //         `http://www.omdbapi.com/?apikey=${apiKey}&s=${this.state.Title}&type=movie`
  //       )
  //       .then((response) => {
  //         this.setState({
  //           movielist: response.Search,
  //         });
  //       });
  //   };

  render() {
    const { isLoading, Title, movielist,movieDetails,movieID} = this.state;
    // console.log(movielist , Title);
    return (
      <div className="main">
        <h1> Movies Search</h1>
        <form autoComplete="on" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              className="form-control-lg movie-input"
              type="text"
              placeholder="Movie Search"
              name="Title"
              value={Title}
              onChange={(e) => {
                this.handleChange(e);
              }}
            />
            {/* <ul className="auto" style={{display:"none"}}>
                
            </ul> */}
            <button type="submit" className="btn btn-primary btn-lg">
              Search
            </button>
          </div>
        </form>
        {isLoading ? (
          console.log("Loading")
        ) : (
          <MovieList SelectedMovie={this.SelectedMovie} MovieList={movielist} />
        )}
        <About movieDetails={movieDetails} movieID={movieID}/>

        <button className="btn btn-lg btn-primary">Load More...</button>
      </div>
    );
  }
}

export default Movies;
