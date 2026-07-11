# 네이티브 모듈

## 1. 네이티브 모듈이란?

**답변:**
네이티브 모듈은 JavaScript에서 네이티브 코드(Java/Kotlin, Objective-C/Swift)를 호출할 수 있게 해주는 브리지입니다.

**사용 시기:**
- 네이티브 API 접근 (카메라, 센서 등)
- 성능이 중요한 작업
- 기존 네이티브 라이브러리 통합
- React Native에서 지원하지 않는 기능

---

## 2. Android 네이티브 모듈 생성 방법은?

**답변:**

**1. 모듈 클래스 생성 (Java):**
```java
// CalendarModule.java
package com.myapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class CalendarModule extends ReactContextBaseJavaModule {
    CalendarModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createEvent(String name, String location, Promise promise) {
        try {
            // 네이티브 코드 실행
            promise.resolve("Event created");
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }
}
```

**2. 패키지 클래스 생성:**
```java
// CalendarPackage.java
package com.myapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CalendarPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new CalendarModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```

**3. 패키지 등록:**
```java
// MainApplication.java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new CalendarPackage()
    );
}
```

---

## 3. iOS 네이티브 모듈 생성 방법은?

**답변:**

**Objective-C:**
```objc
// CalendarModule.h
#import <React/RCTBridgeModule.h>

@interface CalendarModule : NSObject <RCTBridgeModule>
@end

// CalendarModule.m
#import "CalendarModule.h"

@implementation CalendarModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createEvent:(NSString *)name
                  location:(NSString *)location
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    // 네이티브 코드 실행
    resolve(@"Event created");
  } @catch (NSException *exception) {
    reject(@"Error", @"Failed to create event", nil);
  }
}

@end
```

**Swift:**
```swift
// CalendarModule.swift
@objc(CalendarModule)
class CalendarModule: NSObject {
  @objc
  func createEvent(_ name: String, location: String,
                   resolver resolve: @escaping RCTPromiseResolveBlock,
                   rejecter reject: @escaping RCTPromiseRejectBlock) {
    do {
      // 네이티브 코드 실행
      resolve("Event created")
    } catch {
      reject("Error", "Failed to create event", error)
    }
  }
}

// CalendarModule.m (브리지 파일)
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarModule, NSObject)
RCT_EXTERN_METHOD(createEvent:(NSString *)name
                  location:(NSString *)location
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
```

---

## 4. JavaScript에서 네이티브 모듈 호출 방법은?

**답변:**

```jsx
import { NativeModules } from 'react-native';

const { CalendarModule } = NativeModules;

// Promise 기반 호출
const createEvent = async () => {
  try {
    const result = await CalendarModule.createEvent(
      'Party',
      'My House'
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
```

**TypeScript 타입 정의:**
```typescript
interface ICalendarModule {
  createEvent(name: string, location: string): Promise<string>;
}

const CalendarModule = NativeModules.CalendarModule as ICalendarModule;
```

---

## 5. 네이티브 이벤트 전송 방법은?

**답변:**

**Android:**
```java
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

private void sendEvent(String eventName, WritableMap params) {
    getReactApplicationContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
}

@ReactMethod
public void startMonitoring() {
    WritableMap params = Arguments.createMap();
    params.putString("status", "started");
    sendEvent("MonitoringEvent", params);
}
```

**iOS:**
```objc
#import <React/RCTEventEmitter.h>

@interface CalendarModule : RCTEventEmitter <RCTBridgeModule>
@end

@implementation CalendarModule

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"MonitoringEvent"];
}

- (void)startMonitoring {
  [self sendEventWithName:@"MonitoringEvent"
                     body:@{@"status": @"started"}];
}

@end
```

**JavaScript 수신:**
```jsx
import { NativeEventEmitter, NativeModules } from 'react-native';

const { CalendarModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(CalendarModule);

useEffect(() => {
  const subscription = eventEmitter.addListener(
    'MonitoringEvent',
    (event) => {
      console.log(event.status);
    }
  );
  
  return () => subscription.remove();
}, []);
```

---

## 6. 네이티브 UI 컴포넌트 생성 방법은?

**답변:**

**Android (ViewManager):**
```java
public class CustomViewManager extends SimpleViewManager<CustomView> {
    @Override
    public String getName() {
        return "CustomView";
    }

    @Override
    protected CustomView createViewInstance(ThemedReactContext context) {
        return new CustomView(context);
    }

    @ReactProp(name = "color")
    public void setColor(CustomView view, String color) {
        view.setBackgroundColor(Color.parseColor(color));
    }
}
```

**iOS (ViewManager):**
```objc
// CustomViewManager.m
#import <React/RCTViewManager.h>

@interface CustomViewManager : RCTViewManager
@end

@implementation CustomViewManager

RCT_EXPORT_MODULE()

- (UIView *)view {
  return [[UIView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(color, UIColor)

@end
```

**JavaScript 사용:**
```jsx
import { requireNativeComponent } from 'react-native';

const CustomView = requireNativeComponent('CustomView');

<CustomView color="#FF0000" style={{ width: 100, height: 100 }} />
```

---

## 7. Turbo Modules란?

**답변:**
Turbo Modules는 새로운 네이티브 모듈 시스템으로, 기존 Bridge를 대체합니다.

**특징:**
- JSI (JavaScript Interface) 사용
- 동기 호출 가능
- 타입 안정성
- 지연 로딩
- 더 나은 성능

**생성 (TypeScript):**
```typescript
// NativeMyModule.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getString(id: string): Promise<string>;
  getNumber(id: string): number;
  getBool(id: string): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('MyModule');
```

---

## 8. 네이티브 모듈 디버깅 방법은?

**답변:**

**Android (Logcat):**
```java
import android.util.Log;

Log.d("CalendarModule", "Creating event: " + name);
```

**iOS (NSLog):**
```objc
NSLog(@"Creating event: %@", name);
```

**JavaScript:**
```jsx
console.log('Calling native module');
```

**Flipper 사용:**
- Network 플러그인
- Logs 플러그인
- React DevTools

---

## 9. 자주 사용하는 네이티브 모듈은?

**답변:**

**카메라:**
```bash
npm install react-native-camera
```

**위치:**
```bash
npm install @react-native-community/geolocation
```

**파일 시스템:**
```bash
npm install react-native-fs
```

**생체 인증:**
```bash
npm install react-native-biometrics
```

**푸시 알림:**
```bash
npm install @react-native-firebase/messaging
```

---

## 10. 네이티브 모듈 권한 처리는?

**답변:**

**Android (AndroidManifest.xml):**
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

**iOS (Info.plist):**
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need location access</string>
```

**런타임 권한 요청:**
```jsx
import { PermissionsAndroid, Platform } from 'react-native';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};
```
