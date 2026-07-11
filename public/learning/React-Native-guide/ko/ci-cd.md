# 지속적 통합/지속적 배포 (CI/CD)

Fastlane, Bitrise, GitHub Actions와 같은 도구로 빌드, 테스트, 배포를 자동화하세요. 이것은 코드 품질을 보장하고 릴리스 속도를 높입니다.

**예시 (GitHub Actions 워크플로우):**
```yaml
name: Build and Test
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: yarn install
      - run: yarn test
```
*이것은 모든 푸시마다 자동으로 테스트를 실행합니다.*
