// 汎用ライブラリ
//
// - LocalStorage の処理はここで隠蔽します。

var dino100 = dino100 || {};
(function() {
  var LV1 = ["q001.html", "q002.html", "q003.html"];
  var LV2 = ["q004.html", "q005.html", "q006.html"];
  var LV3 = ["q007.html", "q008.html", "q009.html"];

  // 初期状態のオブジェクトを入れておく。
  if (!localStorage.dino100) {
    localStorage.dino100 = JSON.stringify({
      solved: [],
      recentQuiz: "",
    });
  }

  function getRandomElement(ary) {
    var obj = JSON.parse(localStorage.dino100);
    var elem = ary[Math.floor(Math.random() * ary.length)];
    while (elem === obj.recentQuiz) {
      elem = ary[Math.floor(Math.random() * ary.length)];
    }
    return elem;
  }

  dino100.getQuizLevel1 = function() {
    var obj = JSON.parse(localStorage.dino100);
    if (obj.solved.length === 0) {
      return "q001.html";
    }
    return getRandomElement(LV1);
  }

  dino100.getQuizLevel2 = function() {
    return getRandomElement(LV2);
  }

  dino100.getQuizLevel3 = function() {
    return getRandomElement(LV3);
  }
})();

