/**
 * 에임비랩 마이피드 랜딩페이지 — 리드 수집 백엔드 (Google Apps Script)
 * ------------------------------------------------------------
 * [설치 방법]
 * 1. Google Sheets 새 시트 생성 → 1행 헤더:
 *    submittedAt | 성명 | 연락처 | 회사명 | 직함 | 이메일 | 궁금한점
 * 2. 확장 프로그램 → Apps Script → 이 코드 붙여넣기
 * 3. NOTIFY_EMAIL 값을 알림 받을 주소로 설정 (비우면 메일 발송 안 함)
 * 4. 배포 → 새 배포 → 유형: 웹 앱
 *      - 실행: 나
 *      - 액세스 권한: 모든 사용자
 * 5. 발급된 웹 앱 URL(.../exec)을 index.html 의 ENDPOINT 에 입력
 * ------------------------------------------------------------
 * index.html은 fetch(mode:"no-cors", FormData)로 전송하므로
 * doPost(e)는 e.parameter 로 값을 받는다.
 */

var NOTIFY_EMAIL = "kobc@aimbelab.com"; // 신규 리드 알림 수신 주소 (불필요하면 "")

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var p = (e && e.parameter) ? e.parameter : {};

    var row = [
      p.submittedAt || new Date().toISOString(),
      p.name    || "",
      p.phone   || "",
      p.company || "",
      p.title   || "",
      p.email   || "",
      p.message || ""
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      var body =
        "마이피드 랜딩페이지에서 새 파일럿 신청이 접수되었습니다.\n\n" +
        "■ 성명: "    + (p.name    || "") + "\n" +
        "■ 연락처: "  + (p.phone   || "") + "\n" +
        "■ 회사명: "  + (p.company || "") + "\n" +
        "■ 직함: "    + (p.title   || "") + "\n" +
        "■ 이메일: "  + (p.email   || "") + "\n" +
        "■ 궁금한 점: " + (p.message || "") + "\n\n" +
        "접수 시각: " + (p.submittedAt || new Date().toISOString());
      MailApp.sendEmail(NOTIFY_EMAIL, "[마이피드] 신규 파일럿 신청 - " + (p.company || "") + " " + (p.name || ""), body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 배포 확인용 (브라우저로 /exec 접속 시)
function doGet() {
  return ContentService.createTextOutput("MyFeed lead endpoint OK");
}
