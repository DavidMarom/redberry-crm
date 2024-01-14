"use client";

import React from 'react'
import PropTypes from "prop-types"
import { Container } from "./Btn.style"
import { StyleSheetManager } from 'styled-components';

export default function Btn({
    width,
    height = "70px",
    margintop = "20px",
    children,
    background = "#6FC21C",
    color = "#fff",
    onclick = () => { }
}) {

    return (
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'margintop' || prop !== 'marginright'}>
            <Container
                width={width}
                height={height}
                margintop={margintop}
                background={background}
                color={color}
            >
                <button onClick={onclick} className='row'>{children}</button>
            </Container>
        </StyleSheetManager>
    )
}

Btn.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    margintop: PropTypes.string,
    children: PropTypes.node.isRequired,
    justifycontent: PropTypes.string,
    color: PropTypes.string,
    onclick: PropTypes.func,
}
