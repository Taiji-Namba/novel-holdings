"use strict";
$(function () {
  // ローディングアニメーション
  function runLoadingAnimation() {
    // ロゴフェードイン
    $("#loading-box").fadeIn(300);

    // ロゴフェードアウト
    setTimeout(function () {
      $("#loading-box").fadeOut(300);
    }, 1300);

    setTimeout(function () {
      $("#loading").fadeOut(800);
    }, 2000);
  }

  $(document).ready(function () {
    runLoadingAnimation();
  });

  // 職種一覧のengineerの.job-list__textの高さを取得
  var engineerTextHeight = $(
    ".job-list__item--engineer .job-list__text"
  ).height();

  // .job-list__textの高さをengineerの高さに合わせる
  $(".job-list__text").height(engineerTextHeight);

  $(document).ready(function () {
    // ページ読み込み時の処理
    handleResize();
  });

  $(window).resize(function () {
    // ウィンドウリサイズ時の処理
    handleResize();
  });

  // 社長写真のサイズに応じて白グラデーション透過の高さを調整
  $(document).ready(function () {
    handleResize();
  });

  $(window).resize(function () {
    handleResize();
  });

  function handleResize() {
    var currentBackgroundImage =
      $(".message__contents").css("background-image");
    var urlPart = currentBackgroundImage.split(",").pop().trim();

    if (window.matchMedia("(max-width: 1439px)").matches) {
      var messageContentsWidth = $(".message__contents").outerWidth();
      var messageContentsHeight = $(".message__contents").outerHeight();
      const aspectRatioOfCeoPicture = 752 / 1440;
      var messageContentsCeoPictureHeight =
        messageContentsWidth * aspectRatioOfCeoPicture;

      // 白透過の始点の計算
      var gradationStartPoint =
        (messageContentsCeoPictureHeight / messageContentsHeight) * 100 * 0.33;

      // 白透過の終点の計算
      var gradientEndPoint =
        (messageContentsCeoPictureHeight / messageContentsHeight) * 100;

      var gradientString =
        "linear-gradient(180deg, transparent " +
        gradationStartPoint +
        "%, #fff " +
        gradientEndPoint +
        "%)";
      var newBackgroundImage = gradientString + ", " + urlPart;

      $(".message__contents").css("background-image", newBackgroundImage);
    } else {
      $(".message__contents").css("background-image", urlPart);
    }
  }
});
