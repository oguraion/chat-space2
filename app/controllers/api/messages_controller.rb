class Api::MessagesController < ApplicationController #::は名前空間(namespace)といい、同様のクラス名で名付けたクラスを作ってもそれらを区別可能
  def index
    group = Group.find(params[:group_id]) # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    last_message_id = params[:id].to_i # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    @messages = group.messages.includes(:user).where("id > #{last_message_id}") # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    respond_to do |format|
      format.html
      format.json
    end  
  end
end 