# Accessibility and Internationalization

Make apps accessible with accessibility props and test with screen readers. Support multiple languages using i18n libraries.

**Example (Accessibility):**
```tsx
<Text accessibilityLabel="Close button" accessible>
  X
</Text>
```
*This provides a label for screen readers.*

**Example (i18n):**
```tsx
import i18n from 'i18n-js';
i18n.translations = { en: { hello: 'Hello' }, fr: { hello: 'Bonjour' } };
i18n.locale = 'fr';
<Text>{i18n.t('hello')}</Text>
```
*This displays “Bonjour” if the locale is French.*
