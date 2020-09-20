(function(){
  ZeroClipboard.config(
    {
      swfPath: 'js/vendor/ZeroClipboard.swf'
    }
  );

  var client = new ZeroClipboard(document.getElementById('btn_copy'));

  client.on('ready', function(readyEvent) {

    client.on('aftercopy', function(event) {
      event.target.style.display = "none";
      console.log("Copied text to clipboard: " + event.data["text/plain"]);
    });

  });

  if (window.location.host.toLowerCase().indexOf('tape.tv') >= 0) {
    var url = window.location.hash,
      hash = url.split('#')[1];

    if (hash) {
      $('input#url').val(hash);
    }
   }

  $('input#url').blur(function() {
    var link = $(this).val();

    if (link != '') {
      $.ajax({
        url: 'http://www.tape.tv/services/oembed?url=' + link,
        success: function(data) {
          var complete_embedcode = data.html + '<p><a href="' + link + '?utm_source=tape.tv&utm_campaign=koop&utm_medium=embed">' + data.title + '</a> auf <a href="http://www.tape.tv/?utm_source=tape.tv&utm_campaign=koop&utm_medium=embed">tape.tv</a></p>';
          $('#embedcode').html(complete_embedcode);
          $('#btn_copy').attr('data-clipboard-text', complete_embedcode);
          $('#embedcode').focus().select();
        },
        error: function (data) {
          $('span.error').html('Eek! That does not look like a tape.tv link. Computer says <i>"' + data.statusText + '"</i>.');
          $('#btn_copy').attr('data-clipboard-text', '');
        }
      });
    };
  });

})();
