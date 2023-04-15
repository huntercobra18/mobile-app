import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [device, setDevice] = useState(null);

  const request = () => {
    const options = {
      filters: [{ services: [65282], name: "PLAYBULB CANDLE" }],
    };
    return navigator.bluetooth.requestDevice(options).then((device) => {
      setDevice(device);
      device.addEventListener("gattserverdisconnected", () => {
        console.log("Device is disconnected.");
        setDevice(null);
      });
      return device;
    });
  };

  const connect = (deviceParam) => {
    if (!device && !deviceParam) {
      return Promise.reject("Device is not connected.");
    }
    if (deviceParam) {
      setDevice(deviceParam);
    }
    const ldevice = deviceParam || device;
    return ldevice.gatt.connect().then(() => {
      getMacAddress(ldevice);
      return ldevice;
    });
  };

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const writeColor = (data) => {
    if (!device || !device.gatt) {
      return Promise.reject("Device is not connected.");
    }
    return device.gatt
      .getPrimaryService(0xff02)
      .then((service) => service.getCharacteristic(0xfffc))
      .then((characteristic) => characteristic.writeValue(data));
  };

  function convertHexColorCodeToRGB(hexColorString) {
    let r = parseInt(hexColorString.substr(1, 2), 16);
    let g = parseInt(hexColorString.substr(3, 2), 16);
    let b = parseInt(hexColorString.substr(5, 2), 16);
    return [r, g, b];
  }

  const writeColorDebounced = debounce((value) => {
    let configData = new Uint8Array(4);
    configData[0] = 0; // always 0
    const rgb = convertHexColorCodeToRGB(value);
    configData[1] = rgb[0]; // red
    configData[2] = rgb[1]; // green
    configData[3] = rgb[2]; // blue
    writeColor(configData);
  }, 1000);

  const disconnect = () => {
    if (!device) {
      return Promise.reject("Device is not connected.");
    }
    return device.gatt.disconnect();
  };

  const [macAddress, setMacAddress] = useState("");
  const getMacAddress = async (device) => {
    if (!device) {
      setMacAddress("");
    }
    try {
      const name = await device.gatt
        .getPrimaryService(0xff02)
        .then((service) => service.getCharacteristic(0xffff))
        .then((characteristic) => characteristic.readValue())
        .then((value) => {
          const decoder = new TextDecoder("utf-8");
          return decoder.decode(value);
        });
      setMacAddress(name);
    } catch (error) {
      console.log("Error: ", error);
      setMacAddress("");
    }
  };

  return (
    <ApiContext.Provider
      value={{
        device,
        request,
        connect,
        writeColor: writeColorDebounced,
        disconnect,
        getMacAddress,
        macAddress,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => {
  if (!useContext(ApiContext)) {
    throw new Error("useApi must be used within ApiProvider");
  }

  return useContext(ApiContext);
};

export { ApiProvider, useApi };
