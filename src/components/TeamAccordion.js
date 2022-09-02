import React, {Component} from "react";
import {Accordion, ActionIcon, Box} from '@mantine/core';
import {IconTrash} from "@tabler/icons";


export class TeamAccordion extends Component {

    render() {
        const teamsElement = this.props.teams.length > 0 ?
            <Accordion chevronPosition="left" sx={{maxWidth: 400}} mx="auto">
                {
                    this.props.teams.map((result, index) => {
                        return (
                            <Accordion.Item
                                className="accordion" key={index.toString()} value={result+"-item"}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Accordion.Control>{result}</Accordion.Control>
                                    <ActionIcon onClick={() => {
                                        this.onDeleteClicked(index);
                                    }}
                                                size="lg">
                                        <IconTrash size={16}/>
                                    </ActionIcon>
                                </Box>
                                <Accordion.Panel>{result}</Accordion.Panel>
                            </Accordion.Item>
                        );
                    })}
            </Accordion>
            : <div className="no-teams">Create a team above! 👆</div>;

        return (
            <>
                {teamsElement}
            </>
        );
    }


    // const teamsElement = this.props.teams.length>0 ?
    //     this.props.teams.map((result, index) => {
    //         return (
    //             <Accordion.Item
    //                 className="accordion" key={index} value={result} >
    //                 <Box sx={{display: 'flex', alignItems: 'center'}}>
    //                     <Accordion.Control>{result}</Accordion.Control>
    //                     <ActionIcon onClick={() => {
    //                         this.onDeleteClicked(index);
    //                     }}
    //                                 size="lg">
    //                         <IconTrash size={16}/>
    //                     </ActionIcon>
    //                 </Box>
    //                 <Accordion.Panel>{result}</Accordion.Panel>
    //             </Accordion.Item>
    //         );
    //     })
    //     : <h1>{'create a team above! 👆'}</h1>;

    // return (
    //     <Accordion chevronPosition="left" sx={{maxWidth: 400}} mx="auto">
    //         {teamsElement}
    //     </Accordion>
    // );
// }


    onDeleteClicked(teamName) {
        this.props.onDeleteClicked(teamName);
    }

}


