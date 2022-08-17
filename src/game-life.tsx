/* eslint-disable require-jsdoc */
import React from "react";
import CellComponent from "./cell";

interface GameLifeProps {
    height: number;
    width: number;
};

interface GameLifeState {
    table: boolean[][];
}

export default class GameLifeComponent extends React.Component<GameLifeProps, GameLifeState> {
    timer: ReturnType<typeof setTimeout> = null;

    constructor(props: GameLifeProps) {
        super(props);
        this.state = {
            table: this.setGlider(),
        }
        this.timer = this.timeout();
    }

    timeout(): ReturnType<typeof setTimeout> {
        return setTimeout(() => {
            this.setState({
                table: this.recalculateTable(this.state.table),
            })

            setTimeout(() => {
                if(this.timer !== null)
                    this.timer = this.timeout();
            }, 250);
        }, 250);
    }

    recalculateTable(table: boolean[][]): boolean[][] {
        const newTable = this.initTable();

        for(let i = 0; i < table.length; i++) {
            for(let j = 0; j < table[i].length; j++) {
                const countNeighbour = this.getCountNeighbour(i, j);
                if(table[i][j] && countNeighbour >= 2 && countNeighbour <= 3) newTable[i][j] = true;
                else if(countNeighbour === 3) newTable[i][j] = true;
            }
        }

        return newTable;
    }

    getCountNeighbour(i: number, j: number): number {
        let countNeighbour = 0;
        const table = this.state.table;

        for(let _i = i - 1; _i <= i + 1; _i++) {
            for(let _j = j - 1; _j <= j + 1; _j++) {
                let x = _i;
                let y = _j;

                if(x < 0) x = table.length - 1;
                else if(x >= table.length) x = 0;

                if(y < 0) y = table[x].length - 1;
                else if(y >= table[x].length) y = 0;

                if(x != i || y != j) {
                    if(table[x][y])
                        countNeighbour++;
                }
            }
        }

        return countNeighbour;
    }

    setGlider() {
        const table = this.initTable();
        table[0][1] = true;
        table[1][2] = true;
        table[2][0] = true;
        table[2][1] = true;
        table[2][2] = true;
        return table;
    }

    initTable(): boolean[][] {
        const table: boolean[][] = [];

        for(let i = 0; i < this.props.height; i++) {
            table.push([]);
            for(let j = 0; j < this.props.width; j++) {
                table[i].push(false);
            }
        }

        return table;
    }

    onClickStart() {

    }

    render() {
        const result: JSX.Element[] = [];

        for(let i = 0; i < this.state.table.length; i++) {
            let line: JSX.Element[] = [];

            for(let j = 0; j < this.state.table[i].length; j++) {
                line.push(<CellComponent isAlive={this.state.table[i][j]} />)
            }

            result.push(<tr>{line}</tr>)
            line = [];
        }

        const window = <div><table>{result}</table></div>;
        const buttonStart = <button onClick={() => {
            if(this.timer === null) {
                this.timer = this.timeout();
            }
        }}>Start</button>;
        const buttonStop = <button onClick={() => {
            if(this.timer !== null) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        }}>Stop</button>;
        const buttonReset = <button onClick={() => {
            if(this.timer !== null) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.setState({
                table: this.setGlider(),
            });
        }}>Reset</button>;

        return [
            window,
            buttonStart,
            buttonStop,
            buttonReset,
        ];
    }
}