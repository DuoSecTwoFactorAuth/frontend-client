import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import duosecLogo from "../assets/logos/duosec-logo.svg";
import QRCode from "react-qr-code";
import fetchQRCode from "./qrcode-api-handlers";
import routes from "../utils/routes.js";

const QRCodePage = () => {
  const { companyEmployeeHash } = useParams();
  const [jwt, setJwt] = useState(
    "Loading, please be patient. It will take a little while. Download the DuoSec app until then from PlayStore. Loading, please be patient. It will take a little while. Download the DuoSec app until then from PlayStore. Loading, please be patient. It will take a little while. Download the DuoSec app until then from PlayStore."
  );

  useEffect(() => {
    const url = routes.qrCode.getQRCode + companyEmployeeHash;
    fetchQRCode(url, setJwt);
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row place-items-center justify-center w-screen pt-28">
          <img src={duosecLogo} alt="duosec-logo" className="h-10" />
        </div>

        <div className="flex flex-col place-items-center justify-center h-full w-screen">
          <div className="font-bold text-2xl">Scan using DuoSec App</div>
          <div className="flex flex-row place-items-center h-2/3">
            <QRCode value={jwt} size={300} />
          </div>
          <div className="h-20"></div>
        </div>
      </div>
    </>
  );
};

export default QRCodePage;
