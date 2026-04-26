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

export async function getStopsFromStop(stopLan, stopLon) {
    const res = await fetch(`http://localhost:3000/stopsfromstop/${stopLan}/${stopLon}`)
    if (!res.ok) {
        throw new Error('Nie udało się pobrać przystanków z przystanku');
    }
    return res.json();
}

export async function getRoutesFromStop(stopId) {
    const res = await fetch(`http://localhost:3000/routesfromstop/${stopId}`)
    if (!res.ok) {
        throw new Error('Nie udało się pobrać tras dostępnych z przystanku');
    }
    return res.json();
}

export async function getStopsFromRoute(routeId, tripId) {
    const res = await fetch(`http://localhost:3000/stopsfromroute/${routeId}/${tripId}`)
    if (!res.ok) {
        throw new Error('Nie udało się pobrać przystanków z trasy');
    }
    return res.json();
}