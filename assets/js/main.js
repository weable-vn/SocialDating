jQuery(document).ready(function() {
    $('.story__main').slick({
        dots: false,
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipe: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                arrows: false,
                swipe: true,
              }
            },
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                arrows: false,
                swipe: true,
            }
            },
        ]
    });

    // Click Menu
    $('.header__menu-list .menu-item a').click(function(e) {
        e.preventDefault();
        var $li = $(this).parent();
        if($li.hasClass('current-menu-item')) {
        } else {
            $('.header__menu-list .menu-item').removeClass('current-menu-item');
            $li.addClass('current-menu-item');
        }
    })
});

// Popup Story
jQuery(document).ready(function() {
    $('.story__item-popup a').click(function(e) {
        e.preventDefault();
        $('.popup__story').addClass('show');

        var image = $(this).children('.story__item-wrap').children('.story__item-inner').children('.story__item-column').children('.story__item-box-img').children('.story__item-img').attr('src');
        var text = $(this).children('.story__item-wrap').children('.story__item-inner').children('.story__item-column').children('.story__item-text').text();

        $('.popup__story .popup__story-img').attr("src", image);
        $('.popup__story .popup__story-name').text(text);

        createProgressbar('progress__bar-story', '25s', function() {
            closePopup();
        });
    });

    $('.popup__story-btn-close').click(function() {
        closePopup();
    });

    $('.popup__story .popup__overlay').click(function() {
        closePopup();
    });

    // Pause & Play 
    $('.popup__story-btn-play').click(function() {
        if($(this).hasClass('paused')) {
            $(this).removeClass('paused');
            controlStory('running');
        } else {
            $(this).addClass('paused');
            controlStory('paused');
        }
    });


});

// Close Popup
function closePopup() {
    $('.popup__story').removeClass('show');
    $('.popup__story .popup__story-img').attr("src", "");
    $('.popup__story .popup__story-name').text("");
    $('.popup__story-btn-play').removeClass('paused');
    var progressbar = document.getElementById('progress__bar-story');
    var progressbarinner = document.getElementById('progressbar__inner');
    progressbar.removeChild(progressbarinner);
}

// Function Create Progress Bar
function createProgressbar(id, duration, callback) {
    var progressbar = document.getElementById(id);
    
    var progressbarinner = document.createElement('div');
    progressbarinner.id= "progressbar__inner";
    progressbarinner.className = 'inner';
    progressbarinner.style.animationDuration = duration;

    if(typeof(callback) === 'function') {
        progressbarinner.addEventListener('animationend', callback);
    }

    progressbar.appendChild(progressbarinner);

    progressbarinner.style.animationPlayState = 'running';
}

// Controls Story
function controlStory(playState) {
    var progressbarinner = document.getElementById('progressbar__inner');
    progressbarinner.style.animationPlayState = playState;
}