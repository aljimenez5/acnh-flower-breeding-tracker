# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# flower_names = ["Rose", "Lily", "Windflower", "Pansy", "Tulip", "Mum", "Hyacinth", "Cosmo"]

Dir.entries(Pathname('../flower-breeding-tracker-frontend/assets/images')).each do |file|
    if file[0] != "."
        file_arr = file.split(/[-_]/)
        name = file_arr[2].capitalize.singularize
        color = file_arr[1].capitalize.singularize
        image_url = file
        new_flower = StaticFlower.create(name: name, color: color, image_url: image_url)

    end

end 