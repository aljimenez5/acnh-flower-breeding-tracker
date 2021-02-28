class StaticFlowerSerializer 
    include FastJsonapi::ObjectSerializer
    attributes :name, :color, :image_url
end