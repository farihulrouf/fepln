import { Html5Qrcode } from "html5-qrcode";

export const getCameraList = () => {
  return Html5Qrcode.getCameras()
    .then((devices) => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      console.info(devices);
      if (devices && devices.length) {
        return devices;
      }
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};
