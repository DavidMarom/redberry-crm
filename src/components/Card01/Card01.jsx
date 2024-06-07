import React from 'react'
import PropTypes from "prop-types"
import { Container } from "./Card01.style"
import { StyleSheetManager } from 'styled-components';

export default function Card01({
    width,
    marginright = "20px",
    paddingright = "40px",
    paddingleft = "20px",
    height = "140px",
    margintop = "20px",
    justifycontent,
    children,
    backgroundcolor = "#fff"
}) {

    return (
        <StyleSheetManager shouldForwardProp={(prop) => prop !== 'margintop' || prop !== 'marginright' || prop !== 'justifycontent' || prop !== 'backgroundcolor' || prop !== 'paddingright'}>
            <Container
                width={width}
                height={height}
                margintop={margintop}
                marginright={marginright}
                paddingleft={paddingleft}
                paddingright={paddingright}
                justifycontent={justifycontent}
                backgroundcolor={backgroundcolor}
            >
                {children}
            </Container>
        </StyleSheetManager>
    )
}

Card01.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    margintop: PropTypes.string,
    children: PropTypes.node.isRequired,
    marginright: PropTypes.string,
    justifycontent: PropTypes.string,
    backgroundColor: PropTypes.string,
    paddingright: PropTypes.string,
    paddingleft: PropTypes.string
}
