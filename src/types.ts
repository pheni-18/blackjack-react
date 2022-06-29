
export interface CardInfo {
    suit: Suit;
    number: number;
    isShow: boolean;
}

export interface People {
    hand: CardInfo[];
    total: number;
    blackjack: boolean;
}

const gameStatus = {
    'WAITING': 'waiting',
    'PLAYER': 'player',
    'DEALER': 'dealer',
    'FINISHED': 'finished',
} as const;

export type GameStatus = typeof gameStatus[keyof typeof gameStatus];

const gameResult = {
    'WIN': 'WIN',
    'LOSE': 'LOSE',
    'DRAW': 'DRAW',
} as const;

export type GameResult = typeof gameResult[keyof typeof gameResult];

const suit = {
    'SPADE': 'spade',
    'HEART': 'heart',
    'DIAMOND': 'diamond',
    'CLUB': 'club',
} as const;

export type Suit = typeof suit[keyof typeof suit];


