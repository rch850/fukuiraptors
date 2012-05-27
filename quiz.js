// クイズ画面用 JavaScript
//
// 必要ライブラリ
// - dino100.js
//

$(function() {
  $("a[href='ans-right.html']").on("click", function() {
    var quiz = location.pathname.substring(location.pathname.lastIndexOf("q"));
    dino100.setSolved(quiz);
  });
});

