# Deployment

## 1. iOS Deployment Process?

**Steps:**
1. Apple Developer account ($99/year)
2. Create certificates and provisioning profiles
3. Set app icon and splash screen
4. Configure version and build number
5. Create release build
6. Upload to App Store Connect
7. TestFlight beta testing
8. Submit to App Store

**Build:**
```bash
# Xcode: Product > Archive
# Or CLI
xcodebuild -workspace ios/MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Release \
  archive
```

---

## 2. Android Deployment Process?

**1. Generate Signing Key:**
```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000
```

**2. Configure build.gradle:**
```gradle
android {
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
        }
    }
}
```

**3. Build AAB:**
```bash
cd android
./gradlew bundleRelease
```

---

## 3. CodePush?

```bash
npm install react-native-code-push
appcenter-cli login
```

```jsx
import codePush from 'react-native-code-push';

const App = () => { /* ... */ };

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
```

**Deploy:**
```bash
appcenter codepush release-react -a <username>/MyApp-iOS -d Production
```

---

## 4. Fastlane?

```ruby
platform :ios do
  lane :beta do
    increment_build_number
    build_app(scheme: "MyApp")
    upload_to_testflight
  end
end

platform :android do
  lane :deploy do
    gradle(task: "clean bundleRelease")
    upload_to_play_store
  end
end
```

---

## 5. Environment Variables?

```bash
npm install react-native-config
```

**.env:**
```
API_URL=https://api.example.com
API_KEY=your_api_key
```

**Usage:**
```jsx
import Config from 'react-native-config';
const apiUrl = Config.API_URL;
```

---

## 6. Version Management?

**Semantic Versioning (MAJOR.MINOR.PATCH):**
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

**Example:**
- 1.0.0 → Initial release
- 1.0.1 → Bug fix
- 1.1.0 → New feature
- 2.0.0 → Major changes

---

## 7. App Size Optimization?

**Android:**
```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
        }
    }
    bundle {
        language { enableSplit = true }
        density { enableSplit = true }
        abi { enableSplit = true }
    }
}
```

**Common:**
- Remove unused libraries
- Compress images
- Use Hermes engine

---

## 8. App Security?

**SSL Pinning:**
```jsx
import { fetch } from 'react-native-ssl-pinning';

fetch('https://api.example.com', {
  sslPinning: { certs: ['cert1'] },
});
```

**Secure Storage:**
```jsx
import * as Keychain from 'react-native-keychain';

await Keychain.setGenericPassword('username', 'password');
const credentials = await Keychain.getGenericPassword();
```

---

## 9. Crash Reporting?

**Firebase Crashlytics:**
```jsx
import crashlytics from '@react-native-firebase/crashlytics';

crashlytics().recordError(new Error('Test error'));
crashlytics().setUserId('user123');
crashlytics().log('User clicked button');
```

**Sentry:**
```jsx
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-dsn',
  tracesSampleRate: 1.0,
});
```

---

## 10. CI/CD Pipeline?

**GitHub Actions:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Build and deploy
        run: fastlane ios beta
```
