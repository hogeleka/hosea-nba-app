import { ValueGetterParams } from "ag-grid-community";
import { PlayerStatSheet, Team } from "../types/types";
import { getPercentageString, splitStringIntoNames } from "./utilityFunctions";

/**Data provided from NBA on https://data.nba.net/prod/v2/2020/teams.json 
 * Would ideally be in some backend DB or something, but it is small enough for the UI to control this
 * List of teams is fixed
*/
const NBATeamData: Array<Team> = [{
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Atlanta",
    "altCityName":"Atlanta",
    "fullName":"Atlanta Hawks",
    "tricode":"ATL",
    "teamId":"1610612737",
    "nickname":"Hawks",
    "urlName":"hawks",
    "teamShortName":"Atlanta",
    "confName":"East",
    "divName":"Southeast"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Boston",
    "altCityName":"Boston",
    "fullName":"Boston Celtics",
    "tricode":"BOS",
    "teamId":"1610612738",
    "nickname":"Celtics",
    "urlName":"celtics",
    "teamShortName":"Boston",
    "confName":"East",
    "divName":"Atlantic"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Brooklyn",
    "altCityName":"Brooklyn",
    "fullName":"Brooklyn Nets",
    "tricode":"BKN",
    "teamId":"1610612751",
    "nickname":"Nets",
    "urlName":"nets",
    "teamShortName":"Brooklyn",
    "confName":"East",
    "divName":"Atlantic"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Charlotte",
    "altCityName":"Charlotte",
    "fullName":"Charlotte Hornets",
    "tricode":"CHA",
    "teamId":"1610612766",
    "nickname":"Hornets",
    "urlName":"hornets",
    "teamShortName":"Charlotte",
    "confName":"East",
    "divName":"Southeast"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Chicago",
    "altCityName":"Chicago",
    "fullName":"Chicago Bulls",
    "tricode":"CHI",
    "teamId":"1610612741",
    "nickname":"Bulls",
    "urlName":"bulls",
    "teamShortName":"Chicago",
    "confName":"East",
    "divName":"Central"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Cleveland",
    "altCityName":"Cleveland",
    "fullName":"Cleveland Cavaliers",
    "tricode":"CLE",
    "teamId":"1610612739",
    "nickname":"Cavaliers",
    "urlName":"cavaliers",
    "teamShortName":"Cleveland",
    "confName":"East",
    "divName":"Central"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Dallas",
    "altCityName":"Dallas",
    "fullName":"Dallas Mavericks",
    "tricode":"DAL",
    "teamId":"1610612742",
    "nickname":"Mavericks",
    "urlName":"mavericks",
    "teamShortName":"Dallas",
    "confName":"West",
    "divName":"Southwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Denver",
    "altCityName":"Denver",
    "fullName":"Denver Nuggets",
    "tricode":"DEN",
    "teamId":"1610612743",
    "nickname":"Nuggets",
    "urlName":"nuggets",
    "teamShortName":"Denver",
    "confName":"West",
    "divName":"Northwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Detroit",
    "altCityName":"Detroit",
    "fullName":"Detroit Pistons",
    "tricode":"DET",
    "teamId":"1610612765",
    "nickname":"Pistons",
    "urlName":"pistons",
    "teamShortName":"Detroit",
    "confName":"East",
    "divName":"Central"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Golden State",
    "altCityName":"Golden State",
    "fullName":"Golden State Warriors",
    "tricode":"GSW",
    "teamId":"1610612744",
    "nickname":"Warriors",
    "urlName":"warriors",
    "teamShortName":"Golden State",
    "confName":"West",
    "divName":"Pacific"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Houston",
    "altCityName":"Houston",
    "fullName":"Houston Rockets",
    "tricode":"HOU",
    "teamId":"1610612745",
    "nickname":"Rockets",
    "urlName":"rockets",
    "teamShortName":"Houston",
    "confName":"West",
    "divName":"Southwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Indiana",
    "altCityName":"Indiana",
    "fullName":"Indiana Pacers",
    "tricode":"IND",
    "teamId":"1610612754",
    "nickname":"Pacers",
    "urlName":"pacers",
    "teamShortName":"Indiana",
    "confName":"East",
    "divName":"Central"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"LA",
    "altCityName":"LA Clippers",
    "fullName":"LA Clippers",
    "tricode":"LAC",
    "teamId":"1610612746",
    "nickname":"Clippers",
    "urlName":"clippers",
    "teamShortName":"LA Clippers",
    "confName":"West",
    "divName":"Pacific"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Los Angeles",
    "altCityName":"Los Angeles Lakers",
    "fullName":"Los Angeles Lakers",
    "tricode":"LAL",
    "teamId":"1610612747",
    "nickname":"Lakers",
    "urlName":"lakers",
    "teamShortName":"L.A. Lakers",
    "confName":"West",
    "divName":"Pacific"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Memphis",
    "altCityName":"Memphis",
    "fullName":"Memphis Grizzlies",
    "tricode":"MEM",
    "teamId":"1610612763",
    "nickname":"Grizzlies",
    "urlName":"grizzlies",
    "teamShortName":"Memphis",
    "confName":"West",
    "divName":"Southwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Miami",
    "altCityName":"Miami",
    "fullName":"Miami Heat",
    "tricode":"MIA",
    "teamId":"1610612748",
    "nickname":"Heat",
    "urlName":"heat",
    "teamShortName":"Miami",
    "confName":"East",
    "divName":"Southeast"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Milwaukee",
    "altCityName":"Milwaukee",
    "fullName":"Milwaukee Bucks",
    "tricode":"MIL",
    "teamId":"1610612749",
    "nickname":"Bucks",
    "urlName":"bucks",
    "teamShortName":"Milwaukee",
    "confName":"East",
    "divName":"Central"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Minnesota",
    "altCityName":"Minnesota",
    "fullName":"Minnesota Timberwolves",
    "tricode":"MIN",
    "teamId":"1610612750",
    "nickname":"Timberwolves",
    "urlName":"timberwolves",
    "teamShortName":"Minnesota",
    "confName":"West",
    "divName":"Northwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"New Orleans",
    "altCityName":"New Orleans",
    "fullName":"New Orleans Pelicans",
    "tricode":"NOP",
    "teamId":"1610612740",
    "nickname":"Pelicans",
    "urlName":"pelicans",
    "teamShortName":"New Orleans",
    "confName":"West",
    "divName":"Southwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"New York",
    "altCityName":"New York",
    "fullName":"New York Knicks",
    "tricode":"NYK",
    "teamId":"1610612752",
    "nickname":"Knicks",
    "urlName":"knicks",
    "teamShortName":"New York",
    "confName":"East",
    "divName":"Atlantic"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Oklahoma City",
    "altCityName":"Oklahoma City",
    "fullName":"Oklahoma City Thunder",
    "tricode":"OKC",
    "teamId":"1610612760",
    "nickname":"Thunder",
    "urlName":"thunder",
    "teamShortName":"Oklahoma City",
    "confName":"West",
    "divName":"Northwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Orlando",
    "altCityName":"Orlando",
    "fullName":"Orlando Magic",
    "tricode":"ORL",
    "teamId":"1610612753",
    "nickname":"Magic",
    "urlName":"magic",
    "teamShortName":"Orlando",
    "confName":"East",
    "divName":"Southeast"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Philadelphia",
    "altCityName":"Philadelphia",
    "fullName":"Philadelphia 76ers",
    "tricode":"PHI",
    "teamId":"1610612755",
    "nickname":"76ers",
    "urlName":"sixers",
    "teamShortName":"Philadelphia",
    "confName":"East",
    "divName":"Atlantic"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Phoenix",
    "altCityName":"Phoenix",
    "fullName":"Phoenix Suns",
    "tricode":"PHX",
    "teamId":"1610612756",
    "nickname":"Suns",
    "urlName":"suns",
    "teamShortName":"Phoenix",
    "confName":"West",
    "divName":"Pacific"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Portland",
    "altCityName":"Portland",
    "fullName":"Portland Trail Blazers",
    "tricode":"POR",
    "teamId":"1610612757",
    "nickname":"Trail Blazers",
    "urlName":"blazers",
    "teamShortName":"Portland",
    "confName":"West",
    "divName":"Northwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Sacramento",
    "altCityName":"Sacramento",
    "fullName":"Sacramento Kings",
    "tricode":"SAC",
    "teamId":"1610612758",
    "nickname":"Kings",
    "urlName":"kings",
    "teamShortName":"Sacramento",
    "confName":"West",
    "divName":"Pacific"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"San Antonio",
    "altCityName":"San Antonio",
    "fullName":"San Antonio Spurs",
    "tricode":"SAS",
    "teamId":"1610612759",
    "nickname":"Spurs",
    "urlName":"spurs",
    "teamShortName":"San Antonio",
    "confName":"West",
    "divName":"Southwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Toronto",
    "altCityName":"Toronto",
    "fullName":"Toronto Raptors",
    "tricode":"TOR",
    "teamId":"1610612761",
    "nickname":"Raptors",
    "urlName":"raptors",
    "teamShortName":"Toronto",
    "confName":"East",
    "divName":"Atlantic"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Utah",
    "altCityName":"Utah",
    "fullName":"Utah Jazz",
    "tricode":"UTA",
    "teamId":"1610612762",
    "nickname":"Jazz",
    "urlName":"jazz",
    "teamShortName":"Utah",
    "confName":"West",
    "divName":"Northwest"
    },
    {
    "isNBAFranchise":true,
    "isAllStar":false,
    "city":"Washington",
    "altCityName":"Washington",
    "fullName":"Washington Wizards",
    "tricode":"WAS",
    "teamId":"1610612764",
    "nickname":"Wizards",
    "urlName":"wizards",
    "teamShortName":"Washington",
    "confName":"East",
    "divName":"Southeast"
    }
]


