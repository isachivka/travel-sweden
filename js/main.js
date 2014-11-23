$(document).ready(function() {

  select_field ('.select_field');
  map_toggle('.b_map');
  $('.b_big_photos').each(function(index) {
    carusel($(this), 1, 920, '.left a', '.right a', '.w', 2500, '.points', 'left')
  });
  tabs_box('.b_tabs_box');
  b_photo_labels('.b_big_photos');
  b_peoples ('.b_peoples');
  b_noise_tabs('.b_noise_tabs');
});

/* Functions */
function b_noise_tabs (block) {
  if ($(block).length > 0) {
    $(block).find('a').click(function() {
      if ($(this).parent().hasClass('active')) {return false;};
      $(block).find('li').toggleClass('active');
      $('.noise2').toggleClass('hide');
      return false;
    });
  };
}

function b_peoples (blocks) {
  $(blocks).each(function(index) {
    var block = this;
    $(this).find('select.count').change(function() {
      var c = $(this).val();
      if (c > 0) {
        $(block).find('label.years').removeClass('hide');
      } else {
        $(block).find('label.years').addClass('hide');
      }
      $(block).find('.ye').addClass('hide');
      for (var i=0; i < c; i++) {
        $(block).find('.ye:eq('+ i +')').removeClass('hide');
      };
      return false;
    });
  });
}

function b_photo_labels (block) {
  $(block).find('.forms .label').each(function() {
    $(this).click(function() {
      $(block).find('.open').removeClass('open');
      $(this).parent().addClass('open');
      return false;
    });
  });
}

function tabs_box (block) {
  $(block).find('.next_step').click(function() {
    $(block).find('.tabs li.active').next().find('a').click();
  });
  $(block).find('.tabs a[rel]').click(function() {
    var rel = $(this).attr('rel');
    $(block).find('.content').removeClass('active');
    $(block).find('.content[rel="'+rel+'"]').addClass('active');
    $(block).find('.tabs li').removeClass('active');
    $(block).find('.tabs li i').addClass('hide')
    $(this).parent().addClass('active');
    $(this).find('i').toggleClass('hide');
    return false;
  });
}

function carusel (block, in_window, width, left, right, wrap, time, points, napr) {
  var th = 0;
  var max = $(block).find('.item').length - in_window;
  var hover = false;

  setTimeout(function() {
    auto();
  }, time);

  $(block).hover(function() {
    hover = true;
  }, function() {
    hover = false;
  });

  $(block).find(left).click(function() {
    to(th - 1);
    return false;
  });
  $(block).find(right).click(function() {
    to(th + 1);
    return false;
  });

  function auto() {
    if (!hover) {
      to(th + 1);
    }
    setTimeout(function() {
      auto();
    }, time);
  }

  if (points) {
    $(block).find(points + ' a').click(function() {
      n = $(this).prevAll().length
      to(n);
      return false;
    });
  };

  function to (num) {
    if (num < 0)   { num = max };
    if (num > max) { num = 0 };
    if (napr == 'top') {
      $(block).find(wrap).animate({
        'margin-top': num * -1 * width
      }, 500, function() {
        th = num;
      });
    }
    if (napr == 'left') {
      $(block).find(wrap).animate({
        'margin-left': num * -1 * width
      }, 500, function() {
        th = num;
      });
    }
    if (points) {
      $(block).find(points + ' a').removeClass('active').addClass('passive');
      $(block).find(points + ' a:eq(' + num + ')').removeClass('passive').addClass('active');
    }
  }
}

function data_toggle (block) {
  var d = $(block).attr('data-toggle');
  $(block).attr('data-toggle', $(block).html());
  $(block).html(d);
}

function map_toggle (block) {
  $(block).find('.line a').click(function() {
    if ($(block).find('#map').hasClass('open')) {
      $(block).find('#map').animate({height: 140}, 500);
    } else {
      $(block).find('#map').animate({height: $(block).find('#map').attr('data-heigth')}, 500);
    }
    $(block).find('#map').toggleClass('open');
    data_toggle($(this).find('span'));
    $(this).find('i').toggleClass('rot');
    return false;
  });
}

function select_field (blocks) {
  $(blocks).each(function() {
    var block = this;
    $('html').click(function() {
      $(block).removeClass('open');
    });
    $(this).find('.op').click(function(event) {
      if ($(block).hasClass('open')) {
        $(block).removeClass('open');
      } else {
        $(blocks).each(function(index) {
          $(this).removeClass('open');
        });
        $(block).addClass('open');
      }
      return false;
    });
    $(this).click(function(event) {
      event.stopPropagation();
    });
  });
}
