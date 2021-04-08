import * as React from "react";
import { NBAGame } from "../../types/types";

interface Props {
    game: NBAGame
    useFullName?: boolean;
}

export class ScoreDisplay extends React.Component<Props, {}> {

    render = (): React.ReactNode => {
        const {game, useFullName} = this.props;
        const winningTeam = game.homeTeamScore > game.awayTeamScore ? game.homeTeam : game.awayTeam;
        const displayField = useFullName ? "fullName" : "nickname"
        return (
            <span>
                <span className={game.awayTeam.teamId === winningTeam.teamId ? "bold" : ""}>
                    {`${game.awayTeam[displayField]} (${game.awayTeamScore}) `}
                </span>
                <span>@</span>
                <span className={game.homeTeam.teamId === winningTeam.teamId ? "bold" : ""}>
                {` ${game.homeTeam[displayField]} (${game.homeTeamScore}) `}
                </span>
            </span>
        )
    }
}