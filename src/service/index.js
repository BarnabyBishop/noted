require('isomorphic-fetch');

export async function saveListItem(listItem) {
    const response = await fetch(`/api/save-list-item${location.search}`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(listItem)
    });
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    const savedListItem = await response.json();
    return savedListItem;
}

export async function getList() {
    const response = await fetch(`/api/get-list${location.search}`);
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    const data = await response.json();
    return data;
}

export async function getTags() {
    const response = await fetch(`/api/get-tags${location.search}`);
    if (response.status >= 400) {
        throw new Error('Bad response from server');
    }
    const data = await response.json();
    return data;
}
