
import axios from 'axios';
import fs from 'fs';

const registrationData = {
  email: 'unnik9218@gmail.com',
  name: 'UNNIKRISHNAN B V',
  mobileNo: '6381679428',
  githubUsername: 'https://github.com/uk127',
  rollNo: '2127220501172',
  accessCode: 'ZRsYXx' 
};

const outputFile = './registration.json';

async function register() {
  try {
    console.log('Sending registration request...');
    
    const response = await axios.post('http://20.244.56.144/evaluation-service/register', registrationData);
    
    console.log('Registration successful!');
    console.log(' Saving response to', outputFile);

    fs.writeFileSync(outputFile, JSON.stringify(response.data, null, 2));

    console.log('Saved to registration.json. Keep this file safe!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Registration failed!');

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    } else {
      console.error('Network or script error:', error.message);
    }
  }
}

register();
