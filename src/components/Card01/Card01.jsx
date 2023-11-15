import React from 'react'
import PropTypes from "prop-types"
import { Container, Column, P, Title } from "./Card01.style"

export default function Card01({
    width = "500px",
    height = "140px",
    darkMode = false,
    children,
}) {

    return (
        <Container
            darkMode={darkMode}
            width={width}
            height={height}
        >
            <Column>
                {children}
            </Column>
        </Container>
    )
}

Card01.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    darkMode: PropTypes.bool,

}
