const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function uploadImageToOperator(imagePath) {
  try {
    const imageData = 'data:image/jpg;base64,' + fs.readFileSync(imagePath).toString('base64');
    console.log(imageData.substring(0, 20))

    const imeinew = '123456789012345'
    const retryCount = 2;
    const imageName = path.basename(imagePath);

    const obj = {
      content: imageData,
      imei: imeinew,
      name: imageName,
      retryCount: retryCount,
    };

    const response = await axios.post('http://localhost:8282/retailcdcclient/sendImageForADMPrediction', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data) {
      console.log('Server Response:', response.data);
    } else {
      console.log('No response from the server.');
    }
  } catch (error) {
    console.log(error)
    console.error('Error uploading image:', error.message);
  }
}

const imagePath = './image.jpg';
uploadImageToOperator(imagePath);

