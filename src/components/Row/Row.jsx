import React from 'react'
import PropTypes from "prop-types"
import { Container } from "./Row.style"

export default function Row({
    width,
    marginright,
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
            {children}
        </Container>
    )
}

Row.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    margintop: PropTypes.string,
    children: PropTypes.node.isRequired,
    marginright: PropTypes.string,
    justifycontent: PropTypes.string,
}
