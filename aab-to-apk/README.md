# Handling digital signature in aab to apk conversion

1. download the credentials.json and .jks (java keystore) from eas servers using the following commands
```
eas credentials -p android

then select : credentials.json: Upload/Download credentials between EAS servers and your local json

then select : Download credentials from EAS to credentials.json
```
  - it download the credentials.json file in the current directory and the .jks at the location pointed in the credentials.json file.
  - these two files contains all the info which is required to sign the apk file
  - you can use these files to sign the apk file using the bundletool


2. Generate a signed APK
```
java -jar bundletool-all-1.18.3.jar build-apks \
  --bundle=input.aab \
  --output=app.apks \
  --mode=universal \
  --ks=keystore.jks \
  --ks-key-alias=key-alias
```
  - after executing the above command it asks for more info respond it from confidentials.json file and boom your working .apk file is ready to use


BUT : you can generate .apk file directly by editing eas.json command with 
```
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
```
and run command as
```
eas build --platform android --profile preview
```
  - it will generate the .apk file directly without any need of signing it manually