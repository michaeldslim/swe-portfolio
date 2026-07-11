# 접근성과 국제화

접근성 props로 앱을 접근 가능하게 만들고 스크린 리더로 테스트하세요. i18n 라이브러리를 사용하여 여러 언어를 지원하세요.

**예시 (접근성):**
```tsx
<Text accessibilityLabel="닫기 버튼" accessible>
  X
</Text>
```
*이것은 스크린 리더를 위한 레이블을 제공합니다.*

**예시 (i18n):**
```tsx
import i18n from 'i18n-js';
i18n.translations = { en: { hello: 'Hello' }, ko: { hello: '안녕하세요' } };
i18n.locale = 'ko';
<Text>{i18n.t('hello')}</Text>
```
*이것은 로케일이 한국어인 경우 "안녕하세요"를 표시합니다.*
