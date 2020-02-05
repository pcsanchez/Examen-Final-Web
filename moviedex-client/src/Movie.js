import React from 'react';

class Movie extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            title: props.title,
            year: props.year,
            rating: props.rating
        }

    }

    render(){
        return(
            <div className="movie">
                <h3>Title: {this.state.title} </h3>
                <h4>Year: {this.state.year} </h4>
                <h4>Rating: {this.state.rating} </h4>
            </div>
        )
    }


}

export default Movie;