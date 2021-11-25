import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
//import { jobs } from '../jobs';
import JobsProvider from '../providers/JobsProvider';

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
    this.setState({jobs: []});
    const cookies = new Cookies();
    try {
      const stars = cookies.get('myStars');
      JobsProvider.GetJobs('',this.updateJobs,this);
      
      if(stars){
        this.setState({favorites: stars});
      }
    }
    catch(err) {
      console.log(err);
      this.setState({favorites: []});
    }
  }
  updateJobs(that, jobs){
    that.setState({'jobs': jobs});
    console.log(jobs);
    that.applyFavorites(that);
    that.render();
  }
  applyFavorites(that){
    const withStars  = this.state.jobs.map(j => {
      if(this.state.favorites && this.state.favorites.indexOf(j.job_id)===-1){
        j.stared = false;
        return j;
      }else {
        j.stared = true;
        return j;
      }
    });
    that.setState({'jobs': withStars});
  }
  onSearchChange = (event) => {
    this.setState({
      searchfield: event.target.value
    });
    JobsProvider.GetJobs(event.target.value,this.updateJobs,this);
      
  }

  onStarClicked = (id) => {
    let favs = [];

    if(this.state.favorites && this.state.favorites.indexOf(id) >= 0) {
      favs = this.state.favorites.filter(x => { return x !== id });
    } else if(this.state.favorites){
      favs = this.state.favorites;
      favs = favs.concat(id); 
    } else {
      favs = favs.concat(id);
    }
    this.setState({favorites: favs});
    const cookies = new Cookies();
    cookies.set('myStars', favs);
    this.applyFavorites(this);
    this.render();
  }

  render() {
    const {  searchfield } = this.state;
    if(this.state.jobs) {


    if (!this.state.jobs){
      return <h1 className="f1 light-green code">Loading...</h1>
    } else {
      return (
        <div className="tc">
          <h1 className="f1 light-green code">Bobba job</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList jobs={this.state.jobs} onStarClick={this.onStarClicked}/>
          </Scroll>
        </div>
      );
    }
  }
}
}

export default App;