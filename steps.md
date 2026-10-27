npx create-expo-app my-app
npx expo start # it start with hot reloading
npx expo start -c # for clearing cache

# EAS Builds (builds on the cloud)
- EAS : Expo Application Services
1. npm install -g eas-cli
2. eas login # (free Expo account)
3. eas build:configure # it creates eas.json file for build configuration
4. eas build --profile development --platform android


- if you want to install any expo package, use the following eg. command
```npx expo install expo-asset```
That installs it at the right version for your Expo SDK and updates your package.json/lockfile


Note : If you'll be iterating a lot on native code, installing Android Studio locally pays off. If you just want this working fast on your own phone, EAS Build is usually less friction