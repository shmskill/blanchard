document.addEventListener("DOMContentLoaded", function () {
  /*** прокрутка по якорным ссылкам в хедере ***/
  scrollHeaderLinks();

  /*** Секция "Header"  ***/
  burgerMenu(); // бургер меню
  searchForm(); // форма поиска
  dropdownMenu(); // раскрывающиеся меню
  dropdownSimpleBar(); // кастомный скроллбар в роскрывающемся меню

  /*** Секция "Hero" ***/
  heroSwiper(); // свайпер фоновой картинки в секции "hero"
  heroBtnMailing(); // клик по кнопке "Подписаться на россылку"

  /*** Секция "Галерея" ***/
  gallerySelect(); // кастомный select
  gallerySwiper(); // свайпер
  galleryModal(); // модальное окно

  /*** Секция "Каталог" ***/
  catalogAccardion(); // аккардион
  catalogSetActivist(); // подгрузка информации об деятеле при клике на линк
  catalogScrollGallery(); // плавный скролл к галереи

  /*** Секция "События" ***/
  eventsSwiper(); // свайпер

  /*** Секция "Проэкты" ***/
  projectsSwiper(); // свайпер
  projectsTippy(); // всплывающие подсказки
  projectsTextLink(); // смена содержимого у ссылки в зависимости от разрешение экрана

  /***  Секция "Контакт" ***/
  yandexMap(); // ЯндексЁ карта

  /*** Секция "Контакты" ***/
  formValidate(); // валиатор формы
});

/*** Бургер меню ***/
function burgerMenu() {
  // open
  document
    .querySelector(".nav-top__burger-menu")
    .addEventListener("click", (ev) => {
      bodyScrollLock();
      ev.preventDefault();
      ev.target.closest(".nav-top").classList.add("nav-top--burger");
    });

  // close
  document
    .querySelector(".top-menu__burger-close")
    .addEventListener("click", (ev) => {
      bodyScrollUnLock();
      ev.preventDefault();
      ev.target.closest(".nav-top").classList.remove("nav-top--burger");
    });
}

/*** Кастомный скролл в выпадающем меню "хедер" ***/
function dropdownSimpleBar() {
  document
    .querySelectorAll(".dropdown-menu__list, .choices__list--dropdown")
    .forEach((el) =>
        new SimpleBar(el, {
          autoHide: false,
          scrollbarMaxSize: 28,
        })
    );
}

/*** Форма поиска в хедере ***/
function searchForm() {
  // open
  document
    .querySelector(".nav-search__btn-open")
    .addEventListener("click", (ev) => {
      ev.target.closest(".nav-top").classList.add("nav-top--search");
    });

  // close
  document
    .querySelector(".nav-search__btn-close")
    .addEventListener("click", (ev) => {
      ev.target.closest(".nav-top").classList.remove("nav-top--search");
    });

    // tabindex
    let tabIndexFunc = () => {
      if (window.matchMedia("(max-width: 1550px)").matches)
        document.querySelector(".nav-search__btn-open").removeAttribute("tabindex");
      else
        document.querySelector(".nav-search__btn-open").setAttribute("tabindex", "-1");
    };

    tabIndexFunc();
    window.addEventListener("resize", () => {
      tabIndexFunc();
    });
}

/*** Выпадающее меню в хедере ***/
function dropdownMenu() {
  const navSearchLinks = document.querySelectorAll(".nav-bottom__link");
  navSearchLinks.forEach((el) => {
    el.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.currentTarget.classList.toggle("nav-bottom__link--active");
      navSearchLinks.forEach((el) => {
        if (el != ev.currentTarget)
          el.classList.remove("nav-bottom__link--active");
      });
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains("nav-bottom__link")) {
      navSearchLinks.forEach(function (e) {
        e.classList.remove("nav-bottom__link--active");
      });
    }
  });
}

/*** Свайпер для секции "Hero" ***/
function heroSwiper() {
  new Swiper(".hero__swiper", {
    speed: 2000,
    autoplay: {
      delay: 2000,
    },
    effect: "fade",
  });
}

function heroBtnMailing() {
  document.querySelector('.hero__btn')
     .addEventListener('click', () => {
        scrollToBlock('contact');
     });
}

/*** Галерея ***/
function gallerySelect() {
  const element = document.querySelector("#gallery-filter");
  new Choices(element, {
    itemSelectText: "",
    position: "bottom",
    searchEnabled: false,
  });
}

