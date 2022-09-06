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
import _ from "lodash";


function getTeams() {
    // getting saved teams
    const saved = localStorage.getItem("teams");
    const initial = JSON.parse(saved);
    return initial || [];
}


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchWord: '',
            results: [],
            canLoadMore: false,
            selectedResult: null,
            teams: getTeams()
        };

        this.marvelService = new MarvelAPI();

        this.addNewTeam = this.addNewTeam.bind(this);
        this.removeTeam = this.removeTeam.bind(this);
        this.addCharacterToTeam = this.addCharacterToTeam.bind(this);
        this.removeCharacterFromTeam = this.removeCharacterFromTeam.bind(this);
        this.getCharacters = this.getCharacters.bind(this);


    }


    render() {
        const searchResults = this.state.hasError ?
            <Error/>
            : this.state.isLoading ?
                <Loading searchWord={this.state.searchWord}/> :
                (
                    <ResultsList
                        results={this.state.results}
                        teams={this.state.teams}
                        searchWord={this.state.searchWord}
                        onResultClick={this.getCharacter}
                        addCharacterToTeam={this.addCharacterToTeam}
                    />
                );

        const loadMoreBtn = this.state.canLoadMore ?
            <LoadMore onClick={this.getMoreCharacters}/> :
            '';


        const teamsAccordion =
            <TeamAccordion
                teams={this.state.teams}
                onDeleteTeamClicked={this.removeTeam}
                onDeleteCharacterClicked={this.removeCharacterFromTeam}
            />

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
                            {searchResults}
                            {loadMoreBtn}
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
                                {teamsAccordion}
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
        } if (searchWord && (searchWord !== prevSearchWord)) {
            this.setState({isLoading: true});
            this.debouncedSearch();
        }
    }



    debouncedSearch = _.debounce(function () {
        this.getCharacters();
    }, 500);

    getCharacters = () => {
        this.marvelService.getCharacters({
            nameStartsWith: this.state.searchWord,
        })
            .then((data) => {
                this.setState({
                    results: data.results,
                    canLoadMore: data.total > data.offset + data.count,
                    isLoading: false,
                    hasError: false
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
                this.setState({
                    selectedResult: data.results[0],
                    hasError: false
                });
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
        let newTeam =
            {
                teamName: teamName,
                characters: [],
            };

        this.setState({teams: [...this.state.teams, newTeam]});
        localStorage.setItem("teams", JSON.stringify([...this.state.teams, newTeam]));
    }

    removeTeam(index) {
        console.log("removing team " + this.state.teams[index].teamName)

        const clonedTeams = [...this.state.teams];

        clonedTeams.splice(index, 1);

        this.setState({
            teams: [...clonedTeams]
        });

        localStorage.setItem("teams", JSON.stringify([...clonedTeams]));
    }

    removeCharacterFromTeam(characterId, teamIndex) {
        console.log("removing character " + characterId + " from team " + this.state.teams[teamIndex].teamName);

        const team = this.state.teams[teamIndex];
        const characterIndex = team.characters.findIndex((char) => char.id === characterId);

        team.characters.splice(characterIndex, 1)

        this.setState({
            ...this.state.teams[teamIndex],
            characters: [...team.characters]
        });
        localStorage.setItem("teams", JSON.stringify(this.state.teams));
    }

    addCharacterToTeam(newCharacterName, teamName) {
        console.log("adding " + newCharacterName.name + " to team " + teamName);

        const index = this.state.teams.findIndex((team) => team.teamName === teamName);

        let updatedTeams = [...this.state.teams];
        updatedTeams[index].characters.push(newCharacterName)


        this.setState({
            teams: [...updatedTeams]
        });
        localStorage.setItem("teams", JSON.stringify([...updatedTeams]));
    }
}

export default App;
