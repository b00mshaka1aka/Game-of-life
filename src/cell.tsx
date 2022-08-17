/* eslint-disable require-jsdoc */
import React from "react";
import { css } from "@emotion/css";

const BaseCell = css`
    margin: 0;
    border: 1px solid #333;
    padding: 10px;
`;

const AliveCell = css`
    margin: 0;
    border: 1px solid #333;
    padding: 10px;
    background-color: #333;
`;

export interface CellProps {
    isAlive: boolean;
}

export default class CellComponent extends React.Component<CellProps, CellProps> {
    constructor(props: CellProps) {
        super(props);
        this.state
    }

    render() {
        return <td className={this.props.isAlive ? AliveCell : BaseCell}></td>;
    }
}