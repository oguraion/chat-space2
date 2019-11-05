$(document).on('turbolinks:load',function(){ 
  function buildHTML(message){
    var Messageimage = (message.image)? (message.image) : "";
    var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <img src=${Messageimage} >
      </div>`
    return html;
  }

$('.new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){ //グループのメッセージ一覧ページだった場合のみ自動更新が行われるようにする
      var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある最後のカスタムデータ属性を取得しlast_message_idに代入。
      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {id: last_message_id} 
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = ''; //追加するHTMLの入れ物を作る
        messages.forEach(function (message) { //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML); //メッセージを追加
        //メッセージが送られたタイミングで「animate」によってスクロールを行う
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
        })
        //最初ここに「animate」を使ってしまっていたのでメッセージが送られても送られなくても、勝手にリロードされてしまう状況であった
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 25000);
});