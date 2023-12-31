'use client';
import React from 'react'
import PropTypes from "prop-types"
import { Container } from "./Popup.style"

export default function Popup(props: { children: React.ReactNode }) {
    return <Container>{props.children}</Container>
}

Popup.propTypes = {
    children: PropTypes.node.isRequired,
}
