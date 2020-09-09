class FlowersController < ApplicationController
    
    def index 
        flowers = Flower.order('name')
        render json: FlowerSerializer.new(flowers)
    end

    def show 
        flower = Flower.find_by(id: params[:id])
        render json: FlowerSerializer.new(flower)
    end

    def new
    end

    def create
        flower = Flower.find_by(id: params["flower_id"])
        if !flower 
            flower = Flower.create(flower_params)

            render json: FlowerSerializer.new(flower)
        else
            render json: {status: 'error', message: "Land already exists"}
        end
        
    end

    def destroy
        flower = Flower.find_by(id: params["id"])
        flower.delete
        render json: FlowerSerializer.new(flower)
    end

    private

    def flower_params
        params.require(:flower).permit(:name, :color, :origin, :image_url)

    end
    
end