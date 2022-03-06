import React, { Component } from 'react';
import { movies } from './getMovies';

export default class banner extends Component {

    constructor() {
        super();
    }

    render() {
        let movie = movies.results[0];

        return (
            <>
                {
                    movie === '' ?
                        <div class="d-flex justify-content-center m-5">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        <div className="card banner">
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top banner-img" alt="..." />
                            <div className="banner-box">
                                <h3 className="card-title banner-title">{movie.title}</h3>
                                <p className="card-text banner-text">    {movie.overview}</p>
                            </div>
                        </div>
                }
            </>
        )
    }
}
