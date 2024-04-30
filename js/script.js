"use strict";
$(function () {
  // ヘッダーをスクロールに合わせてにゅっと追従
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    const headerHeight = header.offsetHeight; // ヘッダーの高さを取得
    const scrollY = window.scrollY;
    const subPage = document.querySelector("body.sub-page"); // sub-pageクラスを持つbodyを取得

    if (scrollY >= headerHeight) {
      header.classList.add("header--sticky");
      $(".gnav__anchor:not(.button)").css("color", "#333");
      //下層ページのとき
      if (subPage !== null) {
        subPage.style.marginTop = headerHeight + "px"; // コンテンツにヘッダーの高さ分の余白を設定
      }
    } else {
      header.classList.remove("header--sticky");
      if (subPage !== null) {
        subPage.style.marginTop = "0"; // コンテンツの余白をリセット
      } else {
        $(".gnav__anchor:not(.button)").css("color", "#fff");
      }
    }
  });

  //ハンバーガーメニューの実装
  let scrollpos;

  //バーガーボタンを押したとき
  $(".burger-button").on("click", function () {
    if (!$(this).hasClass("open")) {
      $(".burger-button").addClass("open");
      $(".burger-menu").addClass("open");
      $(".burger-menu a").addClass("burger-menu__anchor");
      $(".burger-button").attr("aria-expanded", "true");

      // スクロール位置を保持 & メニューopen時はスクロールできないように
      scrollpos = $(window).scrollTop();
      $("body").addClass("fixed").css({ top: -scrollpos });
    } else {
      $(".burger-button").removeClass("open");
      $(".burger-menu").removeClass("open");
      $(".burger-button").attr("aria-expanded", "false");

      // メニューを閉じる時はfixを解除して元のスクロール位置に戻る
      $("body").removeClass("fixed").css({ top: 0 });
      window.scroll({
        top: scrollpos,
        left: 0,
        behavior: "instant",
      });
    }
  });

  // ハンバーガーメニュー表示時にメニュー以外をクリックしたらスクロール位置を保持したまま閉じる
  $(".burger-menu").on("click", function (event) {
    if (!$(event.target).is("a, button")) {
      $(".burger-button").removeClass("open");
      $(".burger-menu").removeClass("open");
      $(".burger-button").attr("aria-expanded", "false");

      $("body").removeClass("fixed").css({ top: 0 });
      window.scroll({
        top: scrollpos,
        left: 0,
        behavior: "instant",
      });
    }
  });

  // escキーを押したときにハンバーガーメニューやモーダルを閉じる
  $(window).on("keyup", function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      // バーガーメニューが開いていて、かつモーダルが開いていない場合
      if (
        $(".burger-button").hasClass("open") &&
        $("#login-modal-burger.modal-open").length === 0
      ) {
        $(".burger-button").removeClass("open");
        $(".burger-button").attr("aria-expanded", "false");
        $(".burger-menu").removeClass("open");

        // スクロール位置を保持しながら解除
        $("body").removeClass("fixed").css({ top: 0 });
        window.scroll({
          top: scrollpos,
          left: 0,
          behavior: "instant",
        });
        // バーガー展開時にモーダルを閉じる際、バーガーは閉じない
      } else if ($(".modal.modal-open").length > 0) {
        {
          const openedModals = document.querySelectorAll(".modal.modal-open");
          openedModals.forEach(function (modal) {
            const closeButton = modal.querySelector("[data-micromodal-close]");
            if (closeButton) {
              closeButton.click();
            }
          });
        }
      }
    }
  });

  // フォーカストラップ制御
  let focusTrap = document.getElementById("js-focus-trap");
  focusTrap.addEventListener("focus", (e) => {
    $(".burger-button").focus();
  });

  // スムーススクロール(ハンバーガメニューを押したときも動作)
  $('a[href^="#"]').click(function () {
    if ($(this).hasClass("burger-menu__anchor")) {
      $(".burger-button").removeClass("open");
      $(".burger-menu").removeClass("open");
      $(".burger-button").attr("aria-expanded", "false");

      $("body").removeClass("fixed").css({ top: 0 });
      window.scroll({
        top: scrollpos,
        left: 0,
        behavior: "instant",
      });
    }

    let adjust = $(".gnav").outerHeight(true);
    if ($(window).width() <= 1439) {
      adjust = 0;
    }
    let speed = 300;
    let href = $(this).attr("href");
    let target = $(href == "#" || href == "" ? "html" : href);

    let position = target.position().top - adjust;

    if (
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
    ) {
      speed = 500;
      // Safariのスクロールアニメーションの速度を調整
    }

    $("body,html").animate({ scrollTop: position }, speed, "linear");

    return false;
  });

  // モーダルウインドウ(MicroModal使用)
  MicroModal.init({
    openClass: "modal-open",
    disableScroll: true,
    awaitCloseAnimation: true, // モーダルを閉じる際にアニメーション完了を待つ。(本来なくてもいいが、バーガーメニュー内でのバグ対応のため記述)
  });

  // バグ対応(.modal__containerの中では閉じるボタンを押したときのみモーダルを閉じるようにする)
  document.querySelectorAll(".modal").forEach(function (container) {
    container.addEventListener("click", function (event) {
      const modalTarget = event.target;
      if (modalTarget.hasAttribute("data-micromodal-close")) {
        modalTarget.closest(".modal").classList.remove("modal-open");
      } else {
        event.stopPropagation();
      }
    });
  });

  // フォームの必須項目を全て入力しないと送信ボタンを非活性
  $(document).ready(function () {
    const $submitBtn = $("#entry-submit");

    function checkFormValidity() {
      if (
        $('#entry-form input[id="name"]').val() !== "" &&
        $('#entry-form input[id="age"]').val() !== "" &&
        $('#entry-form input[id="email"]').val() !== "" &&
        $('#entry-form input[name="応募職種"]:checked').length > 0 &&
        $('#entry-form textarea[id="academic-background"]').val() !== "" &&
        $('#entry-form textarea[id="about-myself"]').val() !== "" &&
        $("#entry-form #privacy-check").prop("checked") === true
      ) {
        $submitBtn.prop("disabled", false);
      } else {
        $submitBtn.prop("disabled", true);
      }
    }

    $(
      "#entry-form input, #entry-form textarea, #entry-form input[name='応募職種']"
    ).on("input change", checkFormValidity);
    $("#entry-form #privacy-check").on("change", checkFormValidity);
  });
});
