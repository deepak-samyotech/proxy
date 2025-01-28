const axios = require('axios');
const { exec } = require('child_process');

function makeCurlRequest() {
  const url = 'http://34.235.140.158:3536';
  
  exec(`curl ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Curl error: ${error}`);
      return;
    }
    console.log('Curl GET Response:', stdout);
  });
}


makeCurlRequest();