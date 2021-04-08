import * as React from "react";
import { NBAGame } from "../../types/types";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeArrayOfNBAGames } from "../../utils/utilityFunctions";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import Grid from '@material-ui/core/Grid';
import { getGamesForDate } from "../../utils/calls";
import { ScoreDisplay } from "./scoreDisplay";


interface Props {
    dateTime: Date;
    onGameSelected: (game: NBAGame | null) => void
}

interface State {
    games: Array<NBAGame>;
    isLoadingGames: boolean;
    errorLoadingGames: boolean;
}

export class GameDayAccordion extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            games: [],
            isLoadingGames: false,
            errorLoadingGames: false,
        }
    }

    componentDidMount = (): void => {
        this.resolvePromises();
    }

    resolvePromises = (): void => {
        this.setState({
            ...this.state,
            isLoadingGames: true
        }, () => {
            getGamesForDate(this.props.dateTime).then((resp) => {
                this.setState({
                    games: makeArrayOfNBAGames(resp.data.games),
                    isLoadingGames: false,
                    errorLoadingGames: false
                })
            }).catch((err) => {
                this.setState({
                    ...this.state,
                    isLoadingGames: false,
                    errorLoadingGames: true,
                    games: []
                })
                
            })
        })
        
    }

    render = (): React.ReactNode => {
        const { dateTime } = this.props;
        const games = this.state.games;
        if (this.state.errorLoadingGames) {
            return (
                <Typography variant="body1">{`Error loading games for ${dateTime.toDateString()}`}</Typography>
            )
        }
        return (
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="body1">{`${dateTime.toDateString()} (${games.length} game${games.length !== 1 ? "s" : ""})`}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            {games.map((game, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Grid item xs={12} onClick={()=> {
                                            this.props.onGameSelected(game)
                                        }}>
                                        <ListItem button>
                                            <ListItemIcon><SportsBasketballIcon/></ListItemIcon>
                                            <ScoreDisplay game={game}/>
                                            </ListItem>
                                        </Grid>
                                    </React.Fragment>
                                )
                            })}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }


    
}

