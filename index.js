const { exec } = require('child_process');

function makeCurlPostRequest() {
  const url = 'https://internal.extremesneaklist.org/api/controllers/post/user/sendNotificationOnShoeVerification';

  // Use proper curl syntax with escaped JSON
  const curlCommand = `curl -X POST "${url}" \
    -H "Content-Type: application/json" \
    -d '{"shoe_id": 1022}'`;

  exec(curlCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Curl POST error: ${error}`);
      console.error('stderr:', stderr);
      return;
    }
    console.log('Curl POST Response:', stdout);
  });
}

makeCurlPostRequest();