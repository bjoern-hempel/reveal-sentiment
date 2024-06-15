# Reveal Sentiment

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Reveal Sentiment is a political sentiment survey tool based on the Reveal.js framework. This tool allows users to express their current political mood and receive related ideas and suggestions.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bjoern-hempel/reveal-sentiment.git
   ```

2. Navigate to the project directory:

    ```bash
    cd reveal-sentiment
   ```
   
3. Install dependencies:

    ```bash
    npm install
   ```

## Usage

1. Start the local server:

    ```bash
    npm start -- --port=8888
   ```

2. Open your browser and go to http://localhost:8888.

## Customization

The slides are automatically generated from a YAML file located at [dist/config.yml](/dist/config.yml).
You can modify this file to change the content of the survey.

## Deployment

1. Create package

    ```bash
    npm run package
    ```

This command creates a ready-to-use reveal-js-presentation.zip package. The package can be transferred and unpacked on
any web server (only static files are needed). 

## License

This library is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for information.

MIT reveal.js license - see [LICENSE](https://github.com/hakimel/reveal.js/blob/master/LICENSE)

## Contact

If you have any questions or suggestions, feel free to contact me:

* Name: Björn Hempel
* Email: bjoern@hempel.li

Thank you for using Reveal Sentiment!

## Demo

A demo is available at: https://sentiment.ixno.de/

* Username: `sentiment`
* Password: `Imenirasopo443`
