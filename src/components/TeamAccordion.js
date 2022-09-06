import React, {Component} from "react";
import {Accordion, ActionIcon, Avatar, Box} from '@mantine/core';
import {IconTrash} from "@tabler/icons";


export class TeamAccordion extends Component {

    render() {
        const teamsAccordion = this.props.teams?
            <Accordion chevronPosition="left" sx={{maxWidth: 400}} mx="auto">
                {
                    this.props.teams.map((result, index) => {
                        return (
                            <Accordion.Item
                                className="accordion" key={index.toString()} value={result.teamName + "-item"}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Accordion.Control>{result.teamName}</Accordion.Control>
                                    <ActionIcon onClick={() => {
                                        this.onDeleteTeamClicked(index);
                                    }}
                                                size="lg">
                                        <IconTrash size={16}/>
                                    </ActionIcon>
                                </Box>
                                {
                                    result.characters.length > 0 ?
                                        result.characters.map((item, characterIndex) => (
                                                <Accordion.Panel key={characterIndex}>{
                                                    <div className="character-list-item">
                                                        <Avatar src={item.thumbnail.path + '.' + item.thumbnail.extension} alt="it's me"/>
                                                        <div>{item.name}</div>
                                                        <ActionIcon onClick={() => {
                                                            this.onDeleteCharacterClicked(item.id, index);
                                                        }}
                                                                    size="lg">
                                                            <IconTrash size={16}/>
                                                        </ActionIcon>
                                                    </div>
                                                }</Accordion.Panel>
                                            )
                                        ) :
                                        <Accordion.Panel> <span role="img" aria-label="point-left">👈</span> Search and select a character to add to this team! <span role="img" aria-label="search">🔎</span></Accordion.Panel>
                                }
                            </Accordion.Item>
                        );
                    })}
            </Accordion>
            : <div className="no-teams">Create a team above! <span role="img" aria-label="point-up">👆</span> </div>;

        return (
            <>
                {teamsAccordion}
            </>
        );
    }

    onDeleteTeamClicked(teamIndex) {
        this.props.onDeleteTeamClicked(teamIndex);
    }

    onDeleteCharacterClicked(characterId, teamIndex) {
        this.props.onDeleteCharacterClicked(characterId, teamIndex);
    }

}


