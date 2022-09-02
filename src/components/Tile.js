import React, {Component} from 'react';
import {Accordion, Card, Center, Image, Menu, Modal, Text} from "@mantine/core";
import {IconInfoCircle, IconInfoSquare, IconPlus, IconSettings} from "@tabler/icons";

export class Tile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            teamName: ''
        };
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

        const characterDetailsModal = this.props.data ?
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
            <p>No character data found</p>;


        return (
            <>

                {/*//start*/}
                <Menu shadow="md" width={200} position={"right"} withArrow={true}  closeDelay={200}>
                    <Menu.Target>
                        <button className="tile"
                                // onClick={() => {
                                //     this.onTileClick();
                                // }}
                        >
                            <figure className="tile-img">
                                <img src={this.props.image} alt={this.props.title}/>
                            </figure>
                            <h2>{this.props.title}</h2>
                        </button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>{this.props.title}</Menu.Label>
                        <Menu.Item
                            onClick={() => {
                                this.showDetailsModal();
                            }}
                            className="title-menu" icon={<IconInfoSquare size={14}/>}>DETAILS</Menu.Item>
                        <Menu.Item className="title-menu" icon={<IconPlus size={14}/>}>ADD TO TEAM</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                {/*end*/}


                <Modal
                    opened={this.state.modalOpen}
                    onClose={() => this.setState({modalOpen: false})}
                    title={this.props.title.toUpperCase()}
                    withCloseButton={true}
                    overlayBlur={4}
                >
                    <div className="character-details-modal">
                        <p>{characterDetailsModal}</p>
                    </div>
                </Modal>
            </>
        );
    }

    // - open modal when character gets clicked
    showDetailsModal() {
        this.setState({modalOpen: true});
    }
}
