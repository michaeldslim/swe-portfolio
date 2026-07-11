# React와 React Native: 개발 워크플로우

React와 React Native 사이의 개발 워크플로우는 상당히 다릅니다. 이 문서에서는 두 플랫폼의 설정, 도구, 개발 프로세스를 살펴봅니다.

## 새 프로젝트 설정하기

### React(웹)

새 React 프로젝트를 설정하는 것은 일반적으로 Create React App이나 Next.js 또는 Vite와 같은 현대적인 프레임워크를 사용합니다:

```bash
# Create React App 사용
npx create-react-app my-web-app
cd my-web-app
npm start

# Next.js 사용
npx create-next-app my-nextjs-app
cd my-nextjs-app
npm run dev

# Vite 사용
npm create vite@latest my-vite-app --template react
cd my-vite-app
npm install
npm run dev
```

### React Native

React Native 프로젝트 설정은 React Native CLI나 Expo를 사용하여 수행할 수 있습니다 [[1]](https://radixweb.com/blog/react-vs-react-native):

```bash
# React Native CLI 사용
npx react-native@latest init MyRNApp
cd MyRNApp
npx react-native start

# 별도의 터미널에서(iOS의 경우)
npx react-native run-ios

# 또는 Android의 경우
npx react-native run-android

# Expo 사용(초보자에게 권장)
npx create-expo-app MyExpoApp
cd MyExpoApp
npx expo start
```

## 프로젝트 구조

### React(웹) - 일반적인 구조

```
my-web-app/
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── components/
│   │   └── ...
│   ├── pages/
│   │   └── ...
│   ├── assets/
│   │   └── ...
│   └── ...
├── package.json
├── package-lock.json
└── README.md
```

### React Native - 일반적인 구조

```
MyRNApp/
├── android/           // Android 특화 네이티브 코드
├── ios/               // iOS 특화 네이티브 코드
├── node_modules/
├── src/
│   ├── App.js
│   ├── components/
│   │   └── ...
│   ├── screens/
│   │   └── ...
│   ├── assets/
│   │   └── ...
│   └── ...
├── app.json          // 앱 구성
├── index.js          // 진입점
├── package.json
├── package-lock.json
└── README.md
```

### Expo 구조

```
MyExpoApp/
├── assets/
├── node_modules/
├── src/
│   ├── components/
│   │   └── ...
│   ├── screens/
│   │   └── ...
│   └── ...
├── App.js
├── app.json        // Expo 구성
├── package.json
├── package-lock.json
└── README.md
```

## 개발 환경

### React(웹)

- **브라우저**: 주요 런타임 환경
- **DevTools**: 브라우저 DevTools + React DevTools 확장
- **핫 리로드**: 코드 변경 시 자동 새로고침
- **디버깅**: 브라우저 콘솔, 중단점, React DevTools

### React Native

- **에뮬레이터/시뮬레이터**: iOS 시뮬레이터, Android 에뮬레이터
- **물리적 기기**: 실제 iOS/Android 기기
- **DevTools**: React Native Debugger, Flipper
- **핫 리로드**: 코드 변경 시 새로고침
- **디버깅**: 원격 JavaScript 디버깅, 네이티브 디버깅 도구

## 빌드 및 배포

### React(웹)

```bash
# Create React App
npm run build
# 배포 준비가 된 /build 디렉토리의 출력

# Next.js
npm run build
npm run start # 서버 사이드 렌더링의 경우
# 또는 정적 사이트로 내보내기
npm run export
```

배포 옵션에는 다음이 포함됩니다:
- 정적 호스팅 서비스(Netlify, Vercel, GitHub Pages)
- 클라우드 서비스(AWS, Google Cloud, Azure)
- 전통적인 웹 서버

### React Native

```bash
# Android
cd android
./gradlew assembleRelease

# iOS(Xcode 필요)
cd ios
pod install
# 그런 다음 Xcode를 통해 빌드

# Expo
eas build -p android
eas build -p ios
```

배포 옵션에는 다음이 포함됩니다:
- Google Play 스토어(Android)
- Apple App Store(iOS)
- 기업용 배포
- 무선 업데이트(CodePush나 Expo Updates와 같은 서비스 사용)

## 테스팅

### React(웹)

```bash
# Jest와 React Testing Library 사용(CRA에 포함됨)
npm test

# Cypress로 엔드투엔드 테스팅
npx cypress open
```

일반적인 테스팅 도구:
- Jest: 단위 및 통합 테스팅
- React Testing Library: 컴포넌트 테스팅
- Cypress/Playwright: 엔드투엔드 테스팅

### React Native

```bash
# Jest 사용
npm test

# 컴포넌트 테스팅
npm install --save-dev @testing-library/react-native

# Detox로 엔드투엔드 테스팅
npx detox build
npx detox test
```

일반적인 테스팅 도구:
- Jest: 단위 및 통합 테스팅
- React Native Testing Library: 컴포넌트 테스팅
- Detox: 엔드투엔드 테스팅
- Appium: 모바일 자동화 테스팅

## 개발 과제

### React(웹)

- 크로스 브라우저 호환성
- 다양한 화면 크기에 대한 반응형 디자인
- 느린 기기/연결에 대한 성능 최적화
- SEO 고려사항

### React Native

- 플랫폼별 동작 및 버그
- 네이티브 모듈 통합
- 플랫폼 업데이트(iOS/Android) 따라가기
- 여러 기기 구성에서 테스팅
- 앱 스토어 승인 프로세스

## 개발자 도구

### React(웹)

- **Chrome/Firefox DevTools**: DOM 검사, JavaScript 디버깅
- **React DevTools**: 컴포넌트 계층 구조 검사
- **Redux DevTools**: 상태 관리 디버깅
- **Lighthouse**: 성능 감사

### React Native

- **Flipper**: 디버깅 및 검사
- **React Native Debugger**: React DevTools와 Redux DevTools 결합
- **Reactotron**: 상태, API, 성능 디버깅
- **Xcode/Android Studio**: 네이티브 코드 디버깅

## 코드 공유 전략

두 플랫폼을 모두 개발할 때, 여러 전략을 사용할 수 있습니다:

### 1. React Native Web

React Native 컴포넌트가 웹에서 실행되도록 허용:

```bash
npm install react-native-web
```

### 2. 모노레포 접근 방식

Nx나 Turborepo와 같은 도구를 사용하여 플랫폼 간에 코드 공유:

```bash
npx create-nx-workspace my-cross-platform-app
# React 및 React Native 애플리케이션 추가
npx nx g @nrwl/react:app web
npx nx g @nrwl/react-native:app mobile
```

### 3. 공유 로직 라이브러리

플랫폼별 UI를 별도로 유지하되 비즈니스 로직 공유:

```
my-cross-platform-app/
├── packages/
│   ├── shared/             # 공유 비즈니스 로직, 유틸리티
│   │   └── ...
│   ├── web-app/            # React 웹 애플리케이션
│   │   └── ...
│   └── mobile-app/         # React Native 애플리케이션
│       └── ...
└── package.json
```

## 개발 워크플로우 비교

| 측면 | React(웹) | React Native |
|--------|-------------|-------------|
| 설정 복잡성 | 더 단순, 의존성 적음 | 더 복잡, 네이티브 의존성 |
| 개발 환경 | 브라우저 | 에뮬레이터, 시뮬레이터, 물리적 기기 |
| 반복 속도 | 일반적으로 더 빠름 | 네이티브 컴파일로 인해 약간 느림 |
| 핫 리로딩 | 지원됨 | 지원됨 |
| 디버깅 | 브라우저 DevTools | React Native Debugger, Flipper |
| 테스팅 | 잘 확립된 생태계 | 성장하는 생태계, 더 많은 복잡성 |
| 빌드 | 정적 자산으로 빠른 빌드 | 더 긴 빌드, 네이티브 컴파일 |
| 배포 | 간단한 호스팅 옵션 | 앱 스토어 검토 프로세스 |
| CI/CD | 쉽게 자동화 | 네이티브 빌드에 더 복잡한 설정 |

## 권장 개발 사례

### React(웹)

1. 개선된 개발자 경험을 위해 Next.js와 같은 현대적인 프레임워크 사용
2. 적절한 코드 분할 및 지연 로딩 구현
3. 반응형 디자인 모범 사례 따르기
4. 핵심 웹 바이탈 최적화
5. 프로그레시브 웹 앱 기능 고려

### React Native

1. 네이티브 커스터마이징이 제한적인 경우 더 간단한 개발을 위해 Expo 사용
2. 여러 기기 크기 및 OS 버전에서 테스트
3. 적절한 오류 경계 및 충돌 보고 구현
4. 적절한 경우 플랫폼별 디자인 고려
5. 앱 크기 및 시작 성능 최적화

## 참조

- [[1]](https://radixweb.com/blog/react-vs-react-native) - React vs React Native - Key Difference, Features, Advantages
- [[2]](https://brainhub.eu/library/react-vs-react-native) - React Native vs React - Ultimate Comparison
