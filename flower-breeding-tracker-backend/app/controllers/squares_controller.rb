class SquaresController < ApplicationController
    def index 
        squares = Square.all 
        render json: SquareSerializer.new(squares)
    end

    def show 
        square = Square.find_by(id: params[:id])
        render json: SquareSerializer.new(square)
    end


    
end