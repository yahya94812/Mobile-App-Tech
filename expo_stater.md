1. 
Install Node.js
Expo requires Node.js (LTS version, 18 or newer). Download it from nodejs.org and install it, then verify with `node -v` in your terminal.

2. 
Create the Expo project
Run `npx create-expo-app my-app` in your terminal. This scaffolds a new project folder called `my-app` with all the default files and dependencies already set up.

3. 
Move into the project folder
Run `cd my-app`. All following commands should be run from inside this folder.

4. 
Install the Expo Go app on your phone
Download 'Expo Go' from the App Store (iOS) or Play Store (Android). This lets you preview your app live on your actual device without any native build tools.

5. 
Start the development server
Run `npx expo start`. This opens a terminal dashboard with a QR code and starts the Metro bundler, which compiles your JavaScript for the app.

6. 
Open the app on your device or simulator
Scan the QR code with the Expo Go app (Android: use the app's scanner; iOS: use the Camera app) to load your project live. Alternatively, press `i` for an iOS simulator or `a` for an Android emulator if you have Xcode/Android Studio installed.

7. 
Edit and see live changes
Open `app/index.tsx` in your code editor and change some text. Save the file — the app on your phone/simulator will instantly reload with your edit (hot reload).