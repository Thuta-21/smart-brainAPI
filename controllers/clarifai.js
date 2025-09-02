const handleClarifai = (req, res) => {
    const PAT = 'b853825b4c9d4c13a1d05374778c329f';
    const USER_ID = 'tbmvp038mxfi';
    const APP_ID = 'Testing';
    const IMAGE_URL = req.body.input;
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });

      const getClarifai = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };

        fetch("https://api.clarifai.com/v2/models/" 
        + MODEL_ID 
        + "/versions/" 
        + MODEL_VERSION_ID 
        + "/outputs", getClarifai)
        .then(response => response.json(response))
        .then(result => res.json(result))
        .catch(err => res.staus(4000).json('cannot fetch'))
} 

export default handleClarifai;