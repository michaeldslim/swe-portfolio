# 배포

## 1. iOS 앱 배포 과정은?

**답변:**

**1. Apple Developer 계정 필요**
- 개인: $99/년
- 조직: $99/년

**2. 인증서 및 프로비저닝 프로파일 생성**
```bash
# Xcode에서 자동 관리 또는 수동 생성
```

**3. 앱 아이콘 및 스플래시 스크린 설정**

**4. 빌드 번호 및 버전 설정**
```xml
<!-- ios/MyApp/Info.plist -->
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>
```

**5. Release 빌드**
```bash
# Xcode에서
Product > Archive

# 또는 CLI
xcodebuild -workspace ios/MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Release \
  archive
```

**6. App Store Connect 업로드**
- Xcode Organizer 사용
- 또는 Transporter 앱 사용

**7. TestFlight 베타 테스트**

**8. App Store 제출**

---

## 2. Android 앱 배포 과정은?

**답변:**

**1. 서명 키 생성**
```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000
```

**2. gradle.properties 설정**
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

**3. build.gradle 설정**
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
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

**4. AAB 빌드**
```bash
cd android
./gradlew bundleRelease
```

**5. Google Play Console 업로드**
- Internal Testing
- Closed Testing
- Open Testing
- Production

---

## 3. CodePush 사용법은?

**답변:**

**설치:**
```bash
npm install --save react-native-code-push
appcenter-cli login
appcenter apps create -d MyApp-iOS -o iOS -p React-Native
appcenter apps create -d MyApp-Android -o Android -p React-Native
```

**설정:**
```jsx
import codePush from 'react-native-code-push';

const App = () => {
  // ...
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
})(App);
```

**배포:**
```bash
# iOS
appcenter codepush release-react -a <username>/MyApp-iOS -d Production

# Android
appcenter codepush release-react -a <username>/MyApp-Android -d Production
```

---

## 4. Fastlane 사용법은?

**답변:**

**설치:**
```bash
gem install fastlane
cd ios
fastlane init
```

**Fastfile:**
```ruby
platform :ios do
  desc "Push a new beta build to TestFlight"
  lane :beta do
    increment_build_number
    build_app(scheme: "MyApp")
    upload_to_testflight
  end
  
  desc "Deploy to App Store"
  lane :release do
    increment_build_number
    build_app(scheme: "MyApp")
    upload_to_app_store
  end
end

platform :android do
  desc "Deploy to Play Store"
  lane :deploy do
    gradle(task: "clean bundleRelease")
    upload_to_play_store
  end
end
```

**실행:**
```bash
fastlane ios beta
fastlane android deploy
```

---

## 5. 환경 변수 관리 방법은?

**답변:**

**react-native-config 설치:**
```bash
npm install react-native-config
```

**.env 파일:**
```
API_URL=https://api.example.com
API_KEY=your_api_key
```

**.env.production:**
```
API_URL=https://api.production.com
API_KEY=production_key
```

**사용:**
```jsx
import Config from 'react-native-config';

const apiUrl = Config.API_URL;
const apiKey = Config.API_KEY;
```

**빌드:**
```bash
# iOS
ENVFILE=.env.production react-native run-ios

# Android
ENVFILE=.env.production react-native run-android
```

---

## 6. 앱 버전 관리 전략은?

**답변:**

**Semantic Versioning (MAJOR.MINOR.PATCH):**
- MAJOR: 호환되지 않는 변경
- MINOR: 기능 추가 (하위 호환)
- PATCH: 버그 수정

**예시:**
- 1.0.0 → 초기 릴리스
- 1.0.1 → 버그 수정
- 1.1.0 → 새 기능 추가
- 2.0.0 → 주요 변경

**자동화:**
```bash
npm install --save-dev standard-version

# package.json
{
  "scripts": {
    "release": "standard-version"
  }
}

npm run release
```

---

## 7. 앱 크기 최적화 방법은?

**답변:**

**Android:**
```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt')
        }
    }
    
    // App Bundle 사용
    bundle {
        language {
            enableSplit = true
        }
        density {
            enableSplit = true
        }
        abi {
            enableSplit = true
        }
    }
}
```

**iOS:**
- Bitcode 활성화
- 불필요한 아키텍처 제거
- 이미지 최적화

**공통:**
- 불필요한 라이브러리 제거
- 이미지 압축
- Hermes 엔진 사용

---

## 8. 앱 보안 설정은?

**답답:**

**SSL Pinning:**
```bash
npm install react-native-ssl-pinning
```

```jsx
import { fetch } from 'react-native-ssl-pinning';

fetch('https://api.example.com', {
  method: 'GET',
  sslPinning: {
    certs: ['cert1', 'cert2'],
  },
});
```

**민감한 데이터 저장:**
```bash
npm install react-native-keychain
```

```jsx
import * as Keychain from 'react-native-keychain';

// 저장
await Keychain.setGenericPassword('username', 'password');

// 읽기
const credentials = await Keychain.getGenericPassword();
```

**코드 난독화:**
- ProGuard (Android)
- Obfuscation (iOS)

---

## 9. 충돌 보고 설정은?

**답변:**

**Firebase Crashlytics:**
```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/crashlytics
```

```jsx
import crashlytics from '@react-native-firebase/crashlytics';

// 에러 로깅
crashlytics().recordError(new Error('Test error'));

// 사용자 정보 설정
crashlytics().setUserId('user123');

// 커스텀 로그
crashlytics().log('User clicked button');
```

**Sentry:**
```bash
npm install @sentry/react-native
```

```jsx
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-dsn',
  enableAutoSessionTracking: true,
  tracesSampleRate: 1.0,
});
```

---

## 10. CI/CD 파이프라인 구성은?

**답변:**

**GitHub Actions (.github/workflows/deploy.yml):**
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
      - name: Install pods
        run: cd ios && pod install
      - name: Build and deploy
        run: fastlane ios beta
        env:
          FASTLANE_USER: ${{ secrets.FASTLANE_USER }}
          FASTLANE_PASSWORD: ${{ secrets.FASTLANE_PASSWORD }}
  
  deploy-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Build and deploy
        run: fastlane android deploy
        env:
          PLAY_STORE_JSON_KEY: ${{ secrets.PLAY_STORE_JSON_KEY }}
```

**Bitrise, CircleCI, Jenkins 등도 사용 가능**
