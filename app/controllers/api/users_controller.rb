class Api::UsersController < ApplicationController
  before_action :set_user, except: [:index]

  def index
    render json: User.all
  end

  def show
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages.join(', ') }, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name, :nickname, :image)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
