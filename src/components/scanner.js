import React, { useState } from 'react'

import { QRCode } from 'qrcode'
import qrcode from "qrcode";
import { QrReader } from 'react-qr-reader';

export const Scanner = () => {
    const [imageQR, setImageQR] = useState();
    const [data, setData] = useState('No result');
     const generateQRCode = async () => {
    const image = await qrcode.toDataURL("20104064");
    setImageQR(image);
  };


  const [webcamResult, setWebcamResult] = useState();
  const webcamError = (error) => {
    if (error) {
      console.log(error);
    }
  };
  const webcamScan = (result) => {
    if (result) {
      setWebcamResult(result);
    }
  };


  return (
    <>
    <div>scanner</div>
      <div className="card col-sm-4">
      <div className="card-header m-1 rounded text-center">
        <h3>Webcam Image</h3>
      </div>
      <div className="card-body text-center">
        {/* <QrReader
          delay={300}
          onError={webcamError}
          onScan={webcamScan}
          legacyMode={false}
          facingMode={"user"}
        /> */}
          <QrReader
             constraints={{
              facingMode: 'user'
            }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      </div>
      <div className="card-footer rounded mb-1">
        <h6>WebCam Result: {data}</h6>
      </div>
    </div>
    </>
  )
}
