import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { MdQrCodeScanner } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode;

const Scanner = (props) => {
    const fileRef = useRef(null);
    const [cameraList, setCameraList] = useState([]);
    const [activeCamera, setActiveCamera] = useState();
    useEffect(() => {
      html5QrCode = new Html5Qrcode("reader");
      getCameras();
      const oldRegion = document.getElementById("qr-shaded-region");
      oldRegion && oldRegion.remove();
    }, []);
  
    const handleClickAdvanced = () => {
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.info(decodedResult, decodedText);
        props.onResult(decodedText);
        alert(`decoded:__ ${decodedText}`);
        handleStop();
      };
      html5QrCode
        .start(
          { facingMode: "environment" },
          props.type === "QR" ? qrConfig : brConfig,
          qrCodeSuccessCallback
        )
        .then(() => {
          // const oldRegion = document.getElementById("qr-shaded-region");
          // if (oldRegion) oldRegion.innerHTML = "";
        });
    };
    const getCameras = () => {
      Html5Qrcode.getCameras()
        .then((devices) => {
          /**
           * devices would be an array of objects of type:
           * { id: "id", label: "label" }
           */
          console.info(devices);
          if (devices && devices.length) {
            setCameraList(devices);
            setActiveCamera(devices[0]);
          }
        })
        .catch((err) => {
          console.error(err);
          setCameraList([]);
        });
    };
    const onCameraChange = (e) => {
      if (e.target.selectedIndex) {
        let selectedCamera = e.target.options[e.target.selectedIndex];
        console.info(selectedCamera);
        let cameraId = selectedCamera.dataset.key;
        setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
      }
    };
    const handleStop = () => {
      try {
        html5QrCode
          .stop()
          .then((res) => {
            html5QrCode.clear();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (err) {
        console.log(err);
      }
    };
    const scanLocalFile = () => {
      fileRef.current.click();
    };
    const scanFile = (e) => {
      if (e.target.files.length === 0) {
        // No file selected, ignore
        return;
      }
  
      // Use the first item in the list
      const imageFile = e.target.files[0];
      console.info(imageFile);
      html5QrCode
        .scanFile(imageFile, /* showImage= */ true)
        .then((qrCodeMessage) => {
          // success, use qrCodeMessage
          console.log(qrCodeMessage);
          props.onResult(qrCodeMessage);
          html5QrCode.clear();
        })
        .catch((err) => {
          // failure, handle it.
          console.log(`Error scanning file. Reason: ${err}`);
        });
    };
  
    return (
      <div className="py-0">
        <div id="reader" width="100%"></div>
        {/*
        <button onClick={getCameras}>Get List of cameras</button>
        {cameraList.length > 0 && (
          <select onChange={onCameraChange}>
            {cameraList.map((li) => (
              <option
                key={li.id}
                id={li.id}
                selected={activeCamera && activeCamera.id === li.id}
              >
                {li.label}
              </option>
            ))}
            <option>Dummy</option>
          </select>
        )}
        */}
        <div className="flex space-x-2 justify-between w-1/2 rounded-lg">
          <button
            className="rounded-l-lg py-2 px-1 flex gap-2 items-center hover:bg-blue-500 hover:text-white"
            onClick={() => handleClickAdvanced()}
          >
            <MdQrCodeScanner />
            <span className="text-sm">Scan {props.type}</span>
          </button>
          <button
            className="py-2 px-1 rounded-r-lg text-sm flex gap-2 items-center hover:bg-red-500 hover:text-white"
            onClick={() => handleStop()}
          >
            <FaRegStopCircle />
            stop
          </button>
        </div>
      
      </div>
    );
  };

  export default Scanner