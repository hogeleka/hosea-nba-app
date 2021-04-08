import * as React from "react";
import { GameEvent, NBAGame, PlayerStatSheet, TeamStatSheet } from "../../types/types";
import { getGameBoxScore, getGamePlayByPlay} from "../../utils/calls";
import { getMatchDisplayStringForGame, getStatSheetsForPlayers, makeArrayOfEvents, makeTeamStatSheet } from "../../utils/utilityFunctions";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Container, Grid, Typography } from "@material-ui/core";
import { GameSummaryStats } from "./teamStatsSummary";
import { PlayerStatSheetForTeam } from "./playerStatsForTeam";
import { GameEventsGrid } from "./gameEvents";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div className="tab-panel-container"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
            <Box>
                {children}
            </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface Props {
    selectedGame: NBAGame
}

interface State {
    currentTab: number;
    isLoadingGameData: boolean;
    errorLoadingGameData: boolean;
    gameEvents: Array<GameEvent>;
    homeTeamStats: TeamStatSheet | null;
    awayTeamStats: TeamStatSheet | null;
    homeTeamPlayerStats: Array<PlayerStatSheet>;
    awayTeamPlayerStats: Array<PlayerStatSheet>;

}

export class GameScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            currentTab: 0,
            isLoadingGameData: false,
            errorLoadingGameData: false,
            gameEvents: [],
            homeTeamStats: null,
            awayTeamStats: null,
            homeTeamPlayerStats: [],
            awayTeamPlayerStats: []
        }
    }

    componentDidMount = (): void => {
        this.resolvePromises();
    }

    componentDidUpdate = (prevProps: Props): void => {
        if (prevProps.selectedGame.gameId !== this.props.selectedGame.gameId) {
            this.resolvePromises();
        }
    }

    resolvePromises = (): void => {
        const game = this.props.selectedGame;
        const gameData = [getGamePlayByPlay(game), getGameBoxScore(game)];
        this.setState({
            ...this.state,
            isLoadingGameData: true
        }, ()=> {
            Promise.all(gameData).then((resp) => {
                const events = makeArrayOfEvents(resp[0].data.sports_content.game.play)
                this.setState({
                    ...this.state,
                    gameEvents: events,
                    isLoadingGameData: false,
                    errorLoadingGameData: false,
                    homeTeamStats: makeTeamStatSheet(resp[1].data.stats.hTeam),
                    awayTeamStats: makeTeamStatSheet(resp[1].data.stats.vTeam),
                    homeTeamPlayerStats: getStatSheetsForPlayers(resp[1].data.stats.activePlayers.filter((p: { teamId: string; })=>p.teamId===game.homeTeam.teamId)),
                    awayTeamPlayerStats: getStatSheetsForPlayers(resp[1].data.stats.activePlayers.filter((p: { teamId: string; })=>p.teamId===game.awayTeam.teamId))
                })
            }).catch((err) => {
                this.setState({
                    ...this.state,
                    gameEvents: [],
                    isLoadingGameData: false,
                    errorLoadingGameData: true
                })
            })
        })
        
    }

    handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number): void => {
        this.setState({
            ...this.state,
            currentTab: newValue
        })
    };



    render = (): React.ReactNode => {
        const {selectedGame} = this.props;
        if (this.state.errorLoadingGameData) {
            return (
                <Typography variant="body1">{`Error loading game data for for ${getMatchDisplayStringForGame(selectedGame)}`}</Typography>
            )
        }
        return (
            <Container>
                <Tabs style={{position: "sticky"}}
                    variant = "fullWidth"
                    centered={true}
                    value={this.state.currentTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabChange}
                >
                    <Tab label="Game Summary" {...a11yProps(0)}></Tab>
                    <Tab label={selectedGame.awayTeam.fullName} {...a11yProps(1)}></Tab>
                    <Tab label={selectedGame.homeTeam.fullName} {...a11yProps(2)}></Tab>
                    <Tab label="Key Events" {...a11yProps(3)}></Tab>
                </Tabs>
                <Container>
                    <TabPanel value={this.state.currentTab} index={0}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                {
                                    this.state.homeTeamStats && this.state.awayTeamStats &&
                                    <GameSummaryStats
                                        game={this.props.selectedGame}
                                        homeTeamStats={this.state.homeTeamStats}
                                        awayTeamStats={this.state.awayTeamStats}
                                    />
                                }
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={1}>
                        <PlayerStatSheetForTeam playerStats={this.state.awayTeamPlayerStats}/>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={2}>
                        <PlayerStatSheetForTeam playerStats={this.state.homeTeamPlayerStats}/>
                    </TabPanel>
                    <TabPanel value={this.state.currentTab} index={3}>
                        <GameEventsGrid gameEvents={this.state.gameEvents}/>
                    </TabPanel>
                </Container>
            </Container>
        )
    }
}