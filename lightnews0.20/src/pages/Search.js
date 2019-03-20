import React from 'react';
import reqwest from 'reqwest';

import Header from '../components/Header/Header'
import SearchContent from '../components/SearchContent/SearchContent'
import Fixedtool from '../components/Fixedtools/Fixedtools'
import Footer from '../components/Footer/Footer'
import config from '../config'
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
        }
    }
    componentDidMount(){
        let keyword = document.location.search.substr(9);
        this.getSearchData(keyword);

    }
    getSearchData = (keyword)=>{
        reqwest({
            url:`${config.url}/api/search?keyword=${keyword}`,
            method:'get',
            contentType: 'application/json',
            success: (res) => {
                this.setState({
                    data: res.data,
                })
            },
        });
    }
    render() {
        return (
            <div className="search-root">
                <Header/>
                <SearchContent sdata={this.state.data}/>
                <Fixedtool/>
                <Footer/>
            </div>
        )
    }
}

export default Search;
