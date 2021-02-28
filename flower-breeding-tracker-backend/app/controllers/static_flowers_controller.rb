class StaticFlowersController < ApplicationController
    
    def index 
        flowers = StaticFlower.order('name')
        render json: StaticFlowerSerializer.new(flowers)
    end

    def show 
        flower = StaticFlower.find_by(id: params[:id])
        render json: StaticFlowerSerializer.new(flower)
    end
end