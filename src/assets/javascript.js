

const container = document.querySelector(".container");
const mainSlide = document.querySelector(".main-slide");
const sidebar = document.querySelector(".sidebar");
const downButton = document.querySelector(".down-button");
const upButton = document.querySelector(".up-button");
const slidesCount = mainSlide.querySelectorAll("div").length;
let activeSlideIndex = 0;

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

const changeSlide = (direction) => {
  const height = container.clientHeight;

  if (direction === "up") {
    activeSlideIndex === slidesCount - 1
      ? (activeSlideIndex = 0)
      : activeSlideIndex++;
  } else if (direction === "down") {
    activeSlideIndex < 1
      ? (activeSlideIndex = slidesCount - 1)
      : activeSlideIndex--;
  }

  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
};

downButton.addEventListener("click", () => {
  changeSlide("down");
});

upButton.addEventListener("click", () => {
  changeSlide("up");
});

document.addEventListener("keydown", (e) => {
  console.log(e.key)
  if (e.key === "ArrowDown") {
    changeSlide("down");
  } else if (e.key === "ArrowUp") {
    changeSlide("up");
  }
})

var ProductImg = document.getElementById("ProductImg");
var SmallImg = document.getElementsByClassName("small-img");

$(document).ready(function() {
    $(SmallImg[0]).click(function() {
        $(".container-fluid").css("background", "#000");
        $(".product-title").css("color", "#000");
        $(".price span:first-child").css("color", "#000");
        $(".custom-btn").css("background", "#000");
        $(".reviews i").css("color", "#000");
        $(".colors").css("background", "rgb(55, 55, 55)");
        ProductImg.src = SmallImg[0].src
    });
    $(SmallImg[1]).click(function() {
        $(".container-fluid").css("background", "rgb(186, 34, 42)");
        $(".product-title").css("color", "rgb(186, 34, 42)");
        $(".price span:first-child").css("color", "rgb(186, 34, 42)");
        $(".custom-btn").css("background", "rgb(186, 34, 42)");
        $(".reviews i").css("color", "rgb(186, 34, 42)");
        $(".colors").css("background", "rgb(186, 34, 42)");
        ProductImg.src = SmallImg[1].src
    });
    $(SmallImg[2]).click(function() {
        $(".container-fluid").css("background", "rgb(200, 200, 200)");
        $(".product-title").css("color", "rgb(200, 200, 200)");
        $(".price span:first-child").css("color", "rgb(200, 200, 200)");
        $(".custom-btn").css("background", "rgb(200, 200, 200)");
        $(".reviews i").css("color", "rgb(200, 200, 200)");
        $(".colors").css("background", "rgb(200, 200, 200)");
        ProductImg.src = SmallImg[2].src
    });
    $(SmallImg[3]).click(function() {
        $(".container-fluid").css("background", "rgb(232, 198, 35)");
        $(".product-title").css("color", "rgb(232, 198, 35)");
        $(".price span:first-child").css("color", "rgb(232, 198, 35)");
        $(".custom-btn").css("background", "rgb(232, 198, 35)");
        $(".reviews i").css("color", "rgb(232, 198, 35)");
        $(".colors").css("background", "rgb(232, 198, 35)");
        ProductImg.src = SmallImg[3].src
    });
    $('.product-inf a').click(function() {
    
        $('.product-inf li').removeClass('active');
        $(this).parent().addClass('active');
    
        let currentTab = $(this).attr('href');
        $('.tabs-content div').hide();
        $(currentTab).show();
    
        return false;
    });
    $('.black').click(function(){
        $(".container-fluid").css("background", "#000");
        $(".product-title").css("color", "#000");
        $(".price span:first-child").css("color", "#000");
        $(".custom-btn").css("background", "#000");
        $(".reviews i").css("color", "#000");
        $(".colors").css("background", "rgb(55, 55, 55)");
        ProductImg.src = SmallImg[0].src
    });
    $('.red').click(function(){
        $(".container-fluid").css("background", "rgb(186, 34, 42)");
        $(".product-title").css("color", "rgb(186, 34, 42)");
        $(".price span:first-child").css("color", "rgb(186, 34, 42)");
        $(".custom-btn").css("background", "rgb(186, 34, 42)");
        $(".reviews i").css("color", "rgb(186, 34, 42)");
        $(".colors").css("background", "rgb(186, 34, 42)");
        ProductImg.src = SmallImg[1].src
    });
    $('.white').click(function(){
        $(".container-fluid").css("background", "rgb(200, 200, 200)");
        $(".product-title").css("color", "rgb(200, 200, 200)");
        $(".price span:first-child").css("color", "rgb(200, 200, 200)");
        $(".custom-btn").css("background", "rgb(200, 200, 200)");
        $(".reviews i").css("color", "rgb(200, 200, 200)");
        $(".colors").css("background", "#c8c8c8");
        ProductImg.src = SmallImg[2].src
    });
    $('.yellow').click(function(){
        $(".container-fluid").css("background", "rgb(232, 198, 35)");
        $(".product-title").css("color", "rgb(232, 198, 35)");
        $(".price span:first-child").css("color", "rgb(232, 198, 35)");
        $(".custom-btn").css("background", "rgb(232, 198, 35)");
        $(".reviews i").css("color", "rgb(232, 198, 35)");
        $(".colors").css("background", "#e8c623");
        ProductImg.src = SmallImg[3].src
    });
});