export const MIN_DAYS = 1;
export const MAX_DAYS = 60;

export const NBA_TEAM_MAP: Map<string, Team> = new Map(NBATeamData.map(team=>[team.teamId, team]));

export const PLAYER_STATS_TABLE = {
    columnDefs: [
        {headerName: "#", field: "jerseyNumber", pinned: 'left'},
        {headerName: "FirstName", field: "firstName", pinned: 'left'},
        {headerName: "LastName", field: "lastName", pinned: 'left'},
        {headerName: "Minutes", field: "minutes"},
        {headerName: "Points", field: "points"},
        {
            headerName: "Field Goals (Percentage)", 
            field: "fgm", 
            cellRenderer: (params: any): string => {
                const playerStats = params.data as PlayerStatSheet
                return getPercentageString(playerStats.fgm, playerStats.fga, playerStats.fgp)
            }
        },
        {
            headerName: "Free Throws (Percentage)", 
            field: "ftm", 
            cellRenderer: (params: any): string => {
                const playerStats = params.data as PlayerStatSheet
                return getPercentageString(playerStats.ftm, playerStats.fta, playerStats.ftp)
            }
        },
        {
            headerName: "3pt Shooting (Percentage)", 
            field: "tpm", 
            cellRenderer: (params: any): string => {
                const playerStats = params.data as PlayerStatSheet
                return getPercentageString(playerStats.tpm, playerStats.tpa, playerStats.tpp)
            }
        },
        {headerName: "Assists", field: "assists"},
        {headerName: "Total Rebounds", field: "totReb"},
        {headerName: "Offensive Rebounds", field: "offReb"},
        {headerName: "Defensive Rebounds", field: "defReb"},
        {headerName: "Steals", field: "steals"},
        {headerName: "Blocks", field: "blocks"},
        {headerName: "+/-", field: "plusMinus"},
        {headerName: "Personal Fouls", field: "pFouls"},
        {headerName: "Turnovers", field: "turnovers"}
    ],
    defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true
    }
}

export const GAME_EVENTS_TABLE = {
    columnDefs: [
        {headerName: "Game clock", field: "clock"},
        {headerName: "Event Description", field: "description"},
        {headerName: "Quarter", field: "period"},
        {headerName: "Key Player Involved", field: "playerCode", valueGetter: (params: ValueGetterParams) => splitStringIntoNames(params.data.playerCode)},
        {headerName: "Team Involved", "field": "teamAbbr"},
    ],
    defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true
    }
}

export const SLIDER_MARKS = [
    {value: 1, label: "1 day"},
    {value: 10, label: "10 days"},
    {value: 20, label: "20 days"},
    {value: 30, label: "30 days"},
    {value: 40, label: "40 days"},
    {value: 50, label: "50 days"},
    {value: 60, label: "60 days"}
]