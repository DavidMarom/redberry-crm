'use client';

import React, { useState } from 'react';
import { getRecommendation } from '@/services/openai';
import { Card01 } from '@/components';
import styles from './Recommendations.module.css';


export const Recommendations = ({ notes }: { notes: any }) => {

    const [recommendation, setRecommendation] = useState("");
    const filteredArray = notes?.filter((element: any) => element !== undefined);

    return (
        <Card01 width='100%' paddingright='20px'>
            <h2>AI Recommendations</h2>
            <p>Get recommendations based on your notes for contacts under "Awaiting Call"</p>
            <br />
            {recommendation === '' ?
                <button
                    className={styles.prioritizeBtn}
                    onClick={() => {
                        setRecommendation("Loading...")
                        getRecommendation(filteredArray).then((res) => { setRecommendation(res.content.replace(/(?:\r\n|\r|\n)/g, '<br>')) })
                    }}
                >
                    Prioritize my tasks!
                </button>: null}
            <div dangerouslySetInnerHTML={{ __html: recommendation }} />
        </Card01>
    )
}
