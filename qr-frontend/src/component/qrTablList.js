import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './qrTablList.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

export default function QrTablList() {
    const [data, setData] = useState([]);
    const [myqr, setMyQR] = useState('');


    const getData = () => {
        axios.get("http://localhost:5000/generate").then((resp) => {
            console.log("Response:", resp.data);
            setData(resp.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    function delData(id) {
        console.log("Delete data :", id);
        axios.delete("http://localhost:5000/generate/" + id).then(() => {
            getData();
        });
    }

    // Qr generator code
    const updateQr = async (id) => {
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
    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Father name</th>
                        <th>Blood Group</th>
                        <th>Emergency number</th>
                        <th>Address</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((ele, i) => (
                        <tr key={ele._id}>
                            <td>{i + 1}</td>
                            <td>{ele.name}</td>
                            <td>{ele.fatherName}</td>
                            <td>{ele.bloodGroup}</td>
                            <td>{ele.emergency}</td>
                            <td>{ele.address}</td>
                            <td>
                                <button><Link to={`/qrapp/${ele._id}`} style={{color:"black"}}>Edit</Link></button> <br /><br />
                                <button onClick={() => delData(ele._id)}>Delete</button> <br /><br />
                                <button onClick={() => updateQr(ele._id)}>Generate QR Code</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {myqr && <img src={myqr} alt="QR Code" width={"200px"} />}
        </div>
    );
}
