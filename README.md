# 🍜 나를 위한 라멘 맛집 찾기

서울 라멘 맛집 탐색을 위한 Vue 3 + Vite 웹 애플리케이션입니다.

## 주요 기능
- 라멘집 목록/상세 보기
- 카테고리/가격/거리 필터
- 별점순/거리순 정렬
- 로그인 후 리뷰 작성
- AI 리뷰 요약/페어링 추천 (Gemini)

## 실행 방법
```bash
npm install
npm run dev
```

## 환경변수
AI 기능 사용 시 아래 환경변수를 설정하세요.

```bash
cp .env.example .env
# .env 파일에 값 입력
VITE_GEMINI_API_KEY=YOUR_KEY
```

## 데모 계정
- `raota`
- `expert`

## 기술 스택
- Vue 3
- Vite
- Tailwind CSS

## 참고
- 기본 기준 위치는 강남역(37.4979, 127.0276)입니다.
- 리뷰는 브라우저 localStorage(`ramen-reviews-v1`)에 저장됩니다.
- AI 기능은 `VITE_GEMINI_API_KEY`가 없으면 안내 메시지를 출력하고 실제 호출하지 않습니다.
