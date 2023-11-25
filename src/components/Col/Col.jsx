import React from 'react'
import PropTypes from "prop-types"
import { Container } from "./Col.style"
import { StyleSheetManager } from 'styled-components';

export default function Col({
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

Col.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    margintop: PropTypes.string,
    children: PropTypes.node.isRequired,
    marginright: PropTypes.string,
    justifycontent: PropTypes.string,
}
