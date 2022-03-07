import React, { Component } from 'react'
// import { movies } from './getMovies';
import axios from 'axios';

export default class MoviesDisplay extends Component {

    constructor() {
        super();

        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: '',
            favourites: [],
            // prev: '',
        }
    }


    async componentDidMount() {
        // console.log("mount")
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=0a81c700323a078aa9910bfbc69a0447&language=en-US&page=${this.state.currPage}`
        const res = await axios.get(url);
        let data = res.data;
        
        // let olddata = JSON.parse(localStorage.getItem('movies-app') || []);
        
        this.setState({
            movies: data.results,
            // favourites: olddata,
            // prev: 'disabled'
        })

        this.handleFavouriteState()
        // console.log(data);
    }

    changeMovies = async () => {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=0a81c700323a078aa9910bfbc69a0447&language=en-US&page=${this.state.currPage}`
        const res = await axios.get(url);
        let data = res.data
        // if (this.state.currPage == 1) {
        //     this.setState({
        //         prev: 'disabled',
        //     })
        // }
        this.setState({
            movies: data.results,
            // prev: '',
        })
    }

    handleNext = () => {
        let cPage = this.state.currPage;

        if (cPage + 1 <= this.state.parr.length) {
            this.setState({
                currPage: cPage + 1,
                // prev: '',
            }, this.changeMovies)

        }

        else {
            this.setState({
                currPage: cPage + 1,
                parr: [...this.state.parr, cPage + 1],
                // prev: '',
            }, this.changeMovies)

        }
    }

    handlePrevious = () => {
        let cPage = this.state.currPage;
        if (cPage != 1) {
            this.setState({
                currPage: cPage - 1,
            }, this.changeMovies)
        }
    }


    handleSingle = (value) => {
        if(value != this.state.currPage){
            this.setState({ 
                currPage : value,
            }, this.changeMovies)
        }
    }

    handleFavourite = (movie) =>{
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');

        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m) => m.id != movie.id);
        }
        else{
            oldData.push(movie);
        }
        localStorage.setItem('movies-app', JSON.stringify(oldData))

        this.handleFavouriteState();
        console.log(oldData);
    }

    handleFavouriteState = () =>{
        let temp = []
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');

        oldData.map((data) => temp.push(data.id));
        this.setState({
            favourites: [...temp],
        })
    }
    render() {

        // console.log("render");
        var movie = this.state.movies;
        return (
            <>
                {
                    movie.length == 0 ?
                        <div className="d-flex justify-content-center m-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        <div>
                            <h3 className="text-center m-3"><strong>Trending</strong></h3>
                            <div className="movies-box">
                                {
                                    movie.map((movieObj) => (
                                        <div className="card movie-card" style={{ width: '18rem', height: '15rem' }} key={movieObj.id} onMouseEnter={() => { this.setState({ hover: movieObj.id }) }} onMouseLeave={() => { this.setState({ hover: '' }) }}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt={movieObj.title} />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movie-title">{movieObj.title}</h5>
                                            <div className="button-wrapper" style={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>
                                                {
                                                    movieObj.id == this.state.hover &&
                                                    <a className="btn btn-primary movie-button" onClick={() =>{this.handleFavourite(movieObj)}}>{this.state.favourites.includes(movieObj.id) ?'Remove From Favourites' : 'Add to Favourites'}</a>
                                                }
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="m-4">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a className="page-link" onClick={this.handlePrevious}>Previous</a>
                                        </li>
                                        {
                                            this.state.parr.map((value) => (
                                                <li className="page-item" key={value}><a className="page-link" onClick={() =>{this.handleSingle(value)}}>{value}</a></li>
                                            ))
                                        }

                                        <li className="page-item">
                                            <a className="page-link" onClick={this.handleNext}>Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
