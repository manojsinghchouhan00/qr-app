import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./qrcode.css";
import { useParams } from 'react-router-dom';

function QrCode() {
    const [name, setName] = useState('');
    const [fatherName, setfatherName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [emergency, setEmergency] = useState('');
    const [address, setAddress] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [insurance, setInsurance] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [insuranceName, setInsuranceName] = useState('');
    const [insuranceNo, setInsuranceNo] = useState('');
    const [agentNo, setAgentNo] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    // const [qrImage, setQrImage] = useState('');
    const [id, setId] = useState('');
    const [myqr, setMyQR] = useState('');

    const param = useParams();
    // console.log("Use params :", param.id)

    //  get one user data
    const getOneUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/generate/' + param.id);
            console.log("get data responce :", response.data)

            setName(response.data.name);
            setfatherName(response.data.fatherName);
            setMobileNo(response.data.mobileNo);
            setEmergency(response.data.emergency);
            setAddress(response.data.address);
            setBloodGroup(response.data.bloodGroup);
            setInsurance(response.data.insurance);
            setcompanyName(response.data.companyName);
            setInsuranceName(response.data.insuranceName);
            setInsuranceNo(response.data.insuranceNo);
            setAgentNo(response.data.agentNo);
            setExpiryDate(response.data.expiryDate);

        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    }
    if (param.id) {
        getOneUser();
    }

    useEffect(() => {
        if (id && name && fatherName) {
            updateQr();
        }
        setName("")
        setfatherName("")
        setMobileNo("")
        setEmergency("")
        setAddress("")
        setBloodGroup("")
        setInsurance("")
        setcompanyName("")
        setInsuranceName("")
        setInsuranceNo("")
        setAgentNo("")
        setExpiryDate("")
        setMyQR("")
    }, [id])

    const updateQr = async () => {
        try {
            const response = await axios.get('http://localhost:5000/qrgenerate/' + id, {
                responseType: 'arraybuffer' // Ensure response is treated as binary data
            });
            const qrCodeBase64 = btoa(
                new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            const qrCodeUrl = `data:image/png;base64,${qrCodeBase64}`;
            setMyQR(qrCodeUrl);
            console.log(myqr);
        } catch (error) {
            console.error('Error fetching QR code:', error);
        }
    };

    const generateQRCode = async () => {
        // console.log("Call qr generatore")
        try {
            const response = await axios.post(`http://localhost:5000/generate`, {
                name,
                fatherName,
                mobileNo,
                emergency,
                address,
                bloodGroup,
                insurance,
                companyName,
                insuranceName,
                insuranceNo,
                agentNo,
                expiryDate
            }
            );
            // console.log("Responce for post data :", response.data._id)
            setId(response?.data?._id)
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    return (
        <div className="App">
            <h1>QR Code Generator</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Father's Name"
                    value={fatherName}
                    onChange={(e) => setfatherName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Emergency Contact"
                    value={emergency}
                    onChange={(e) => setEmergency(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Blood Group"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Insurance"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setcompanyName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Insurance Name"
                    value={insuranceName}
                    onChange={(e) => setInsuranceName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Insurance No"
                    value={insuranceNo}
                    onChange={(e) => setInsuranceNo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Agent No"
                    value={agentNo}
                    onChange={(e) => setAgentNo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Expiry Date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                />
            </div>
            <button onClick={generateQRCode}>Generate QR Code</button>

            {/* <button onClick={updateQr}> update Generate QR Code</button> */}
            {myqr && <img src={myqr} alt="QR Code" width={"200px"} />}

        </div>
    );
}

export default QrCode;
