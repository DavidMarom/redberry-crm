import React from 'react'
import PropTypes from "prop-types"
import { Container, Column } from "./Card01.style"

export default function Card01({
    width = "500px",
    height = "140px",
    children,
}) {

    return (
        <Container
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
    children: PropTypes.node.isRequired,
}
