# Nutriday

Nutriday is a web application for exploring food products and their nutritional values. The app uses data from the Swedish Food Agency (Livsmedelsverket) and lets you search for foods, view detailed nutrition information and even track your water intake.

## Project Structure

- **TeamOrange.Server** – ASP.NET Core 8 API that proxies requests to the Livsmedelsverket open data API and serves the front‑end in production.
- **teamorange.client** – React front‑end built with Vite.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [Node.js](https://nodejs.org/)

## Installation

```sh
# restore server dependencies
 dotnet restore

# install client dependencies
 cd teamorange.client
 npm install
 cd ..
```

## Running in Development

Start the ASP.NET Core back‑end:

```sh
dotnet run --project TeamOrange.Server
```

In another terminal start the React development server:

```sh
cd teamorange.client
npm run dev
```

Navigate to <https://localhost:5173> to use the app. You can search for food items, open a product to see its nutrition facts and log how much water you drink.

## Building for Production

```sh
# build static assets
cd teamorange.client
npm run build
cd ..

# publish the server with bundled client
 dotnet publish TeamOrange.Server -c Release -o out
```

The published output in `out/` contains both the API and the compiled front‑end.

## Tests

Run the server-side test suite:

```sh
dotnet test
```

## Key Front‑end Packages

```sh
npm install react-router-dom
npm install react-bootstrap bootstrap
npm install react-router-bootstrap
npm install react-bootstrap-icons
npm install fuse.js
```

## Troubleshoot

If the SPA launch fails because the client’s dependencies weren’t installed correctly.
1. Switch to an LTS version of Node (e.g., 18 or 20)
2. Completely reinstall dependencies
```sh
cd teamorange.client
rm -rf node_modules package-lock.json
npm cache clean --force    # optional but helpful
npm install                # installs Rollup’s platform binary
```
```sh
npm run dev
```


