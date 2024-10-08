
# AceVentura

AceVentura is a project that scrapes AceStream links using Playwright, processes match data, and stores the results in a `data.json` file located in the `/data` folder. The script can be executed manually or scheduled via GitHub Actions.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SergioGMR/AceVentura.git
   cd AceVentura
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

### Running the Script

To manually run the scraping script, use the following command:

```bash
npm start
```

This will execute the `index.js` script, scrape AceStream data from the specified source, and save the output in the `/data/data.json` file.

### Automation with GitHub Actions

This project is configured to run automatically on a schedule using GitHub Actions. The script runs every hour, scrapes new data, and updates the `data.json` file.

You can check the GitHub Actions workflow in the `.github/workflows/` directory.

### Project Structure

```plaintext
/src
  ├── browser.js             # Initializes Playwright browser
  ├── pageNavigation.js       # Navigates to the matches page
  ├── matchExtractor.js       # Extracts match data
  ├── acestreamExtractor.js   # Extracts AceStream links
  ├── dataWriter.js           # Writes data to the JSON file
/data
  └── data.json               # Contains the generated data from the scraping
index.js                      # Entry point of the project
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
