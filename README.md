View demo at https://drive.google.com/drive/u/0/folders/17qaYgy2qzacETGfkvKOCWs6-yT9mSTow

Built using Expo.
Navigate to the root directory. </br>
Run `npm install` in your terminal to download the required npm packages. </br>
Run `npx expo start -c` to start the app. </br>

Enter your **current local IPv4 address** at **Line 15 in App.js** to be able to make call to the Expres.js backend when running React Native app. </br>

For Linux you can use the following commnads to directly get your IP address. 

- `hostname -I | awk '{print $1}'` (just returns the IP address, my personal favotire)
- `ip -4 addr show`
- `ifconfig`


Ideally I would have loved to deployed the Express.js server on an EC2 instance for an easier access, if it weren't for a lack of time. If you have any questions for me le know, thank you!