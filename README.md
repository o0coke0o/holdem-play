# holdem-play

텍사스 홀덤 · 블랙잭 연습 게임 (한 파일씩, 빌드 없음).

- `index.html` — 블랙잭(`#bj`). 주소 끝에 `#bj` 가 없으면 `holdem.html` 로 넘어간다.
- `holdem.html` — 홀덤. 메뉴 → 친구 대전에서 같은 방 이름으로 들어온 사람끼리 한 테이블에 앉는다.

친구 대전의 판 상태는 Supabase 표 `holdem_rooms` 에, 행동 신호는 실시간 broadcast 채널 `holdem-<방>` 에 오간다.
