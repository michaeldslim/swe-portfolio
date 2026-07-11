# Git Submodule 완전 정리 (예: `./react-blog`에서 공용 라이브러리 쓰기)

## 1. Git Submodule이란?

- **정의**
  - 한 Git 저장소 안에 **다른 Git 저장소를 “폴더 형태로” 포함**시키는 기능.
  - 포함된 저장소를 **Submodule(서브모듈)** 이라고 부름.
- **핵심 개념**
  - 메인 repo(예: `react-blog`)는 서브모듈 repo의 **커밋 해시만 가리킴**.
  - 서브모듈의 **코드는 별도 Git 히스토리**로 관리됨 (독립 프로젝트).
- **언제 쓰는지**
  - 여러 프로젝트에서 **공유 라이브러리/디자인 시스템/공용 설정** 등을 같이 쓸 때
  - 공유 코드도 **별도 리포로 독립 배포/버전 관리**하고 싶을 때

---

## 2. Submodule 기본 사용 흐름 요약

1. **Submodule 추가**
2. **Submodule까지 포함해서 클론**
3. **Submodule 코드 업데이트**
4. **업데이트된 Submodule 버전을 메인 repo에 반영(push)**

각 단계에서 실제 명령을 `./react-blog` 기준으로 정리합니다.

---

## 3. 예시 상황 설정

- **메인 앱**: `react-blog` (현재 작업 중인 repo)
- **공용 라이브러리 repo 예시**: `https://github.com/your-org/shared-lib.git`

**목표**:

- `react-blog` 안에 `shared-lib`를 **서브모듈로 추가**해서
- 다른 프로젝트들과 **같은 공용 라이브러리**를 쓰는 구조 만들기

---

## 4. Submodule 추가 (현재 프로젝트에 연결)

```bash
# react-blog 루트에서 실행
cd ~/Github/react-blog

# shared-lib를 submodule로 추가 (폴더 이름은 자유, 보통 libs/shared-lib 등)
git submodule add https://github.com/your-org/shared-lib.git libs/shared-lib
```

이렇게 되면:

- `libs/shared-lib/` 폴더 안에 공용 라이브러리 코드가 내려오고
- 루트에 `.gitmodules` 파일이 생성됨
- `react-blog`의 커밋에는
  - `.gitmodules` 파일 변경
  - `libs/shared-lib` 폴더가 **특정 커밋을 가리키는 submodule** 으로 기록됨

**이후 해야 할 커밋 작업**

```bash
git status           # 변경 확인
git add .gitmodules libs/shared-lib
git commit -m "feat: add shared-lib submodule"
git push
```

---

## 5. 팀원이 이 repo를 클론할 때(또는 새 컴퓨터에서)

### Submodule 확인 방법

```bash
로컬: ls -a 해서 .gitmodules 있는지 확인 또는 git submodule status

.gitmodules 안의 path, url 항목을 보면
어떤 폴더가 submodule인지
어떤 원격 repo를 가리키는지 한눈에 알 수 있음
```

### 5.1. 처음부터 submodule 포함해서 클론

```bash
git clone --recurse-submodules git@github.com:your-org/react-blog.git
```

### 5.2. 이미 클론한 후 submodule만 초기화/다운로드

```bash
git submodule init
git submodule update
# 또는 한 번에:
git submodule update --init --recursive
```

이 작업을 해야 `libs/shared-lib/` 폴더 안에 실제 코드가 내려옵니다.
그냥 `git clone`만 하면 submodule 폴더가 비어있거나, checkout 안 되어 있을 수 있습니다.

---

## 6. Submodule 코드 변경 → 메인 repo에 “현시 반영” 흐름

### 6.1. Submodule 코드 수정 & 커밋

```bash
cd libs/shared-lib

# 여기서 다른 프로젝트와 공유할 공용 코드 수정
# 예: ts, hooks, 컴포넌트 등

git status
git add .
git commit -m "feat: add new util for blog"
git push   # ★ 공용 라이브러리 repo로 push
```

### 6.2. 메인 repo가 가리키는 submodule 커밋 업데이트

