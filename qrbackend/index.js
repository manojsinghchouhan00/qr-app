const express = require('express');
const cors = require('cors');
require('./db/config');
const qr = require('qr-image');

const QRCodeModel = require("./model/qrModel")
const app = express();
app.use(express.json())
app.use(cors()) 
const PORT = 5000;

// QR generator api
app.get('/qrgenerate/:id', async (req, res) => {
    try {
        // Find QR code data by ID
        const user = await QRCodeModel.findById(req.params.id);
        // console.log(user)
        // If user is not found
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Create string with "key: value" pairs
        const data = `
            Name: ${user.name}
            Father's Name: ${user.fatherName}
            Mobile No: ${user.mobileNo}
            Emergency Contact: ${user.emergency}
            Address: ${user.address}
            Blood Group: ${user.bloodGroup}
            Insurance: ${user.insurance}
            Company Name: ${user.companyName}
            Insurance Name: ${user.insuranceName}
            Insurance No: ${user.insuranceNo}
            Agent No: ${user.agentNo}
            Expiry Date: ${user.expiryDate}
        `;

        // Generate and send QR code image
        const qr_png = qr.image(data, { type: 'png' });
        res.type('png');
        qr_png.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// listing api
app.get('/generate', async (req, resp) => {
    let data = await QRCodeModel.find()
    resp.send(data)
})

// find one api
app.get('/generate/:_id', async (req, resp) => {
    let data = await QRCodeModel.findOne(req.params)
    resp.send(data)
})

app.delete('/generate/:_id', async (req, resp) => {
    let data = await QRCodeModel.deleteOne(req.params)
    resp.send(data)
})


app.post('/generate', async (req, res) => {
    try {
        // Save QR code data to MongoDB
        const qrCodeData = new QRCodeModel(req.body);
        let data = await qrCodeData.save();
        res.status(200).send(data);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
