# ZTMDLE - Dokumentacja Projektu


## Technologie
### Frontend
* **Framework:** React.js (z React Router)
* **Mapy:** React-Leaflet (Leaflet.js)
* **Stylizacja:** Tailwind CSS

### Backend
* **Środowisko:** Node.js
* **Framework API:** Express.js
* **Baza danych:** SQLite3

## Struktura Komponentów

### Komponenty
* **`Header`**: Nagłówek aplikacji z nawigacją i logo.
* **`AchievementPopup`**: Informacja o odblokowaniu osiągnięcia.
* **`GameScoreBox`**: Komponent liczący czas przejazdu do przystanku końcowego.
* **`RouteHistoryBox`**, **`RouteHistoryModal`**: Komponenty obsługujące historię trasy.
* **`AnwserBox`**: Komponent wyboru trasy.
* **`CurrentStopContainer`**: Panel informujący aktualnego przystanku.
* **`ChangeStop`**: Komponent służący do zmiany przystanku na przeciwny do aktualnego (np. Siedlce 01 na Sieldce 02).
* **`StartEnd`**: Komponent wypisujacy i defniujący punkt startowy i końcowy.
* **`MainMap`**: Mapa trybu ZTMDLE.
* **`GuessMap`**: Mapa trybu GEOZTM.
* **`MapBoundsController`**: Automatyczne kadrowanie mapy MainMap.
* **`GuessBoundsController`**: Automatyczne kadrowanie mapy GuessMap.
* **`useAchievements`**: Zarządzanie osiągnięciami i ich zapisem w ciasteczkach.
* **`useGameWinLogic`**: Weryfikacja warunków zwycięstwa w trybie ZTMDLE.

### Strony
* **`HomePage`**: Wybór trybu gry.
* **`FreePlay`**: Tryb ZTMDLE.
* **`SecondMode`**: Tryb GEOZTM.
* **`Achievments`**: Galeria osiągnięć użytkownika.

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

## Instalacja i uruchomienie
1. **Sklonowanie repozytorium:** `git clone https://github.com/MajewskiAdrian/ztmdle.git`
   `cd ztmdle`
2. **Przygotowanie backendu:** `cd backend`
   `npm install` 
3. **Uruchomienie serwera API:** `node src/server.js` 
   *(Zostaw to okno terminala otwarte)*
4. **Przygotowanie frontendu:** *(Otwórz nowe okno terminala)*
   `cd frontend`
   `npm install`
5. **Uruchomienie aplikacji:** `npm run dev`
