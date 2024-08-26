# DeepCool AK620 Temperature Display

A Node.js project for displaying the temperature of the DeepCool AK620 cooler, controlled via a systemd service.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project allows you to monitor the temperature of your DeepCool AK620 cooler using a simple Node.js script, which runs as a systemd service. The service logs the temperature data and updates a display connected to your system.

## Features

- **Real-time Temperature Monitoring:** Continuously monitor and display the temperature.
- **Automatic Startup:** The service starts automatically on system boot.
- **Error Handling:** The service restarts on failure, ensuring continuous operation.
- **Logging:** Outputs logs to `/var/log/deepcool_ak620.log`.

## Requirements

- **Node.js** (v14 or later)
- **Linux System** with systemd (e.g., Ubuntu, Fedora)
- **DeepCool AK620 Cooler**
- **Git** (to clone the repository)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/deepcool-ak620-nodejs.git
   cd deepcool-ak620-nodejs
   
2. **Install dependencies:**
    ```bash
    npm install

3. **Set up the systemd service:**
Edit the deepcool-ak620.service file to match your directory structure:
    ```bash
    ExecStart=/usr/bin/node /home/<YOUR_USERNAME>/Documents/development/nodejs/deepcool-ak620-nodejs/main.js
    WorkingDirectory=/home/<YOUR_USERNAME>/Documents/development/nodejs/deepcool-ak620-nodejs

Then, copy the service file to the systemd directory:

   ```bash
   sudo cp deepcool-ak620.service /etc/systemd/system/
```
4. **Start and enable the service:**
```bash
  sudo systemctl enable deepcool-ak620.service
  sudo systemctl start deepcool-ak620.service
```


5. **Check the status and logs:**
```bash
  sudo systemctl status deepcool-ak620.service
  tail -f /var/log/deepcool_ak620.log
```

## Usage
Once installed, the service will automatically start on boot, 
monitoring the DeepCool AK620 cooler's temperature and displaying 
it in real-time. Logs are stored in /var/log/deepcool_ak620.log 
for troubleshooting and record-keeping.

## Configuration
- Service Configuration: To customize the service, edit the deepcool-ak620.service file. 
  You can adjust the log file location, working directory, and other options as needed.

- Node.js Script: The main.js script can be modified to change how the temperature is read and displayed. 
- Ensure you restart the service after making changes:
    ```bash
    sudo systemctl restart deepcool-ak620.service
    ```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. 
If you find any issues, feel free to open an issue on GitHub.

## License

This project is licensed under the MIT License.

Made with ❤️ by Mohanad Abu-Nayla

