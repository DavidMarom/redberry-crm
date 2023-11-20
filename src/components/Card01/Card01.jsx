import React from 'react'
import PropTypes from "prop-types"
import { Container, Column } from "./Card01.style"

export default function Card01({
    width,
    marginright = "20px",
    height = "140px",
    margintop = "20px",
    justifycontent,
    children,
}) {

    return (
        <Container
            width={width}
            height={height}
            margintop={margintop}
            marginright={marginright}
            justifycontent={justifycontent}
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
    margintop: PropTypes.string,
    children: PropTypes.node.isRequired,
    marginright: PropTypes.string,
    justifycontent: PropTypes.string,
}
