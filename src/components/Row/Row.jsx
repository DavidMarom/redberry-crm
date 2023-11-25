import React from 'react'
import PropTypes from "prop-types"
import { Container } from "./Row.style"
import { StyleSheetManager } from 'styled-components';

export default function Row({
    width,
    marginright,
    height = "140px",
    margintop = "20px",
    justifycontent,
    children,
}) {

    return (
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'margintop' || prop !== 'marginright'}>

            <Container
                width={width}
                height={height}
                margintop={margintop}
                marginright={marginright}
                justifycontent={justifycontent}
            >
                {children}
            </Container>
        </StyleSheetManager>
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
