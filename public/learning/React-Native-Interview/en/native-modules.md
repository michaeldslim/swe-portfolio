# Native Modules

## 1. What are Native Modules?

Native modules are bridges that allow JavaScript to call native code (Java/Kotlin, Objective-C/Swift).

**Use Cases:**
- Access native APIs (camera, sensors)
- Performance-critical operations
- Integrate existing native libraries
- Features not supported by React Native

---

## 2. Creating Android Native Module?

```java
// CalendarModule.java
public class CalendarModule extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createEvent(String name, String location, Promise promise) {
        try {
            promise.resolve("Event created");
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }
}

// CalendarPackage.java
public class CalendarPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new CalendarModule(reactContext));
        return modules;
    }
}
```

---

## 3. Creating iOS Native Module?

```objc
// CalendarModule.m
#import <React/RCTBridgeModule.h>

@interface CalendarModule : NSObject <RCTBridgeModule>
@end

@implementation CalendarModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(createEvent:(NSString *)name
                  location:(NSString *)location
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  resolve(@"Event created");
}

@end
```

---

## 4. Calling Native Modules from JavaScript?

```jsx
import { NativeModules } from 'react-native';

const { CalendarModule } = NativeModules;

const createEvent = async () => {
  try {
    const result = await CalendarModule.createEvent('Party', 'My House');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
```

---

## 5. Sending Native Events?

**Android:**
```java
private void sendEvent(String eventName, WritableMap params) {
    getReactApplicationContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
}
```

**iOS:**
```objc
@interface CalendarModule : RCTEventEmitter <RCTBridgeModule>
@end

- (NSArray<NSString *> *)supportedEvents {
  return @[@"MonitoringEvent"];
}

- (void)startMonitoring {
  [self sendEventWithName:@"MonitoringEvent" body:@{@"status": @"started"}];
}
```

**JavaScript:**
```jsx
const eventEmitter = new NativeEventEmitter(CalendarModule);

useEffect(() => {
  const subscription = eventEmitter.addListener('MonitoringEvent', (event) => {
    console.log(event.status);
  });
  return () => subscription.remove();
}, []);
```

---

## 6. Creating Native UI Components?

**Android:**
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

**JavaScript:**
```jsx
const CustomView = requireNativeComponent('CustomView');
<CustomView color="#FF0000" style={{ width: 100, height: 100 }} />
```

---

## 7. What are Turbo Modules?

Turbo Modules are the new native module system replacing the Bridge.

**Features:**
- Uses JSI (JavaScript Interface)
- Synchronous calls possible
- Type safety
- Lazy loading
- Better performance

---

## 8. Debugging Native Modules?

**Android (Logcat):**
```java
Log.d("CalendarModule", "Creating event: " + name);
```

**iOS (NSLog):**
```objc
NSLog(@"Creating event: %@", name);
```

**Tools:**
- Flipper
- Android Studio Logcat
- Xcode Console

---

## 9. Popular Native Modules?

**Camera:**
```bash
npm install react-native-camera
```

**Location:**
```bash
npm install @react-native-community/geolocation
```

**Biometrics:**
```bash
npm install react-native-biometrics
```

**Push Notifications:**
```bash
npm install @react-native-firebase/messaging
```

---

## 10. Permission Handling?

**Android (AndroidManifest.xml):**
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

**iOS (Info.plist):**
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access</string>
```

**Runtime Request:**
```jsx
import { PermissionsAndroid } from 'react-native';

const granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.CAMERA
);
```
