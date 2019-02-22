# Persona Desktop Wallet

## Download
[Latest Release](https://github.com/PersonaIam/desktop-wallet/releases)

## Development

### Requirements

#### Ubuntu
In Ubuntu the development files of `libudev` are necessary:
```
sudo apt-get install libudev-dev libusb-1.0-0-dev
```

#### Windows
- Python 2.7
- Visual Studio 2017

#### Node 11
There are certain packages (such as the ledger HID packages) which do not work on Node 10.

#### Yarn
Install the Yarn dependency manager
```
npm install -g yarn
```

### Commands

<details><summary>List of commands</summary>

``` bash
# Install dependencies
yarn install

# Execute the application. Making changes in the code, updates the application (hot reloading).
yarn dev

# Lint all JS/Vue files in the `src` and `__tests__`
yarn lint

# Lint, and fix, all JS/Vue files in `src` and `__tests__`
yarn lint:fix

# Check that all dependencies are used
yarn depcheck

# Collect the code and produce a compressed file
yarn pack

# Build electron application for production (Current OS)
yarn build

# Build electron application for production (Windows)
yarn build:win

# Build electron application for production (Mac)
yarn build:mac

# Build electron application for production (Linux)
yarn build:linux

# Run unit and end-to-end tests
yarn test

# Run unit tests
yarn test:unit

# Run unit tests and generate and display the coverage report
yarn test:unit:coverage

# Run unit tests and watch for changes to re-run the tests
yarn test:unit:watch

# Run end-to-end tests, without building the application
yarn test:e2e

# Build the application and run end-to-end tests
yarn test:e2e:full
```

</details>

## Security

If you discover a security vulnerability within this project, please contact us. All security vulnerabilities will be promptly addressed.

## Credits

 - [Alex Barnsley](https://github.com/alexbarnsley)
 - [ItsANameToo](https://github.com/ItsANameToo)
 - [Juan A. Martín](https://github.com/j-a-m-l)
 - [Lúcio Rubens](https://github.com/luciorubeens)
 - [Mario Vega](https://github.com/mvega3)
 - [Remus Golgot]

## License

[MIT](LICENSE) © [ArkEcosystem](https://ark.io)
