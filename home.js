// ホーム画面用 JavaScript
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

  var geocoder = new google.maps.Geocoder();
  navigator.geolocation.getCurrentPosition(function(position) {
    var latlng = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        console.info("status is " + status);
        return;
      }
      if (isGeocodeResultFukuiPrefecture(results)) {
        $('li.level:nth-child(2)').removeClass('disable');
      }
    });
  });
});
