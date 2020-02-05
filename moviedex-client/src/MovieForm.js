import React from 'react'

class MovieForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            year: 0,
            rating: 0
        }

        
    }

    componentDidMount() {
    }


    render() {
        return(
            <div>
                <h2>Agrega una Pelicula!</h2>
                <form>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title"/>
                    <label htmlFor="year">Year: </label>
                    <input type="text" id="year"/>
                    <label htmlFor="rating">Rating: </label>
                    <input type="text" id="rating"/>
                    <button type="submit" onClick={(event) => {
                        event.preventDefault();
                        const newMovie = {
                            title: document.querySelector('#title').value,
                            year: document.querySelector('#year').value,
                            rating: document.querySelector('#rating').value
                        }
                        const url = "http://localhost:8080/api/moviedex";
                        const settings = {
                            method: "POST",
                            body: JSON.stringify(newMovie)
                        }
                        fetch(url, settings)
                        .then(response => {
                            if(response.ok) {
                                response.json()
                                .then(responseJSON => {
                                    console.log(responseJSON);
                                })
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }}>Add!</button>
                </form>
            </div>
        )
    }
}

export default MovieForm;