import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { jobs } from '../jobs';
class App extends Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      favorites: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    this.setState({jobs: jobs});
    const cookies = new Cookies();
    try {
      const stars = cookies.get('myStars');
      if(stars){
        this.setState({favorites: stars});
      }
    }
    catch(err) {
      console.log(err);
      this.setState({favorites: []});
    }
  }

  onSearchChange = (event) => {
    this.setState({
      searchfield: event.target.value
    });
  }

  onStarClicked = (id) => {
    let favs = [];

    if(this.state.favorites && this.state.favorites.indexOf(id) >= 0) {
      favs = this.state.favorites.filter(x => x !== id);
    } else if(this.state.favorites){
      favs = this.state.favorites;
      favs = favs.concat(id); 
    } else {
      favs = favs.concat(id);
    }
    this.setState({favorites: favs});
    const cookies = new Cookies();
    cookies.set('myStars', favs);
  }

  render() {
    const { jobs, searchfield } = this.state;
    const withStars = this.state.jobs.map(j => {
      if(this.state.favorites && this.state.favorites.indexOf(j.id)===-1){
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