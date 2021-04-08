import { Arena, GameEvent, NBAGame, PlayerStatSheet, TeamStatSheet } from "../types/types";
import { NBA_TEAM_MAP } from "./constants";

import _ from "lodash";
import { GridReadyEvent } from "ag-grid-community";

const getNumber = (string: string): number => {
    const number = _.toNumber(string);
    return isNaN(number) ? 0 : number;
}

const convertMinsToNumber = (string: string): number => {
    if (string === "0" || string === "" || !string) {
        return 0;
    } else {
        const split = string.split(":");
        const minutes = getNumber(split[0]);
        const seconds = getNumber(split[1]);
        const totalSeconds = seconds + (minutes*60);
        return _.round(totalSeconds/60, 1);
    }
}


export const getAllPreviousNDates = (nDays: number): Array<Date> => {
    const todayDate = new Date();
    const lastNdates = []
    for (let i = 1; i <= nDays; i++) {
        const date = new Date();
        date.setDate(todayDate.getDate() - i)
        lastNdates.push(date)
    }
    return lastNdates;
}


export const turnDateToString = (date: Date): string => {
    const day = date.getDate(); 
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}${month < 10 ? "0" + month : month}${day < 10 ? "0" + day : day}`
}

export const autoSizeGrid = (params: GridReadyEvent): void => {
    const gridColumnApi = params.columnApi;
    const columns = gridColumnApi.getAllColumns()
    gridColumnApi.autoSizeColumns(columns ? columns : [])
}


export const makeArrayOfNBAGames = (rows: Array<any>): Array<NBAGame> => {
    //Handle things like all star games, where both teams are not part of the 30 teams in the roster
    const gamesWithValidTeams = rows.filter(g=>NBA_TEAM_MAP.has(g.hTeam.teamId) && NBA_TEAM_MAP.has(g.vTeam.teamId));
    return gamesWithValidTeams.map((row) => {
        return {
              gameId: row.gameId,
              arena: {name: row.arena.name, city: row.arena.city, stateAbbr: row.arena.stateAbbr} as Arena,
              dateString: row.homeStartDate,
              attendance: getNumber(row.attendance),
              homeTeam: NBA_TEAM_MAP.get(row.hTeam.teamId),
              awayTeam: NBA_TEAM_MAP.get(row.vTeam.teamId),
              homeTeamScore: getNumber(row.hTeam.score),
              awayTeamScore: getNumber(row.vTeam.score)
        } as NBAGame
    })
}


export const makeArrayOfEvents = (rows: Array<any>): Array<GameEvent> => {
    return rows.map((row) => {
        return {
            clock: row.clock === "" ? "12:00" : row.clock,
            eventTag: row.event,
            description: row.description,
            period: row.period,
            personId: row.person_id,
            playerCode: row.player_code === "" ? "No specific player" : row.player_code,
            teamAbbr: row.team_abr
        } as GameEvent
    })
}

export const getMatchDisplayStringForGame = (game: NBAGame | null): string => {
    if (game) {
        return `${game.awayTeam.fullName} (${game.awayTeamScore}) @ ${game.homeTeam.fullName} (${game.homeTeamScore})`
    } else {
        return "";
    }
}

export const eventAsString = (event: GameEvent): string => {
    return `clock: ${event.clock}, player: ${event.playerCode}, description: ${event.description}`;
}

export const makeTeamStatSheet = (data: any): TeamStatSheet => {
    const totals = data.totals;
    const output: TeamStatSheet = {
        points: getNumber(totals.points),
        fgm: getNumber(totals.fgm),
        fga: getNumber(totals.fga),
        fgp: getNumber(totals.fgp),
        ftm: getNumber(totals.ftm),
        fta: getNumber(totals.fta),
        ftp: getNumber(totals.ftp),
        tpm: getNumber(totals.tpm),
        tpa: getNumber(totals.tpa),
        tpp: getNumber(totals.tpp),
        offReb: getNumber(totals.offReb),
        defReb: getNumber(totals.defReb),
        totReb: getNumber(totals.totReb),
        assists: getNumber(totals.assists),
        pFouls: getNumber(totals.pFouls),
        teamFouls: getNumber(totals.team_fouls),
        steals: getNumber(totals.steals),
        turnovers: getNumber(totals.turnovers),
        blocks: getNumber(totals.blocks),
        fastBreakPoints: getNumber(data.fastBreakPoints),
        pointsInPaint: getNumber(data.pointsInPaint),
        pointsOffTurnOvers: getNumber(data.pointsInPaint)
    }
    return output;
}


export const getStatSheetsForPlayers = (players: Array<any>): Array<PlayerStatSheet> => {
    return players.map((row) => {
        return {
            firstName: row.firstName,
            lastName: row.lastName,
            jerseyNumber: getNumber(row.jersey),
            teamId: row.teamId,
            position: row.position_full,
            points: getNumber(row.points),
            minutes: convertMinsToNumber(row.min),
            fgm: getNumber(row.fgm),
            fga: getNumber(row.fga),
            fgp: getNumber(row.fgp),
            ftm: getNumber(row.ftm),
            fta: getNumber(row.fta),
            ftp: getNumber(row.ftp),
            tpm: getNumber(row.tpm),
            tpa: getNumber(row.tpa),
            tpp: getNumber(row.tpp),
            offReb: getNumber(row.offReb),
            defReb: getNumber(row.defReb),
            totReb: getNumber(row.totReb),
            assists: getNumber(row.assists),
            pFouls: getNumber(row.pFouls),
            steals: getNumber(row.steals),
            turnovers: getNumber(row.turnovers),
            blocks: getNumber(row.blocks),
            plusMinus: getNumber(row.plusMinus)
        } as PlayerStatSheet
    })
}


export const getPercentageString = (numerator: number, denominator: number, percentage: number): string => {
    return `${numerator}/${denominator} (${percentage} %)`;
}

export const splitStringIntoNames = (string: string): string => {
    return string.split("_").map(s=>s.charAt(0).toUpperCase() + s.slice(1)).join(" ")
}
