import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { jobs } from '../jobs';
class App extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      favorites: [1],
      searchfield: ''
    }
  }

  componentDidMount() {
    this.setState({jobs: jobs});
  }

  onSearchChange = (event) => {
    this.setState({
      searchfield: event.target.value
    });
  }

  onStarClicked = (id) => {
    var favs = [];

    if(this.state.favorites.indexOf(id) >= 0) {
      this.favs = this.state.favorites.filter(x => x !== id);
    } else {
      this.favs = this.state.favorites;
      this.favs.concat(id); 
    }
    this.setState({favorites: favs});
    console.log(this.state.favorites);
  }

  render() {
    const { jobs, searchfield } = this.state;
    const withStars = this.state.jobs.map(j => {
      if(!this.state.favorites.includes(j.id)){
        return j;
      }else {
        j.stared = true;
        return j;
      }
    });
    const filteredJobs = withStars.filter(job => {
      return job.keywords.toLowerCase().includes(searchfield.toLowerCase());
    });

    

    if (!jobs.length){
      return <h1 className="f1 light-green code">Loading...</h1>
    } else {
      return (
        <div className="tc">
          <h1 className="f1 light-green code">Bobba job</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList jobs={filteredJobs} onStarClick={this.onStarClicked}/>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;