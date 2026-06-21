/**
 * 마이피드(abl_landing) 파일럿 신청 폼 → 구글시트 실시간 수집
 *
 * 시트 1행(헤더)에 아래 7개를 순서대로 입력해 두세요:
 * 제출시각 | 성함 | 연락처 | 이메일 | 회사 | 직함 | 문의내용
 *
 * 폼은 이 주소로 신청 데이터를 그대로 보냅니다(name/phone/email/company/title/message/submittedAt).
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var p = (e && e.parameter) ? e.parameter : {};
  sheet.appendRow([
    p.submittedAt || new Date().toISOString(),
    p.name    || "",
    p.phone   || "",
    p.email   || "",
    p.company || "",
    p.title   || "",
    p.message || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 브라우저로 주소를 직접 열었을 때 동작 확인용(선택)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: "myfeed endpoint live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
