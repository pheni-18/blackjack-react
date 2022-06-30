import React from 'react';
import { CardInfo, People, GameStatus, Suit, GameResult } from './types';
import { shuffleArray } from './utils';
import { WaitingView, PlayingView } from './components'

export interface HomePageProps {};

export const HomePage: React.FC<HomePageProps> = (props) => {
    const [gameStatus, setGateStatus] = React.useState<GameStatus>('waiting');

    const [deck, setDeck] = React.useState<CardInfo[]>([]);
    const [dealer, setDealer] = React.useState<People>({ hand: [], total: 0, blackjack: false });
    const [player, setPlayer] = React.useState<People>({ hand: [], total: 0, blackjack: false });
    const [gameResult, setGameResult] = React.useState<GameResult | undefined>(undefined);

    const createCards = (): CardInfo[] => {
        const cards: CardInfo[] = [];
        const suits: Suit[] = ['spade', 'heart', 'diamond', 'club'];
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        suits.forEach(suit => {
            numbers.forEach(number => {
                cards.push({
                    suit: suit,
                    number: number,
                    isShow: false,
                });
            })
        });

        return cards;
    };

    const calcNumber = (n: number): number => {
        if (n > 10) {
            return 10;
        }
        
        return n;
    };

    const calcTotal = (cards: CardInfo[]): number => {
        let numbers: number[] = [];
        cards.forEach(c => {
            if (c.isShow) {
                numbers.push(calcNumber(c.number));
            }
        });

        numbers = numbers.sort((a, b) => a - b);
        numbers = numbers.reverse();

        let total: number = 0;
        numbers.forEach(n => {
            if (n == 1 && total + 11 <= 21) {
                total += 11;
                return;
            }
            total += n;
        });
        return total;
    }

    const handleClickStart = React.useCallback(() => {
        const cards: CardInfo[] = createCards();
        let deck = shuffleArray(cards);

        let card = deck.pop() as CardInfo;
        card.isShow = true;
        player.hand.push(card);

        card = deck.pop() as CardInfo;
        card.isShow = true;
        dealer.hand.push(card);

        card = deck.pop() as CardInfo;
        card.isShow = true;
        player.hand.push(card);
        
        card = deck.pop() as CardInfo;
        dealer.hand.push(card);

        player.total = calcTotal(player.hand);
        dealer.total = calcTotal(dealer.hand);

        if (player.total == 21) {
            player.blackjack = true;
            setGateStatus('dealer');
        }
        else {
            setGateStatus('player');
        }

        setDeck([...deck]);
        setPlayer({...player});
        setDealer({...dealer});        
    }, [player, dealer]);

    const handleClickHit = React.useCallback(() => {
        let card = deck.pop() as CardInfo;
        card.isShow = true;
        player.hand.push(card);
        player.total = calcTotal(player.hand);

        setDeck([...deck]);
        setPlayer({...player});

        if (player.total >= 21) {
            handleClickStand();
        }
    }, [deck, player]);

    React.useEffect(() => {
        if (gameStatus != 'dealer') {
            return;
        }

        dealer.hand[dealer.hand.length - 1].isShow = true;
        dealer.total = calcTotal(dealer.hand);
        if (dealer.total == 21) {
            dealer.blackjack = true;
        }
        else {
            while (dealer.total < 17) {
                let card = deck.pop() as CardInfo;
                card.isShow = true;
                dealer.hand.push(card);
                dealer.total = calcTotal(dealer.hand);
            }
        } 

        setDeck([...deck]);
        setDealer({...dealer});
        setGateStatus('finished');
    }, [gameStatus, dealer, deck]);

    React.useEffect(() => {
        if (gameStatus != 'finished') {
            return;
        }

        if (player.total > 21) {
            setGameResult('LOSE');
        }
        else if (dealer.total > 21) {
            setGameResult('WIN');
        }
        else if (player.total == dealer.total) {
            if (player.blackjack && !dealer.blackjack) {
                setGameResult('WIN');
            }
            else if (!player.blackjack && dealer.blackjack) {
                setGameResult('LOSE');
            }
            else {
                setGameResult('DRAW');
            }            
        }
        else if (player.total > dealer.total) {
            setGameResult('WIN');
        }
        else {
            setGameResult('LOSE');
        }
    }, [gameStatus, player, dealer])

    const handleClickStand = React.useCallback(() => {
        setGateStatus('dealer');
    }, []);

    const handleClickMoreGame = React.useCallback(() => {
        setDeck([]);
        setPlayer({ hand: [], total: 0, blackjack: false });
        setDealer({ hand: [], total: 0, blackjack: false });
        setGateStatus('waiting');
    }, []);

    return (
        <>
            {gameStatus == 'waiting' ? (
                <WaitingView
                    onClickStart={handleClickStart}
                />
            ) : (
                <PlayingView
                    gameStatus={gameStatus}
                    player={player}
                    dealer={dealer}
                    onClickHit={handleClickHit}
                    onClickStand={handleClickStand}
                    onClickMoreGame={handleClickMoreGame}
                    gameResult={gameResult}
                />
            )}
        </>
    )
}