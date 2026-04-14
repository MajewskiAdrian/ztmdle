export async function getStops(params) {
    const res = await fetch('http://localhost:3000/stops')
    if (!res.ok) {
        throw new Error('Nie udało się pobrać przystanków');
    }
    return res.json();
}

export async function getRandomStops() {
    const res = await fetch('http://localhost:3000/randomstops')
    if (!res.ok) {
        throw new Error('Nie udało się pobrać losowych przystanków');
    }
    return res.json();
}

export async function getStopsFromStop(stopId) {
    const res = await fetch(`http://localhost:3000/stopsfromstop/${stopId}`)
    if (!res.ok) {
        throw new Error('Nie udało się pobrać przystanków z przystanku');
    }
    return res.json();
}