const menu_toggle = document.querySelector(".menu_toggle");
const navigation = document.querySelector(".navigation");
menu_toggle.onclick = function () {
  navigation.classList.toggle("active");
};



// $('#toggle-left-menu').click(function() {
//   if ($('#left-menu').hasClass('small-left-menu')) {
//       $('#left-menu').removeClass('small-left-menu');
//   } else {
//       $('#left-menu').addClass('small-left-menu');
//   }
//   $('#logo').toggleClass('small-left-menu');
//   $('#page-container').toggleClass('small-left-menu');
//   $('#header .header-left').toggleClass('small-left-menu');

//   $('#logo .big-logo').toggle('300');
//   $('#logo .small-logo').toggle('300');
//   $('#logo').toggleClass('p-0 pl-1');
// });

// $(document).on('mouseover', '#left-menu.small-left-menu > ul > li', function() {
//   if (!$(this).hasClass('has-sub')) {
//       var label = $(this).find('span').text();
//       var position = $(this).position();
//       $('#show-lable').css({
//           'top': position.top + 79,
//           'left': position.left + 59,
//           'opacity': 1,
//           'visibility': 'visible'
//       });

//       $('#show-lable').text(label);
//   } else {
//       var position = $(this).position();
//       $(this).find('ul').addClass('open');

//       if ($(this).find('ul').hasClass('open')) {
//           const height = 47;
//           var count_submenu_li = $(this).find('ul > li').length;
//           if (position.top >= 580) {
//               var style = {
//                   'top': (position.top + 100) - (height * count_submenu_li),
//                   'height': height * count_submenu_li + 'px'
//               }
//               $(this).find('ul.open').css(style);
//           } else {
//               var style = {
//                   'top': position.top + 79,
//                   'height': height * count_submenu_li + 'px'
//               }

//               $(this).find('ul.open').css(style);
//           }

//       }
//   }

// });

// $(document).on('mouseout', '#left-menu.small-left-menu li a', function(e) {
//   $('#show-lable').css({
//       'opacity': 0,
//       'visibility': 'hidden'
//   });
// });

// $(document).on('mouseout', '#left-menu.small-left-menu li.has-sub', function(e) {
//   $(this).find('ul').css({
//       'height': 0,
//   });
// });

// $(window).resize(function() {
//   windowResize();
// });

// $(window).on('load', function() {
//   windowResize();
// });

// $('#left-menu li.has-sub > a').click(function() {
//   var _this = $(this).parent();

//   _this.find('ul').toggleClass('open');
//   $(this).closest('li').toggleClass('rotate');

//   _this.closest('#left-menu').find('.open').not(_this.find('ul')).removeClass('open');
//   _this.closest('#left-menu').find('.rotate').not($(this).closest('li')).removeClass('rotate');
//   _this.closest('#left-menu').find('ul').css('height', 0);

//   if (_this.find('ul').hasClass('open')) {
//       const height = 47;
//       var count_submenu_li = _this.find('ul > li').length;
//       _this.find('ul').css('height', height * count_submenu_li + 'px');
//   }
// });


// function windowResize() {
//   var width = $(window).width();
//   if (width <= 992) {
//       $('#left-menu').addClass('small-left-menu');
//       $('#logo').addClass('small-left-menu p-0 pl-1');
//   } else {
//       $('#left-menu').removeClass('small-left-menu');
//       $('#logo').removeClass('small-left-menu p-0 pl-1');
//   }
// }
$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").addClass("active");
  });

  $("#sidebarCollapseX").on("click", function() {
    $("#sidebar").removeClass("active");
  });

  $("#sidebarCollapse").on("click", function() {
    if ($("#sidebar").hasClass("active")) {
      $(".overlay").addClass("visible");
      console.log("it's working!");
    }
  });

  $("#sidebarCollapseX").on("click", function() {
    $(".overlay").removeClass("visible");
  });
});