function gallerySwiper() {
  new Swiper(".gallery-photos-swiper", {
    spaceBetween: 50,
    slidesPerView: 3,
    slidesPerGroup: 3,
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      580: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 38,
      },
      1280: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    navigation: {
      nextEl: ".gallery-paginate__next",
      prevEl: ".gallery-paginate__prev",
    },
    pagination: {
      el: ".gallery-paginate__info",
      type: "fraction",
    },
    a11y: {
      prevSlideMessage: "Предыдущий",
      nextSlideMessage: "Следующий",
    },
  });
}

function galleryModal() {
  const modal = document.querySelector(".gallery-modal");
  const galleryCollectin = document.querySelectorAll(".gallery-photos__item");

  galleryCollectin.forEach((gallery) => {
    gallery.addEventListener("click", (event) => {
      event.preventDefault();

      const data = event.target.dataset;
      const image = event.target.querySelector(".gallery-photos__img");

      document.querySelector(".gallery-modal__img").setAttribute("src", image.src);
      document.querySelector(".gallery-modal__img").setAttribute("alt", `${data.title}, ${data.subtitle}`);
      document.querySelector(".gallery-modal__title").textContent = data.title;
      document.querySelector(".gallery-modal__subtitle").textContent = data.subtitle;
      document.querySelector(".gallery-modal__date").textContent = data.date;
      document.querySelector(".gallery-modal__text").textContent = data.text;

      modal.classList.add("gallery-modal--open");

      bodyScrollLock();
    });
  });

  // закрытие вне модального окна
  modal.addEventListener("click", (event) => {
    if (!event.target.closest(".gallery-modal__content"))
      modal.classList.remove("gallery-modal--open");
    bodyScrollUnLock();
  });

  // закрытие по кнопке "X"
  document
    .querySelector(".gallery-modal__close")
    .addEventListener("click", (event) => {
      bodyScrollUnLock();
      modal.classList.remove("gallery-modal--open");
    });

  // кастомный скросс
  const galleryWrap = document.querySelector(".gallery-modal__wrap");
  new SimpleBar(galleryWrap, {
    autoHide: false,
    scrollbarMaxSize: 40,
  });
}

/*** Секция "Каталог" ***/
function catalogAccardion() {
  $(".catalog-timeline__list").accordion({
    collapsible: true,
    heightStyle: "content",
    header: ".catalog-timeline__item > .catalog-timeline__header",
  });
}

function catalogSetActivist() {
  // ...
  let dataArts = [
    {
      name: "Доменико Гирландайо",
      date: "2 июня 1448 — 11 января 1494.",
      text: "Один из ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в течение года овладевал профессиональными навыками. Автор фресковых циклов, в которых выпукло, со всевозможными подробностями показана домашняя жизнь библейских персонажей (в их роли выступают знатные граждане Флоренции в костюмах того времени). ",
      image: "img/cat-1.jpg",
    },
  ];

  const arts = document.querySelectorAll(".catalog-artists__link");
  arts.forEach((el) => {
    el.addEventListener("click", (ev) => {
      ev.preventDefault();

      // default value
      let name = "Что мы о нём знаем?",
        date  = "",
        text  = 'Пока ничего... Зато мы точно знаем, что в галерее есть на что посмотреть!<a class="catalog-link-gallery" href="#gallery">В галерею</a>',
        image = "img/cat-x.png";

      dataArts.forEach((data) => {
        if (data.name === ev.currentTarget.textContent) {
          name = data.name;
          date = data.date;
          text = data.text;
          image = data.image;
        }
      });

      //set image
      document.querySelector("#cat-pic").src = image;
      document.querySelector("#cat-pic480").srcset = image;
      document.querySelector("#cat-pic768").srcset = image;
      document.querySelector("#cat-pic1024").srcset = image;
      if (window.matchMedia("(max-width: 1023px)").matches) {
        scrollToBlock("catalog-info-activist");
      }

      // set text
      document.querySelector(".catalog-content__title").textContent = name;
      document.querySelector(".catalog-content__sublilte").textContent = date;
      document.querySelector(".catalog-content__text").innerHTML = text;

      ev.currentTarget.classList.toggle("catalog-artists__link--active");
      arts.forEach((el) => {
        if (el != ev.currentTarget)
          el.classList.remove("catalog-artists__link--active");
      });
    });
  });
}

