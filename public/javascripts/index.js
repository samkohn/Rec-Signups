$('document').ready(function() {
  var weekNum = 1;
  if (sessionStorage.getItem('weekNum')) {
    weekNum = sessionStorage.getItem('weekNum');
    $('#weekID').attr('value', weekNum);
  }
  else {
    sessionStorage.setItem('weekNum', weekNum);
  }

  if (!sessionStorage.getItem('useCached')) {
    sessionStorage.setItem('useCached', false);
  }

  var useCached = false;
  if (sessionStorage.getItem('useCached')) {
    useCached = sessionStorage.getItem('useCached');
  }

  $('.link').not('#assign').each(function(index, element) {
    $element = $(element);
    $element.wrap('<a class="week-dependent" href="/' + $element.attr('id') + '?week=' + weekNum + '" />');
  });

  $('#assign').wrap('<a class="week-dependent cache-dependent" href="/assign?week=' + weekNum + '&useCached=' + useCached + '" />');

  $('#weekID').change( function() {
    $changed = $(this);
    console.log($changed);
    weekNum = $changed.val();
    sessionStorage.setItem('weekNum', weekNum);
    console.log('set sessionStorage.weekNum to ' + weekNum);

    // also re-set the links
    $('a.week-dependent').each(function() {
      this.href = this.href.replace(/week=\d/, 'week=' + weekNum);
    });
    
    $('a.cache-dependent').each(function() {
      this.href = this.href.replace(/useCached=true/, 'useCached=false');
      console.log(this.href);
    });

    sessionStorage.setItem('useCached', 'false');

    
  });
 
});
