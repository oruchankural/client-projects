const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());

app.post('/uploads', (req, res) => {
    console.log("endpoint invoking...");
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.file;
    const fileName = `${Date.now()}_${uploadedFile.name}`;
    const uploadPath = __dirname + '/uploads/' + fileName;

    setTimeout(() => {
        uploadedFile.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('File uploaded!');
        });
    }, 2000);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
