import React from 'react';

export default class Search extends React.Component {

    state = {
        toggle: false
    }

    handleSubmit= (e) => {
        e.preventDefault()
        if (e.target.search.value) {
            this.props.foodSearch(e.target.search.value)
        } else {
            this.setState({ toggle: true })
        }
        
        e.target.search.value=''
    }

    render() {
        return (
            <div className="search">
                <h3>Search Food</h3>
                <form onSubmit={this.handleSubmit}>
                    <input className="no-outline" type="text" name="search" placeholder="Enter Food Type" autocomplete="off" /><br />
                    <button className="button no-outline" type="submit">Search</button>
                </form><br/>
                {this.state.toggle ? "Enter a food type into the search!" : null}
            </div>
        )
    }
}