import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
// import { getCameraList } from "./Utils";
import { MdQrCodeScanner } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import ServiceApi from "../services/ServiceApi";
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode;

// function startCamera(){}

export const Scanner = (props) => {
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
    <div className="py-2">
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
      <div className="flex space-x-2">
        <button
          className="bg-teal-700 rounded-md px-2 py-1 text-white flex gap-2 items-center"
          onClick={() => handleClickAdvanced()}
        >
          <MdQrCodeScanner />
          <span className="text-sm">Scan {props.type}</span>
        </button>
        <button
          className="text-white bg-red-500 px-2 rounded-sm text-sm flex gap-2 items-center"
          onClick={() => handleStop()}
        >
          <FaRegStopCircle />
          stop
        </button>
      </div>
      {/*
      <button onClick={scanLocalFile}>Scan local file</button>
      <input
        type="file"
        hidden
        ref={fileRef}
        accept="image/*"
        onChange={scanFile}
          />
      */}
    </div>
  );
};

const Profile = () => {
  const [decodedValue, setDecodedValue] = useState("");
  const [scannerType, setScannerType] = useState("QR");
  const [isLoading, setIsLoading] = useState(false)
  const [idvalue, setIdvalue] = useState("")
  const [customer, setCustomer] = useState({})

  const getCustomer = () => {
   // const x = 817498394
    const params = {
      id: decodedValue
      //parseInt(nomer, 10),
    };
    ServiceApi.getNoCustomer(params)
    .then((response) => {
      console.log(response)
      setCustomer(response)
     // setCurrentCustomer(response.data);
     // setLoad(false);

      //console.log(response.data);
    })
    .catch((e) => {
      //console.log(e);
      //setLoad(false);
    });
  }
  const onChangedata = (res) => {
    setDecodedValue(res)
    getCustomer()
  }
  return (
    <div className="px-6">
      <label>
        <input
          type="radio"
          defaultChecked
          value="QR"
          name="scannerType"
          onChange={() => setScannerType("QR")}
        />
        QR
      </label>
      <label>
        <input
          type="radio"
          value="BAR"
          name="scannerType"
          onChange={() => setScannerType("BAR")}
        />
        BAR
      </label>
        <Scanner type={scannerType} onResult={(res) => onChangedata(res)} />
      <br />
      <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nomer"
            type="text"
            name="nomer"
            placeholder="nomer"
            value={decodedValue}
           
          />
      <p>
        <strong>Value:</strong>
        {decodedValue}
      </p>
      <button className="px-2 bg-teal-500 mt-2 mb-2" onClick={getCustomer}>Click</button>
    </div>
  );
};

export default Profile;
