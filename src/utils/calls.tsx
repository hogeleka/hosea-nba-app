import { AxiosPromise } from "axios";
import get from "axios";
import { turnDateToString } from "./utilityFunctions";
import { NBAGame } from "../types/types";

export const getGamesForDate = (date: Date): AxiosPromise<any> => {
    const dateAsString = turnDateToString(date);
    const url = `https://data.nba.net/10s/prod/v1/${dateAsString}/scoreboard.json`
    return get(url);
}

export const getGamePlayByPlay = (game: NBAGame): AxiosPromise<any> => {
    const url = `https://data.nba.net/data/10s/json/cms/noseason/game/${game.dateString}/${game.gameId}/pbp_all.json`
    return get(url);
}

export const getGameBoxScore = (game: NBAGame): AxiosPromise<any> => {
    const url = `https://data.nba.net/prod/v1/${game.dateString}/${game.gameId}_boxscore.json`;
    return get(url);
}