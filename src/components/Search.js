import React from 'react';

class Search extends React.Component {

    handleSubmit= (e) => {
        e.preventDefault()
        this.props.foodSearch(e.target.search.value)
        e.target.search.value=''
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="search" /><br />
                    <button type="submit">Search</button>
                </form>
            </div>
        )
    }
}

export default Search;