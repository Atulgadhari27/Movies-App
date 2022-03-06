import React, { Component } from 'react'
import { movies } from './getMovies.js';

export default class favourites extends Component {


    constructor() {
        super();
        this.state = {
            genres: [],
            currgenre: 'All Genres',
            favourites: [],
            currText: '',
            limit: 5,
            currPage: 1,
        }
    }

    componentDidMount() {
        var genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let temp = [];
        let movie = JSON.parse(localStorage.getItem('movies-app') || "[]");

        movie.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })

        temp.unshift('All Genres');

        this.setState({
            genres: temp,
            favourites: movie,
        })

    }
    handleFavouriteDelete = (movieObj) => {
        let newArr = [];

        newArr = this.state.favourites.filter((m) => m.id != movieObj.id);

        this.setState({
            favourites: newArr,
        })

        localStorage.setItem('movies-app', JSON.stringify(newArr));
    }

    handleGenre = (genre) => {
        // console.log(genre)
        this.setState({
            currgenre: genre,
        })
    }

    sortPopularityAsec = () => {
        let temp = this.state.favourites;
        temp.sort(function (obja, objb) {
            return obja.popularity - objb.popularity;
        })

        this.setState({
            favourites: [...temp],
        })

    }

    sortPopularityDesc = () => {
        let temp = this.state.favourites;
        temp.sort(function (obja, objb) {
            return objb.popularity - obja.popularity;
        })

        this.setState({
            favourites: [...temp],
        })

    }

    sortRatingAsec = () => {
        let temp = this.state.favourites;
        temp.sort(function (obja, objb) {
            return obja.vote_average - objb.vote_average;
        })

        this.setState({
            favourites: [...temp],
        })

    }

    sortRatingDesc = () => {
        let temp = this.state.favourites;
        temp.sort(function (obja, objb) {
            return objb.vote_average - obja.vote_average;
        })

        this.setState({
            favourites: [...temp],
        })

    }
    handlePageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }

    render() {

        // this.setState({
        //     genres : [...temp],
        // })

        let tempFavourites = [];

        if (this.currText === '') {
            tempFavourites = this.state.favourites;
        }
        else {
            tempFavourites = this.state.favourites.filter((movieObj) => {
                let title = movieObj.title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase());
            })
        }

        var genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };


        if (this.state.currgenre !== 'All Genres') {
            tempFavourites = tempFavourites.filter((mObj) => genreids[mObj.genre_ids[0]] === this.state.currgenre)

        }

        let pages = Math.ceil(tempFavourites.length / this.state.limit);
        let pagesarr = [];
        for (let i = 1; i <= pages; i++) {
            pagesarr.push(i);
        }
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit;

        tempFavourites = tempFavourites.slice(si, ei);

        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3">
                            <ul className="list-group favourites-list-group">
                                {
                                    this.state.genres.map((genre) => (
                                        this.state.currgenre == genre ?
                                            <li className="list-group-item " style={{ backgroundColor: '#0D6EFD', fontWeight: 'bold', color: 'white' }} >{genre}</li>
                                            :
                                            <li className="list-group-item " style={{ backgroundColor: 'white', fontWeight: 'bold', color: '#0D6EFD' }} onClick={() => this.handleGenre(genre)}>{genre}</li>

                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <input type="text" style={{ margin: '1rem' }} className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                <input type="number" style={{ margin: '1rem' }} className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />

                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fas fa-sort-up" onClick={this.sortPopularityAsec}></i> Popularity <i className="fas fa-sort-down" onClick={this.sortPopularityDesc}></i></th>
                                        <th scope="col"><i className="fas fa-sort-up" onClick={this.sortRatingAsec}></i> Rating <i className="fas fa-sort-down" onClick={this.sortRatingDesc}></i></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        tempFavourites.map((movieObj) => (
                                            <tr>
                                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{ width: '5rem' }} alt={movieObj.title} />{movieObj.title}</td>
                                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><button type="button" className="btn btn-danger" onClick={() => this.handleFavouriteDelete(movieObj)}>Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {
                                        pagesarr.map((page) => (
                                            <li class="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                        ))
                                    }
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
