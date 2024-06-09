// 'use client';

import { Card01 } from '@/components';
import PieChart from './PieChart';
import { countStatus } from '@/utils/contactsUtils';
import Link from 'next/link'

export const Graph01 = ({ data }: { data: any[] }) => {

    let size = "100%";
    if (window.innerWidth > 1024) { size = "40%" }

    return (
        <Card01 paddingright="0px" paddingleft='0px' marginright="20px" width={size}>
            {(data && data.length > 0) && <PieChart countData={countStatus(data)} />}
            {(!data || data.length === 0) &&
                <div>
                    <div className='row-center'>No contacts yet</div>
                    <div className='row-center link'><Link href='/Contacts'>Add a contact to get started</Link></div>
                </div>
            }

        </Card01>
    );
}
