$(document).on('turbolinks:load',function() {
  var search_list = $("#user-search-result");
  var search_add = $("#chat-group-users");
  function appendProduct(user) {
    var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
      search_list.append(html);
  }
  function appendErrMsgToHTML(errMessage) {
    var html = `<p>
                  ${errMessage}
                </p>`
    search_list.append(html);
  }

  function appendDeletebtn(name,id){
    var html =`<div class="chat-group-user clearfix">
                  <input name='group[user_ids][]' type='hidden' value="${id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
      search_add.append(html);
  }
  
  
  $("#user-search-field").on("keyup", function() { 
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET', 
      url: '/users', 
      data: { keyword: input }, 
      dataType: 'json' 
    })
    
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendProduct(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザ検索に失敗しました');
    })
  });
  
  $(".chat-group-form__field").on("click",".user-search-add",function(){
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    
    appendDeletebtn(name,id);
    
    $(this).parent().remove();
  })
  
  $("#chat-group-users").on("click",".user-search-remove",function(){
    console.log("aaa")
    $(this).parent().remove();
  })
});