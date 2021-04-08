import { Container } from "@material-ui/core";
import * as React from "react";
import { NBAGame, TeamStatSheet } from "../../types/types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

interface Props {
    game: NBAGame;
    homeTeamStats: TeamStatSheet;
    awayTeamStats: TeamStatSheet;
}

export class GameSummaryStats extends React.Component<Props, {}> {

    getTableRow = (label: string, fieldName: string): React.ReactNode => {
        const homeTeamValue = this.props.homeTeamStats[fieldName];
        const awayTeamValue = this.props.awayTeamStats[fieldName];

        const homeBold = homeTeamValue > awayTeamValue;
        const awayBold = awayTeamValue > homeTeamValue;
        return (
            <TableRow>
                <TableCell align="center"><span className={awayBold ? "bold" : ""}>{this.props.awayTeamStats[fieldName]}</span></TableCell>
                <TableCell align="center"><span>{label}</span></TableCell>
                <TableCell align="center"><span className={homeBold ? "bold" : ""}>{this.props.homeTeamStats[fieldName]}</span></TableCell>
            </TableRow>
        )
    }

    render = (): React.ReactNode => {
        const {game} = this.props;
        return (
            <Container>
                <TableContainer className="stats-table">
                    <Table 
                        aria-label="stats table"
                        stickyHeader={true}
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">{game.awayTeam.nickname}</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">{game.homeTeam.nickname}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.getTableRow("Total points", "points")}
                            {this.getTableRow("Total Rebounds", "totReb")}
                            {this.getTableRow("Total Assists", "assists")}
                            {this.getTableRow("Offensive Rebounds", "offReb")}
                            {this.getTableRow("Defensive Rebounds", "defReb")}
                            {this.getTableRow("Total Team Fouls", "teamFouls")}
                            {this.getTableRow("Total Personal Fouls", "pFouls")}
                            {this.getTableRow("Turnovers", "turnovers")}
                            {this.getTableRow("Steals", "steals")}
                            {this.getTableRow("Blocks", "blocks")}
                            {this.getTableRow("Fast Break Points", "fastBreakPoints")}
                            {this.getTableRow("Points in Paint", "pointsInPaint")}
                            {this.getTableRow("Field Goals Attempted", "fga")}
                            {this.getTableRow("Field Goals Made", "fgm")}
                            {this.getTableRow("3pt Shots Attempted", "tpa")}
                            {this.getTableRow("3pt Shots Made", "tpm")}
                            {this.getTableRow("Free Throws Attempted", "fta")}
                            {this.getTableRow("Free Throws Made", "ftm")}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
    }
}