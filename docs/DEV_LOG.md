# DEV_LOG — 마이피드 B2B 랜딩페이지 (abl_landing)

### [2026-06-19 13:10] SOLUTION 섹션 좌우 균형 + 반응형 개선 (CCG)

- Claude+Codex+Gemini 3-AI로 점검 후 적용
- 우측 앱 화면(.sol-screens)을 스크롤 시 따라오도록 고정(sticky) 처리 → 좌측 5단계가 길어 우측 하단에 생기던 빈 공백 해소
- 5단계 마지막 이미지를 현장 사진 → 운영 대시보드로 교체(알림·배차·분석 흐름 정리)
- 모바일에서 단계 이미지 높이 축소(120→90px)로 스크롤 길이 단축
- 구버전 사파리 대비 -webkit-sticky 병기, 화면 좁아지면 고정 자동 해제
- 참고: 서버에 브라우저가 없어 화면 렌더링 확인은 못 함 → Vercel 배포본에서 육안 확인 필요
- [완료]

### [2026-06-16 14:15] 초기 배포 완료

- 에임비랩 마이피드 IoT 사료빈 잔량 관리 솔루션 B2B 랜딩페이지 제작
- GitHub: https://github.com/jbshim1-coder/abl_landing
- Vercel: https://abllanding.vercel.app
- 이미지 7종 WebP 변환 (평균 80% 용량 절감: 3.4MB → 약 600KB)
- Google Apps Script ENDPOINT 삽입 대기 중 (Phase 5)
- [완료]
