# Google Flights Clone

A Next.js-based clone of Google Flights that allows users to search for flights using real-time data from the Sky Scrapper API on RapidAPI. This project integrates flight search functionality with features such as:

- Retrieving nearby airports based on the user's current location using the browser's Geolocation API.
- Autocomplete for airport search using the **searchAirport** endpoint.
- Detailed flight search via the **searchFlights** endpoint.

## Important Update 
- due to the down of this endpoint [searchAirport](https://rapidapi.com/apiheya/api/sky-scrapper/playground/apiendpoint_efcce954-2563-41cb-97fc-b2abe7851b3d). ![image](https://github.com/user-attachments/assets/d03f0ceb-c9c4-4130-b1b2-58234ecc6b7c)
I decided to use another API for the autocomplete functionality which is [Flights Scrapper](https://rapidapi.com/ntd119/api/sky-scanner3/playground/apiendpoint_8eff744f-bd64-4923-9eed-6a937ab65628) auto-complete endpoint. to make the application work again. thanks for your understanding!

## API Integration

This project uses the [Sky Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper) from RapidAPI. The following endpoints are implemented:

- **getNearByAirports**: Fetches the nearest airports to the user’s location.
- **searchAirport**: Provides an autocomplete feature as the user types a location.
- **searchFlights**: Retrieves all flight-related information based on the user’s selected criteria.

> **Note:** Visit the [Sky Scrapper API](https://rapidapi.com/apiheya/api/sky-scrapper) and subscribe to obtain your API key.

## Getting Started

Follow these instructions to run the project on your local machine.

### Prerequisites

- **Node.js** (v14 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd google-flights-clone
   ```

2. **Install Dependencies**
   Using npm:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**

Create a .env.local file in the root of your project and add the following variables:

```bash
NEXT_PUBLIC_BACKEND_URL="https://sky-scrapper.p.rapidapi.com/api"
NEXT_PUBLIC_API_VALUE="your API value"
```

Replace "your API value" with your actual API key obtained by subscribing to [Sky Scrapper API.](https://rapidapi.com/apiheya/api/sky-scrapper)

### Running Locally

To run the Next.js application in development mode, use:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

Open your browser and navigate to http://localhost:3000 to view the application.

### Project Structure

- app/: Contains the Next.js app router files including layout.tsx where the ThemeProvider and global styles are configured.
- components/: Contains React components such as Navbar and DarkModeToggle.
- utils/: Utility functions such as formatDate for date formatting.

### Deployment

This project is ready for deployment on platforms like Vercel. Make sure to configure the environment variables in your deployment settings accordingly.

### Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

### License

This project is licensed under the MIT License.
