import React, {Component} from 'react';
import {Accordion, Button, Card, Center, Image, Menu, Modal, NativeSelect, Text} from "@mantine/core";
import {IconInfoSquare, IconPlus} from "@tabler/icons";

export class Tile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detailModalOpen: false,
            addCharacterModalOpen: false,
            teamName: ''
        };

        this.teamSelection = React.createRef();

    }


    render() {

        const header = <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={this.props.data.thumbnail.path + '.' + this.props.data.thumbnail.extension}
                    height={160}
                    alt="Norway"
                />
                <Center p="sm">
                    <Text>
                        <dt className="title">{this.props.title}</dt>
                        <p>{this.props.data.description}</p>
                    </Text>
                </Center>
            </Card.Section>
        </Card>;

        const comics = <Accordion.Item
            className="accordion" key={"Comics"} value={"Comics"}>
            <Accordion.Control>{"Comics " + this.props.data.comics.available}</Accordion.Control>
            {
                this.props.data.comics.items.map((item, index) => (
                        <Accordion.Panel key={index}>{<li>{item.name}</li>}</Accordion.Panel>
                    )
                )
            }
        </Accordion.Item>;

        const series = <Accordion.Item
            className="accordion" key={"Series"} value={"Series"}>
            <Accordion.Control>{"Series " + this.props.data.series.available}</Accordion.Control>
            {
                this.props.data.series.items.map((item, index) => (
                        <Accordion.Panel key={index}>{<li>{item.name}</li>}</Accordion.Panel>
                    )
                )
            }
        </Accordion.Item>;

        const stories = <Accordion.Item
            className="accordion" key={"Stories"} value={"Stories"}>
            <Accordion.Control>{"Stories " + this.props.data.stories.available}</Accordion.Control>
            {
                this.props.data.stories.items.map((item, index) => (
                        <Accordion.Panel key={index}>{<li>{item.name}</li>}</Accordion.Panel>
                    )
                )
            }
        </Accordion.Item>;

        const events = <Accordion.Item
            className="accordion" key={"Events"} value={"Events"}>
            <Accordion.Control>{"Events " + this.props.data.events.available}</Accordion.Control>
            {
                this.props.data.events.items.map((item, index) => (
                        <Accordion.Panel key={index}>{<li>{item.name}</li>}</Accordion.Panel>
                    )
                )
            }
        </Accordion.Item>;

        const characterDetailsAccordion = this.props.data ?
            <>
                {header}
                <Accordion chevronPosition="left" sx={{maxWidth: 400}} mx="auto">
                    {comics}
                    {series}
                    {stories}
                    {events}
                </Accordion>
            </>
            :
            <p>No character data found!</p>;


        const characterDetailsModal = <Modal
            opened={this.state.detailModalOpen}
            onClose={() => this.setState({detailModalOpen: false})}
            title={this.props.title.toUpperCase()}
            withCloseButton={true}
            overlayBlur={4}
        >
            <div className="character-details-modal">
                {characterDetailsAccordion}
            </div>
        </Modal>;

        const addToTeamModal = <Modal
            opened={this.state.addCharacterModalOpen}
            onClose={() => this.setState({addCharacterModalOpen: false})}
            title={this.props.title.toUpperCase()}
            withCloseButton={true}
            overlayBlur={4}>
            <div className="character-details-modal">
                {
                    <>
                        <div className="add-selection">
                            <NativeSelect
                                data={this.props.teams.map(a => a.teamName)}
                                ref={this.teamSelection}
                                label="Add"
                                description="Add to a team"
                            />

                            <Button
                                className="create-team-btn"
                                onClick={() => {
                                    this.addCharacterToTeam(this.props.data, this.teamSelection.current.value);
                                }}
                            >Add</Button>
                        </div>
                    </>
                }
            </div>
        </Modal>;


        return (
            <>
                <Menu shadow="md" width={250} position={"right"} withArrow={true} closeDelay={200}
                      closeOnItemClick={false}>
                    <Menu.Target>
                        <button className="tile">
                            <div className="tile-img">
                                <img src={this.props.image} alt={this.props.title}/>
                            </div>
                            <h2>{this.props.title}</h2>
                        </button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>{this.props.title}</Menu.Label>
                        <Menu.Item
                            className="title-menu"
                            icon={<IconPlus size={25}/>}
                            onClick={() => {
                                this.showAddToTeamModal();
                            }}
                        >
                            ADD TO TEAM
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                this.showDetailsModal();
                            }}
                            className="title-menu" icon={<IconInfoSquare size={14}/>}>SHOW DETAILS</Menu.Item>

                    </Menu.Dropdown>
                </Menu>
                {addToTeamModal}
                {characterDetailsModal}
            </>
        );
    }

    showDetailsModal() {
        this.setState({detailModalOpen: true});
    }

    showAddToTeamModal() {
        this.props.teams.length>0
            ?
            this.setState({addCharacterModalOpen: true})
            :
            alert("First create a team over on the right! :) 👉");
    }

    addCharacterToTeam(characterData, teamName) {
        this.props.addCharacterToTeam(characterData, teamName);
        this.setState({addCharacterModalOpen:false})
    }
}
