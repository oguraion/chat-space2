$(function() {

  var search_list = $("#user-search-result");
  var search_add = $("#chat-group-users");

  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
      search_list.append(html);
  }

  function appendErrMsgToHTML() {
    var html = `一致するユーザ名はありません`
    search_list.append(html);
  }

  function appendDeletebtn(name,id){
    var html =`<div class="chat-group-user clearfix'>
                  <input name='group[user_ids][]' type='hidden' value="${id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
      search_add.append(html);
  }


  $("#user-search-field").on("keyup", function() { //「user-search-field」というセレクタに「onメソッド」を実行するという記述。jsでは基本的にメソッドは左側のセレクタに働きかける
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',  //HTTPメソッドを示したもので「rake routes」をすればターミナル上で一発で分かる
      url: '/users', //usersコントローラに飛ぶ
      data: { keyword: input }, //ハッシュの形を指定しており{キー:バリュー}、indexアクションでキーとなる「keyword」を当てはめることでデータを取得できる
      dataType: 'json' //「どういう形式で送られてくるか」を示したもので、テンプレ通りでOK
    })
    //ajax通信から帰ってくることが出来たら、「.done」の処理に入る
    .done(function(users) {
      $("#user-search-result").empty();//「user-search-field」というセレクタの中身を空にする。empty()の()の部分には引数を入れる
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザ名はありません");
      }
    })
    .fail(function(){
      alert('ユーザ検索に失敗しました');
    })
  });
  //「追加」ボタンを押したときの処理を記述する
  $(".chat-group-form__field").on("click",".user-search-add",function(){
    name = $(this).data("user-name");
    id = $(this).data("user-id");
    //ユーザが「チャットメンバー」に追加されると同時に「削除」ボタンを表示する
    appendDeletebtn(name,id);
    //ユーザを検索結果から消す
    $(this).parent().remove();
  })
  //「削除」ボタンを押すとチャットメンバーから削除される
  $(".chat-search-result").on("click",".user-search-remove",function(){
    $(this).parent().remove();
  })
});
