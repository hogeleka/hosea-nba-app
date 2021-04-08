import * as React from "react"
import { getAllPreviousNDates } from "../../utils/utilityFunctions";
import { GameDayAccordion } from "./gameDayAccordion";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { NBAGame } from "../../types/types";
import { DialogContent, Slider, Typography } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { GameScreen } from "./gameScreen";
import { ScoreDisplay } from "./scoreDisplay";
import { MAX_DAYS, MIN_DAYS, SLIDER_MARKS } from "../../utils/constants";


const allDates = getAllPreviousNDates(MAX_DAYS)


interface State {
    currentGameBeingViewed: NBAGame | null;
    lastNDays: number;
}


export class MainDashboard extends React.Component<{}, State> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            currentGameBeingViewed: null,
            lastNDays: 30
        }
    }

    onGameSelected = (selection: NBAGame | null): void => {
        this.setState({
            currentGameBeingViewed: selection
        })
    }

    handleSliderChange = (newValue: number): void => {
        this.setState({
            ...this.state,
            lastNDays: newValue
        })
    }


    render(): React.ReactNode {
        const currGame = this.state.currentGameBeingViewed;
        return (
            <Container className="width-100">
                <Container style={{margin: "40px"}}>
                    <Typography variant="h6">
                        {`Show NBA games from the last ${this.state.lastNDays} day${this.state.lastNDays === 1 ? "" : "s"}`}
                    </Typography>
                    <Typography variant="body2">
                       {`Use the slider to adjust how far back you would like to go`}
                    </Typography>
                    <Slider
                        defaultValue={30}
                        valueLabelDisplay="auto"
                        step={1}
                        marks={SLIDER_MARKS}
                        min={MIN_DAYS}
                        max={MAX_DAYS}
                        onChange={(_event: object, newValue: number | Array<number>): void => {
                            if (typeof(newValue) === 'number') {
                                this.handleSliderChange(newValue)
                            }
                        }}
                    />
                </Container>
                <Grid container spacing={3}>
                {
                    allDates.map((date, index) => {
                        return (
                            <React.Fragment key = {index}>
                                <Grid item xs={12} sm={4}>
                                    <GameDayAccordion 
                                        dateTime={date}
                                        onGameSelected={this.onGameSelected}
                                    />
                                </Grid>
                            </React.Fragment>
                        )
                    }).slice(0, this.state.lastNDays)
                }
                </Grid>
                <Container className="tab-container">
                    <Dialog
                        maxWidth="lg"
                        fullWidth={true}
                        open={currGame ? true : false}
                        onClose={()=>{this.onGameSelected(null)}}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        <DialogTitle>
                            {currGame &&
                            <Container className="dialog-header">
                                <Typography variant="h6">
                                    <ScoreDisplay game={currGame} useFullName={true}/>
                                </Typography>
                                <Typography variant="body2">
                                    {`${currGame.arena.name}, ${currGame.arena.city}, ${currGame.arena.stateAbbr}`}
                                </Typography>
                                <Typography variant="body2">
                                    {`Attendance: ${currGame.attendance}`}
                                </Typography>
                            </Container>
                            }
                        </DialogTitle>
                        {
                        currGame &&
                        <DialogContent dividers={true}>
                            <GameScreen selectedGame={currGame}/>
                        </DialogContent>
                        }
                    </Dialog>
                </Container>
            </Container>
         
        )
    }
}