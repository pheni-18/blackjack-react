import React from 'react';
import { CardInfo, People } from './types';
import { Button } from '@mui/material';
import { sleep, shuffleArray } from './utils';
import { WaitingView } from './components'

// TODO: designをいい感じにする

export interface HomePageProps {};

export const HomePage: React.FC<HomePageProps> = (props) => {
    const [gameStatus, setGateStatus] = React.useState<string>('waiting');

    const [deck, setDeck] = React.useState<CardInfo[]>([]);
    const [dealer, setDealer] = React.useState<People>({ hand: [], total: 0, blackjack: false });
    const [player, setPlayer] = React.useState<People>({ hand: [], total: 0, blackjack: false });
    const [gameResult, setGameResult] = React.useState<string>('');

    const createCards = (): CardInfo[] => {
        const cards: CardInfo[] = [];
        const marks = ['spade', 'hurt', 'diamond', 'clover'];
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        marks.forEach(mark => {
            numbers.forEach(number => {
                cards.push({
                    mark: mark,
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

    const handleStart = React.useCallback(() => {
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

    const handleHit = React.useCallback(() => {
        let card = deck.pop() as CardInfo;
        card.isShow = true;
        player.hand.push(card);
        player.total = calcTotal(player.hand);

        setDeck([...deck]);
        setPlayer({...player});

        if (player.total > 21) {
            handleStand();
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
            setGameResult('lose');
        }
        else if (dealer.total > 21) {
            setGameResult('win');
        }
        else if (player.total == dealer.total) {
            if (player.blackjack && !dealer.blackjack) {
                setGameResult('win');
            }
            else if (!player.blackjack && dealer.blackjack) {
                setGameResult('lose');
            }
            else {
                setGameResult('draw');
            }            
        }
        else if (player.total > dealer.total) {
            setGameResult('win');
        }
        else {
            setGameResult('lose');
        }
    }, [gameStatus, player, dealer])

    const handleStand = React.useCallback(() => {
        setGateStatus('dealer');
    }, []);

    const handleMoreGame = React.useCallback(() => {
        setDeck([]);
        setPlayer({ hand: [], total: 0, blackjack: false });
        setDealer({ hand: [], total: 0, blackjack: false });
        setGateStatus('waiting');
    }, []);

    return (
        <>
            {gameStatus == 'waiting' ? (
                <WaitingView
                    onClick={handleStart}
                />
            ) : (
                <>
                    {gameStatus == 'player' && (
                        <>
                            <Button onClick={handleHit}>Hit</Button>
                            <Button onClick={handleStand}>Stand</Button>
                        </>
                    )}
                    {gameStatus == 'finished' && (
                    <>
                        <h3>{gameResult}</h3>
                        <Button onClick={handleMoreGame}>More Game</Button>
                    </>  
                    )}
                    <p>deck</p>
                    <p>残り: {deck.length}</p>
                    <p>dealer</p>
                    {dealer.blackjack && (
                        <h3>Blackjack!</h3>
                    )}
                    {dealer.hand.map(card => {
                        if (card.isShow) {
                            return (
                                <>
                                    <p>{card.mark}</p>
                                    <p>{card.number}</p>
                                    <p>{card.isShow}</p>
                                </>
                            )
                        }
                    })}
                    <p>total: {dealer.total}</p>
                    <br />
                    <p>player</p>
                    {player.blackjack && (
                        <h3>Blackjack!</h3>
                    )}
                    {player.hand.map(card => {
                        return (
                            <>
                                <p>{card.mark}</p>
                                <p>{card.number}</p>
                                <p>{card.isShow}</p>
                            </>
                        )
                    })}
                    <p>total: {player.total}</p>
                    {player.total > 21 && (
                        <p>burst!</p>
                    )}
                </>
            )}
        </>
    )
}