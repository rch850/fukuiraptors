// クイズ画面用 JavaScript
//
// 必要ライブラリ
// - dino100.js
//

$(function() {
  $("a[href='ans-wrong.html']").on("click", function() {
    // http://www.dinosaurfact.net/Sounds.php
    var audio = new Audio("");
    audio.src = "wav/Trex31.wav";
    audio.load();
    audio.play();
  });
  $("a[href='ans-right.html']").on("click", function() {
    var quiz = location.pathname.substring(location.pathname.lastIndexOf("q"));
    dino100.setSolved(quiz);
  });
});

