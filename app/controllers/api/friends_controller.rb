class Api::FriendsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.friends
  end

  def update
    current_user.friends << params[:id].to_i
    current_user.save
  end

  def destroy
    current_user.friends.delete(params[:id].to_i)
    current_user.save
  end
end
