import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword:""
        }
    }
    componentWillMount(){
        this.setState({
            keyword:document.location.search.substr(9)
        })
    }
    render() {
        return (
            <div className="search-root">
                <p>搜索页{this.state.keyword}</p>
            </div>
        )
    }
}

export default Search;
