var HID = require('node-hid');
const si = require("systeminformation");


function getData(value) {
  const baseData = Buffer.alloc(64);
  baseData[0] = 16;
  baseData[1] = 19;

  baseData[2] = Math.floor(value / 10);
  baseData[3] = 0;
  baseData[4] = Math.floor(value / 10);
  baseData[5] = value % 10;

  return baseData;
}



async function main() {
  try {
    let devices = await HID.devicesAsync();

    const airCooler = devices.filter(
      device => device.manufacturer === 'DeepCool' && device.product === 'AK620-DIGITAL'
    )[0];

    if (!airCooler) {
      console.error("No DeepCool AK620-DIGITAL device found. Please check the connection.");
      return; // Exit if the device is not found
    }

    try {
      // Requires 'sudo'
      const device = await HID.HIDAsync.open(airCooler.vendorId, airCooler.productId);

      setInterval(async () => {
        try {
          const data = await si.cpuTemperature();

          if (data && data.max !== undefined) {
            const temp = Math.round(data.max);

            if (temp > 0 && temp < 100) {
              await device.write(getData(temp));
            } else {
              console.error('Invalid CPU temperature:', temp);
            }
          } else {
            console.error('CPU temperature data is invalid or unavailable.');
          }
        } catch (error) {
          console.error("Error getting CPU temperature:", error);
        }
      }, 1000);

    } catch (error) {
      console.error("Error opening DeepCool AK620-DIGITAL device:", error);
    }

  } catch (error) {
    console.error("Error getting HID devices:", error);
  }
}

main().then(r => {});