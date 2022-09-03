import {Button, Modal, TextInput, Tooltip} from '@mantine/core';
import {Component} from "react";

export class CreateTeamModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            newTeamName: ''
        };
        this.createTeam = this.createTeam.bind(this);
    }

    render() {

        return (
            <>
                <Modal
                    opened={this.state.modalOpen}
                    onClose={() => this.setState({modalOpen: false})}
                    title={this.props.title}
                    closeOnClickOutside={false}
                    withCloseButton={true}
                    overlayBlur={4}
                >
                    <form onSubmit={this.handleSubmit}>
                    <TextInput
                        mt={'md'}
                        placeholder={'Team Name'}
                        onChange={(event) => this.setState({newTeamName: event.currentTarget.value})}
                        data-autofocus
                    />
                    <Button className="create-team-btn"
                            onClick={() => {
                                this.createTeam();
                            }}
                            type={"submit"}
                    >
                        Create
                    </Button>
                    </form>
                </Modal>

                <Tooltip label="Create A new Team">
                    <Button className="create-team-btn"
                            onClick={() => this.setState({modalOpen: true})}
                    >
                        Create a new team
                    </Button>
                </Tooltip>
            </>
        );

    }

    handleSubmit(event) {
        // this is here so the page is not reloaded when the form is submitted
        event.preventDefault();
    }

    createTeam() {
        if (this.props.currentTeams.findIndex((team) => team.teamName === this.state.newTeamName) >= 0) {
            alert("a team with the name '" + this.state.newTeamName + "' already exists!");
        } else if (this.state.newTeamName === '') {
            alert("Name can not be empty! :)")
        } else {
            this.props.onCreateClick(this.state.newTeamName);
            this.setState({modalOpen: false});
            this.setState({newTeamName: ''});
        }
    }
}