function catalogScrollGallery() {
  document.querySelectorAll('.catalog-empty__link').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const blockID = link.getAttribute("href").substr(1);
      scrollToBlock(blockID);
    });
  });
}

/*** Свайпер секция "События" ***/
function eventsSwiper() {
  new Swiper(".event-list__swiper", {
    spaceBetween: 50,
    slidesPerView: 3,
    slidesPerGroup: 3,
    pagination: {
      clickable: true,
      type: "bullets",
      el: ".event-list__bullet",
    },
    navigation: {
      nextEl: ".event-list__btn-next",
      prevEl: ".event-list__btn-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      750: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      1023: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 27,
      },
      1150: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    a11y: {
      prevSlideMessage: "Предыдущий",
      nextSlideMessage: "Следующий",
    },
  });
}

/*** Секция "Проэкты" ***/
function projectsSwiper() {
  new Swiper(".projects-partners__swiper", {
    direction: "horizontal",
    spaceBetween: 50,
    slidesPerView: 3,
    slidesPerGroup: 1,
    navigation: {
      nextEl: ".projects-partners__paginate-next",
      prevEl: ".projects-partners__paginate-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 10,
      },
      750: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      950: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1250: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    a11y: {
      prevSlideMessage: "Предыдущий",
      nextSlideMessage: "Следующий",
    },
  });
}

function projectsTippy() {
  tippy(".projects__text-tooltip", {
    maxWidth: 264,
    onShow(instance) {
      instance.popper.hidden = instance.reference.dataset.tippy ? false : true;
      instance.setContent(instance.reference.dataset.tippy);
    },
  });
}

function projectsTextLink() {
  let lnkFunc = () => {
    let lnk = "";

    if (window.matchMedia("(max-width: 450px)").matches)
      lnk = "blanchard-art.ru/projects/about";
    else if (window.matchMedia("(max-width: 1023px)").matches)
      lnk = "blanchard-art.ru";
    else lnk = "blanchard-art.ru/projects";

    document.querySelector(".projects__text-link").textContent = lnk;
  };

  lnkFunc();
  window.addEventListener("resize", () => {
    lnkFunc();
  });
}

/*** Секция "Контакты" ***/
function yandexMap() {
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
        zoom: 16,
        center: [55.75786005805104, 37.60898459479383],
        controls: [],
      }),
      myPlacemark = new ymaps.Placemark(
        [55.75786005805104, 37.60898459479383],
        {},
        {
          iconLayout: "default#image",
          iconImageHref: "img/map-sticker.svg",
          iconImageSize: [20, 20],
          iconImageOffset: [40, -10],
        }
      ),
      geolocationControl = new ymaps.control.GeolocationControl({
        options: {
          position: {
            right: 17,
            top: 355,
          },
        },
      }),
      zoomControl = new ymaps.control.ZoomControl({
        options: {
          size: "small",
          position: {
            right: 17,
            top: 275,
          },
        },
      });

    //myMap.behaviors.disable('drag');
    myMap.behaviors.disable("scrollZoom");
    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add(geolocationControl);
    myMap.controls.add(zoomControl);
  }
}

function formValidate() {
  var selector = document.querySelector(".contact-form__tel");
  var im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);

  new JustValidate("#contact-form", {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 20,
        strength: {
          custom: "/^[а-яa-z]+$/i",
        },
      },
      phone: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
      },
    },
    messages: {
      name: {
        required: "Введите ваше имя",
        strength: "Имя должно содержать только буквы",
        minLength: "Имя слишком короткое",
        maxLength: "Имя слишком длинное",
      },
      phone: {
        required: "Введите ваш телефона",
        function: "Номер введен не коректно",
      },
    },
  });
}

/*** Tools ***/
function bodyScrollLock() {
  document.querySelector("body").setAttribute("style", "overflow: hidden");
}

function bodyScrollUnLock() {
  document.querySelector("body").removeAttribute("style");
}

function scrollHeaderLinks() {
  document.querySelectorAll('.nav-top a[href*="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // скрываем бургер меню есте открыто
      let navClass = document.querySelector(".nav-top").classList;
      if (navClass.contains("nav-top--burger")) {
        navClass.remove("nav-top--burger");
        bodyScrollUnLock();
      }

      // плавный скролл
      const blockID = link.getAttribute("href").substr(1);
      scrollToBlock(blockID);
    });
  });
}

function scrollToBlock(blockID) {
  let element = document.getElementById(blockID);
  if (element)
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}
