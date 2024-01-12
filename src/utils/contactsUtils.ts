import { ContactsType } from '@/types';

export const countStatus = (contacts: ContactsType) => {
    let statusCount = [0, 0, 0, 0];
    contacts?.forEach((contact: any) => {
        if (contact.status === 'Blocked') { statusCount[0]++ }
        else if (contact.status === 'Active') { statusCount[1]++ }
        else if (contact.status === 'Inactive') { statusCount[2]++ }
        else if (contact.status === 'Awaiting Call') { statusCount[3]++ }
    })
    return statusCount;
}