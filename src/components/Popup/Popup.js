'use client';
import React from 'react'
import PropTypes from "prop-types"
import { Container } from "./Popup.style"

export default function Popup({ children }) {
    return <Container>{children}</Container>
}

Popup.propTypes = {
    children: PropTypes.node.isRequired,
}
