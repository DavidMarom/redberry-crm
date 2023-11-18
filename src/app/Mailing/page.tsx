"use client";

import React from 'react';
import useCounterStore from '@/store/counter';
import { Card01 } from '@/components';

const MailingPage = () => {
    const count = useCounterStore((state) => state.count);
    const increment = useCounterStore((state) => state.increment);
    const decrement = useCounterStore((state) => state.decrement);

    return (
        <div>
            <h1>Mailing</h1>
            <p>Manage mailing lists and push emails to users</p>
            <p>Count: {count}</p>
            <Card01 width="200px">
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </Card01>
        </div>
    );
};

export default MailingPage;
