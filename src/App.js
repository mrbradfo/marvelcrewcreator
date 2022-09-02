import React, {Component} from 'react';
import './App.css';
import {ResultsList} from './components/ResultsList';
import {SearchBar} from './components/SearchBar';
import {Loading} from './components/Loading';
import {LoadMore} from './components/LoadMore';
import {MarvelAPI} from './services/MarvelAPI';
import {Error} from "./components/Error";
import {CreateTeamModal} from './components/CreateTeamModal';
import {TeamAccordion} from "./components/TeamAccordion";


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchWord: '',
            results: [],
            canLoadMore: false,
            selectedResult: null,
            teams: []
        };

        this.marvelService = new MarvelAPI();

        this.addNewTeam = this.addNewTeam.bind(this);
        this.removeTeam = this.removeTeam.bind(this);
    }

    render() {
        const resultsElem = this.state.hasError
            ? <Error/>
            : this.state.isLoading
                ? <Loading searchWord={this.state.searchWord}/>
                : (
                    <ResultsList
                        results={this.state.results}
                        searchWord={this.state.searchWord}
                        onResultClick={this.getCharacter}
                    />
                );

        const loadMoreElem = this.state.canLoadMore
            ? <LoadMore onClick={this.getMoreCharacters}/>
            : '';



        const teamsElement =
            // this.state.teams.length>0 ?
                <TeamAccordion
            teams={this.state.teams}
            onDeleteClicked={this.removeTeam}
        />
                // : '';

        return (
            <section className="app">
                <h2 className="text title">MARVEL CREW BUILDER</h2>
                <SearchBar className="search-bar"
                           searchWord={this.state.searchWord}
                           onSubmit={(searchWord) => this.setState({searchWord})}
                />
                <div className="content">
                    <div className="left">
                        <div className="search-result-grid">
                            {resultsElem}
                            {loadMoreElem}
                        </div>
                    </div>
                    <div className="right">
                        <div className="created-teams-list">
                            <div className="text team-title">YOUR TEAMS</div>
                            <CreateTeamModal className="create-btn" title="Choose a team name"
                                             onCreateClick={this.addNewTeam}
                                             currentTeams={this.state.teams}
                            />
                            <div className="current-teams-list">
                                {teamsElement}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const searchWord = this.state.searchWord;
        const prevSearchWord = prevState.searchWord;

        if (this.state.results.length > 0 && searchWord === '') {
            this.setState({
                results: [],
                canLoadMore: false
            })
        }

        if (searchWord && (searchWord !== prevSearchWord)) {
            this.getCharacters();
        }
    }


    getCharacters = () => {
        this.setState({isLoading: true});

        this.marvelService.getCharacters({
            nameStartsWith: this.state.searchWord,
        })
            .then((data) => {
                this.setState({
                    results: data.results,
                    canLoadMore: data.total > data.offset + data.count,
                    isLoading: false,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({hasError: true});
            });
    }

    getCharacter = (id) => {
        this.marvelService.getCharacter(id)
            .then((data) => {
                this.setState({selectedResult: data.results[0]});
            })
            .catch((err) => {
                console.error(err);
                this.setState({hasError: true});
            });
    }

    getMoreCharacters = () => {
        this.marvelService.getCharacters({
            nameStartsWith: this.state.searchWord,
            offset: this.state.results.length,
        })
            .then((data) => {
                this.setState({
                    results: [...this.state.results, ...data.results],
                    canLoadMore: data.total > data.offset + data.count,
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({hasError: true});
            });
    }



    addNewTeam(teamName) {
        console.log("adding team " + teamName);
        // if (this.state.teams.includes(teamName)) {
        //     alert("a team with the name '" + teamName + "' already exists!");
        // } else if (teamName === '') {
        //    alert("Name can not be empty! :)")
        // } else {
            this.setState({
                teams: [...this.state.teams, teamName]
            });
            localStorage.setItem("teams", this.state.teams);
        // }
    }

    removeTeam(index) {
        console.log("removing team " + this.state.teams[index])

        var clonedTeams = [...this.state.teams];

        clonedTeams.splice(index, 1);

        this.setState({
            teams: [...clonedTeams]
        });

    }

}

export default App;
