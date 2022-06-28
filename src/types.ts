
export interface CardInfo {
    mark: string;
    number: number;
    isShow: boolean;
}

export interface People {
    hand: CardInfo[];
    total: number;
    blackjack: boolean;
}
