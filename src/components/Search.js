import React from 'react';

export default class Search extends React.Component {

    handleSubmit= (e) => {
        e.preventDefault()
        this.props.foodSearch(e.target.search.value)
        e.target.search.value=''
    }

    render() {
        return (
            <div className="search">
                <h1>Search Food</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="search" /><br />
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}