export const setToStorage = (key: string, value: any) => { localStorage.setItem(key, JSON.stringify(value)) }

export const getFromStorage = (key: string) => {
    try { return JSON.parse(localStorage.getItem(key) as string) }
    catch { return null }
}

export const dataExpired = () => Date.now() - parseInt(getFromStorage('lastFetch') ?? "") > 60000 || !getFromStorage('lastFetch');
export const updateLastFetch = () => { setToStorage("lastFetch", Date.now()) }

export const addKeysToResponse = (elements: any[]) => elements.map((element, index) => ({ ...element, key: index }));