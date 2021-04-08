interface IndexibleByString {
    [key: string]: any;
}

export interface Arena extends IndexibleByString {
    name: string;
    city: string;
    stateAbbr: string
}

export interface Team extends IndexibleByString{
    isNBAFranchise: boolean;
    isAllStar: boolean;
    city: string;
    altCityName: string;
    fullName: string;
    tricode: string;
    teamId: string;
    nickname: string;
    teamShortName: string;
    confName: string;
    divName: string;
}

export interface NBAGame extends IndexibleByString {
    gameId: string;
    arena: Arena;
    dateString: string;
    attendance: number;
    homeTeam: Team;
    awayTeam: Team;
    homeTeamScore: number;
    awayTeamScore: number;
}

export interface GameEvent extends IndexibleByString {
    clock: string;
    eventTag: string;
    description: string;
    period: string;
    personId: string;
    playerCode: string;
    teamAbbr: string;
}


export interface TeamStatSheet extends IndexibleByString {
    points: number;
    fgm: number;
    fga: number;
    fgp: number;
    ftm: number;
    fta: number;
    ftp: number;
    tpm: number;
    tpa: number;
    tpp: number;
    offReb: number;
    defReb: number;
    totReb: number;
    assists: number;
    pFouls: number;
    teamFouls: number;
    steals: number;
    turnovers: number;
    blocks: number;
    fastBreakPoints: number;
    pointsInPaint: number;
    pointsOffTurnOvers: number;
}


export interface PlayerStatSheet extends IndexibleByString {
    personId: string;
    firstName: string;
    lastName: string;
    jerseyNumber: number;
    teamId: string;
    position: string;
    points: number;
    minutes: number;
    fgm: number;
    fga: number;
    fgp: number;
    ftm: number;
    fta: number;
    ftp: number;
    tpm: number;
    tpa: number;
    tpp: number;
    offReb: number;
    defReb: number;
    totReb: number;
    assists: number;
    pFouls: number;
    steals: number;
    turnovers: number;
    blocks: number;
    plusMinus: number;
}

