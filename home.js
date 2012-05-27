// ホーム画面用 JavaScript
//
// 必要ライブラリ
// - dino100.js
//
// 参考ドキュメント
// - Geolocation: https://developer.mozilla.org/ja/Using_geolocation
// - 逆ジオコーディング: https://developers.google.com/maps/documentation/javascript/services?hl=ja#ReverseGeocoding

$(function() {
  /**
   * @return 逆ジオコーディングの結果が福井県かどうか
   * FIXME types をチェックしてないので、県名以外が「福井県」のときにも true
   * を返してしまいます。
   */
  function isGeocodeResultFukuiPrefecture(results) {
    var result = false;
    $.each(results, function() {
      $.each(this.address_components, function() {
        if (this.long_name === "福井県" || this.long_name === "Fukui Prefecture") {
          result = true;
          return false;
        }
      });
      if (result) { return false; }
    });
    return result;
  }

  /**
   * @return 逆ジオコーディングの結果が恐竜博物館かどうか
   */
  function isGeocodeResultMuseum(results) {
    return false;
  }

  // レベル1の問題を設定する
  $("li.level:nth-child(1) > a").attr("href", dino100.getQuizLevel1());

  // レベル2, レベル3の有効/無効と、問題を設定する
  var geocoder = new google.maps.Geocoder();
  navigator.geolocation.getCurrentPosition(function(position) {
    var latlng = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude);
    geocoder.geocode({"latLng": latlng}, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        console.info("status is " + status);
        return;
      }
      if (isGeocodeResultFukuiPrefecture(results)) {
        $("li.level:nth-child(2)").removeClass("disable");
        $("li.level:nth-child(2) > a").attr("href", dino100.getQuizLevel2());
      }
      if (isGeocodeResultMuseum(results)) {
        $("li.level:nth-child(3)").removeClass("disable");
        $("li.level:nth-child(3) > a").attr("href", dino100.getQuizLevel3());
      }
    });
  });
});
