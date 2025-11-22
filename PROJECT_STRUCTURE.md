# 프로젝트 파일 구조 가이드

## 📁 권장 구조

```
src/
├── app/                    # 앱 초기화 및 설정
│   ├── providers/          # 전역 Provider들
│   │   ├── RouterProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   ├── routes/             # 라우트 설정
│   │   └── routes.tsx
│   └── App.tsx             # 앱 진입점
│
├── pages/                  # 페이지 컴포넌트 (라우트 단위)
│   ├── Home/
│   │   └── index.tsx
│   ├── Search/
│   │   └── index.tsx
│   ├── WritingDetail/
│   │   └── index.tsx
│   └── Error/
│       └── index.tsx
│
├── features/               # 기능별 모듈 (Feature-Sliced Design)
│   ├── Header/
│   │   ├── components/     # Header 전용 컴포넌트
│   │   ├── hooks/          # Header 전용 훅
│   │   ├── context/        # Header 전용 컨텍스트
│   │   ├── lib/            # Header 전용 유틸
│   │   ├── types/          # Header 전용 타입
│   │   └── index.tsx
│   │
│   ├── Home/
│   │   ├── Popular/       # 인기글 기능
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   └── types/
│   │   ├── Recommand/     # 추천 기능
│   │   └── ...
│   │
│   ├── Search/
│   ├── WritingDetail/
│   └── Auth/               # 인증 기능 (추가 예정)
│
├── shared/                 # 공유 리소스
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   ├── ui/             # 기본 UI 컴포넌트 (Button, Input 등)
│   │   ├── blocks/         # 레이아웃 블록 (Wrapper, Container 등)
│   │   └── features/       # 기능별 공유 컴포넌트
│   │       ├── CategoryBreadCrump.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── SeriesDropdown.tsx
│   │       └── UserDropdown.tsx
│   │
│   ├── hooks/              # 공통 훅
│   ├── lib/                # 공통 유틸리티
│   │   ├── api/            # API 클라이언트
│   │   ├── utils/          # 유틸 함수
│   │   └── constants/      # 상수
│   │
│   ├── types/              # 공통 타입
│   │   ├── User.ts
│   │   ├── Writing.ts
│   │   └── index.ts
│   │
│   └── styles/             # 스타일
│       ├── tokens/         # 디자인 토큰
│       ├── modules/         # CSS Modules
│       └── global/          # 전역 스타일
│
├── entities/               # 비즈니스 엔티티 (선택사항)
│   ├── User/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   └── Writing/
│
├── widgets/                # 복합 UI 블록 (선택사항)
│   └── UserProfileCard/
│
├── assets/                 # 정적 자산
│   ├── img/
│   ├── fonts/
│   └── icons/
│
├── mocks/                  # MSW 모킹 데이터
│   ├── handlers.ts
│   ├── browser.ts
│   └── database/
│
└── main.tsx                # 진입점
```

## 🎯 구조 원칙

### 1. **app/** - 앱 레벨 설정
- 전역 Provider, 라우트 설정 등 앱 초기화 관련
- `App.tsx`는 최소한의 로직만 포함

### 2. **pages/** - 라우트 페이지
- 각 라우트에 대응하는 페이지 컴포넌트
- 주로 features를 조합하는 역할
- 비즈니스 로직은 features에 위임

### 3. **features/** - 기능 모듈
- 독립적인 기능 단위
- 각 feature는 자체 components, hooks, lib, types 포함
- 다른 feature에 의존하지 않도록 설계

### 4. **shared/** - 공유 리소스
- 여러 곳에서 사용되는 컴포넌트, 훅, 유틸
- features 간 공유되는 것들

### 5. **entities/** (선택사항)
- 비즈니스 엔티티 (User, Writing 등)
- 엔티티 관련 로직과 컴포넌트

## 📝 현재 구조 개선 방안

### 즉시 개선 가능한 사항

1. **components → shared/components로 이동**
   ```
   components/
   └── shared/  →  shared/components/
   ```

2. **lib → shared/lib로 이동**
   ```
   lib/  →  shared/lib/
   ```

3. **types → shared/types로 이동**
   ```
   types/  →  shared/types/
   ```

4. **styles → shared/styles로 이동**
   ```
   styles/  →  shared/styles/
   ```

5. **context → app/providers로 이동**
   ```
   context/  →  app/providers/
   ```

### 단계별 마이그레이션

#### Phase 1: 공유 리소스 정리
- `components/` → `shared/components/`
- `lib/` → `shared/lib/`
- `types/` → `shared/types/`
- `styles/` → `shared/styles/`

#### Phase 2: 앱 레벨 정리
- `context/` → `app/providers/`
- 라우트 설정을 `app/routes/`로 분리

#### Phase 3: features 정리
- 각 feature 내부 구조 일관화
- feature 간 의존성 최소화

## 🔄 마이그레이션 예시

### Before (현재)
```typescript
// src/App.tsx
import Header from "features/Header";
import { LoginProvider } from "context/login";
```

### After (개선)
```typescript
// src/app/App.tsx
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

// src/app/providers/index.tsx
export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <MessageProvider>
        <LoginProvider>
          {children}
        </LoginProvider>
      </MessageProvider>
    </BrowserRouter>
  );
}
```

## ✅ 파일 구조 체크리스트

- [ ] `shared/` 폴더 생성 및 공유 리소스 이동
- [ ] `app/` 폴더 생성 및 앱 레벨 설정 이동
- [ ] 각 feature 내부 구조 일관화
- [ ] import 경로 일괄 수정
- [ ] 절대 경로 alias 설정 확인 (`@/` 등)

## 📚 참고 자료

- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Project Structure Best Practices](https://react.dev/learn/thinking-in-react)

