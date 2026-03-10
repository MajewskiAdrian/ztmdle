export async function getStops(params) {
    const res = await fetch('http://localhost:3000/api/stops')
    if (!res.ok) {
        throw new Error('Nie udało się pobrać przystanków');
    }
    return res.json();
}