```bash
cd ~/Github/react-blog

git status
# libs/shared-lib 가 "modified (new commits)" 처럼 보임

git add libs/shared-lib
git commit -m "chore: bump shared-lib submodule"
git push
```

이제:

- **공용 라이브러리 repo** 에는 새 코드가 올라갔고
- **react-blog repo** 는 `shared-lib` 의 **새 커밋을 가리키는 상태**가 되어
  다른 팀원이 `git pull && git submodule update` 를 하면 같은 버전을 쓰게 됩니다.

---

## 7. 다른 사람이 라이브러리 수정 후 → Submodule 업데이트 가져오기

누군가 `shared-lib`를 업데이트하고 push했다고 가정합니다.

### 7.1. Submodule에서 새 커밋 가져오기

```bash
cd libs/shared-lib

git pull origin main   # 또는 원하는 브랜치
```

### 7.2. 그 상태를 메인 repo에 반영

```bash
cd ~/Github/react-blog

git add libs/shared-lib
git commit -m "chore: update shared-lib to latest"
git push
```

이제 메인 repo의 HEAD가 **새로운 submodule 커밋**을 가리키게 됩니다.

---

## 8. Submodule을 코드에서 사용하는 방법 (React/TS 관점)

프로젝트 구조에 따라 조금 달라질 수 있지만, Next.js + TypeScript 기준으로 대표적인 방법을 정리합니다.

### 8.1. 단순 경로 import로 사용하는 경우

`libs/shared-lib` 안에 TypeScript 코드가 있다고 가정:

```ts
// 예: src/app/page.tsx 안에서
import { someUtil } from "../../libs/shared-lib/src/someUtil";
```

- **단점**: 상대경로가 길어지거나, 구조 변경에 취약함

### 8.2. `tsconfig.json` 경로 alias로 정리

`tsconfig.json` 예시:

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["libs/shared-lib/src/*"]
    }
  }
}
```

그럼 다음처럼 깔끔하게 import 가능:

```ts
import { someUtil } from "@shared/someUtil";
```

Next.js + TypeScript에서는 이 방식이 실용적입니다.
공용 라이브러리는 TypeScript로 작성해두면 여러 프로젝트에서 재사용하기 좋습니다.

---

## 9. Submodule 삭제/제거

나중에 submodule을 제거하고 싶다면:

```bash
# 1) submodule 디렉터리 stage 제거
git rm -f libs/shared-lib

# 2) .gitmodules 에서 해당 submodule 섹션 삭제
#    (파일 열어서 해당 블록 직접 제거)

# 3) .git/config 에 남은 submodule 설정 삭제 (선택)

git commit -m "chore: remove shared-lib submodule"
git push
```

서브모듈을 완전히 정리하는 것은 다소 까다로울 수 있으니,
처음 설계할 때 구조를 미리 잘 정해두는 것이 좋습니다.

---

## 10. Submodule vs 패키지 배포 (언제 뭘 쓸까?)

- **Submodule이 좋은 경우**
  - 사내 전용 repo, 외부에 배포하고 싶지 않을 때
  - 라이브러리와 앱을 **동시에 개발**하고, 커밋 단위로 맞추고 싶을 때
- **npm 패키지(사설 레지스트리 등)가 좋은 경우**
  - “버전” 개념으로 배포하고 싶을 때 (`1.2.3`)
  - 여러 프로젝트가 `package.json`만 보고 쓸 수 있게 하고 싶을 때

---

## 11. 요약

- `./react-blog` 안에 공용 repo를 가져와 쓰고 싶다면 **Git submodule** 이 대표적인 선택지.
- 기본 흐름:
  - `git submodule add` 로 공용 repo 연결
  - 공용 repo 수정 후 **자체 repo에 push**
  - 메인 repo에서 **submodule 포인터를 commit & push**
  - 팀원은 `git clone --recurse-submodules` 또는 `git submodule update --init` 으로 동기화
- React/TypeScript 프로젝트에서는 `tsconfig.json`의 `paths`를 활용해서
  **`@shared/*` 같은 alias로 import** 를 정리하면 실무에서 사용하기 편합니다.
