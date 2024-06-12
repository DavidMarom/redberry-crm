import { ContactsType } from '@/types';
import { getFromStorage } from './utils';

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

export const convertPhoneToGlobal = (phone: any) => {
    const userCountry = getFromStorage('user').country || 'Israel'

    const mapCountryToCode: { [key: string]: string } = {
        "Israel": "+972",
        "USA": "+1",
        "France": "+33",
        "Germany": "+49",
        "Italy": "+39",
        "Spain": "+34",
        "UK": "+44",
    }

    const code = mapCountryToCode[userCountry];

    if (phone.charAt(0) === '+') return phone;
    const updatedPhone = phone.replace(/^0|[^0-9]/g, '')
    return code + updatedPhone;
}