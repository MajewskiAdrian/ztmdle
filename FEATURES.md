# ZTMDLE - Dokumentacja Funkcji

## Backend - API Routes (port 3000)

### `/stops` (GET)
- Pobiera losowe przystanki (domyślnie 2 przystanki)
- Zwraca listę przystanków z `stopId`, `stopName`, `stopCode`

### `/stopsfromstop/:stopId` (GET)
- Pobiera wszystkie przystanki dostępne z danego przystanku
- Zwraca przystanki, do których można dojechać trasami z wybranego przystanku

### `/routesfromstop/:stopId` (GET)
- Pobiera wszystkie trasy przechodzące przez dany przystanek
- Zwraca listę tras z `routeId`, `routeName`, `tripId`

### `/stopsfromroute/:routeId/:tripId` (GET)
- Pobiera wszystkie przystanki danej trasy w konkretnym przejeździe
- Zwraca przystanki na odcinku trasy w chronologicznym porządku

---

## Frontend - Komponenty

### `App.jsx`
- Główny komponent zarządzający stanem aplikacji
- Trzyma `poczatkowy` (początkowy przystankek) i `currentStop` (bieżący przystanek)
- Rozpowszechnia stan do `StartEnd` i `AnwserBox`

### `Header`
- Nagłówek aplikacji

### `StartEnd`
- Wyświetla początkowy i końcowy przystanek
- Pokazuje bieżący przystanek (zmienia się po wyborze w `AnwserBox`)
- Pobiera dane przystanków z API przy załadowaniu

### `MainMap`
- Mapa lub wizualizacja trasy

### `AnwserBox`
- Custom dropdown do wyboru przystanku docelowego
- Lista pokazuje przystanki dostępne z **bieżącego** przystanku
- Przycisk `Ok` zmienia bieżący przystanek na wybrany
- Lista odświeża się po każdym wyborze

---

## Przepływ Danych

1. Załadowanie: `StartEnd` pobiera 2 losowe przystanki
2. Pierwszy przystanek to startowy i bieżący
3. Użytkownik klika dropdown w `AnwserBox`
4. Lista pokazuje przystanki dostępne z bieżącego przystanku
5. Po wyborze i kliknięciu `Ok`:
   - Bieżący przystanek zmienia się na wybrany
   - `StartEnd` odświeża wyświetlanie
   - `AnwserBox` pobiera nową listę dostępnych przystanków

---

## TODO

- [ ] Dodać mapę do komponentu `MainMap` - wizualizacja tras i przystanków
