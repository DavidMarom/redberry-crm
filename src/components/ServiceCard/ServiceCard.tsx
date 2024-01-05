"use client";
import React from 'react'
import { Container, InfoContainer, ImageContainer, TextContainer, TitleContainer } from "./ServiceCard.style"
import PropTypes from "prop-types"
import { shortText } from '@/utils/utils';
import { Button } from '@nextui-org/react';
import usePopupStore from '@/store/popup';

type ServiceCardType = {
    img: string,
    text: string,
    title: string,
}

export default function ServiceCard(props: ServiceCardType) {
    const { title, text, img } = props;

    if (title === undefined || title === null) return <></>;
    // const { img, text, title } = data;
    const style = {
        color: '#ffffff',
        backgroundColor: 'var(--primary)',
        borderRadius: '3px',
        fontSize: '.5rem',
        textTransform: 'none',
        height: '.9rem',
        width: 'fit-content',
    };

    const readMoreHandler = () => {
        
    }

    return (
        <Container>
            <ImageContainer><img src={img || ''} alt={title} /></ImageContainer>
            <InfoContainer>
                <div>
                    <div className="row-between">
                        <TitleContainer>{title}</TitleContainer>
                    </div>
                    {/* <h4>{strCategory}</h4> */}
                </div>
                <TextContainer>{shortText(text, 100)}</TextContainer>
                <Button onClick={readMoreHandler}>Read more</Button>
            </InfoContainer>
        </Container>
    )
}

ServiceCard.propTypes = {
    data: PropTypes.object,
}
