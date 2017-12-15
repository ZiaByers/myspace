class AddFriendsToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :friends, :text
  end
end
