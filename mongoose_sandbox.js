'use sctrict';

var mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on('error', function(err){
    console.error("db connection error: ", err);
});

db.once("open", function(){
    console.log("db connection on");
    // all db comunications here

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema ({
        size: String,
        color: {type: String, default: "golden"},
        mass: {type: Number, default: 0.0007},
        type: {type: String, default: "goldfish"},
        name: {type: String, default: "Angela"}
    });

    AnimalSchema.pre("save", function(next) {
        if (this.mass >= 100) {
            this.size = "big";
        } else if (this.mass >= 5 && this.mass < 100) {
            this.size = "medium";
        } else {
            this.size = "small";
        }
        next();
    });

    AnimalSchema.statics.findSize = function(size, callback) {
        //this == animal
        return this.find({size: size}, callback);
    };

    AnimalSchema.methods.findSameColor = function(callback){
        //this === document
        return this.model("Animal").find({color: this.color}, callback);
    };

    var Animal = mongoose.model("Animal", AnimalSchema);

    var elephant = new Animal({
        type: "elephant",
        color: "gray",
        mass: 6000,
        name: "Lawrance"
    });

    var fish = new Animal({}); // Goldfish is default animal

    var whale = new Animal({
        type: "whale",
        mass: 190500,
        name: "Fig"
    });

    var animalData = [
        {
            type: "mouse",
            color: "gray",
            mass: 0.0043,
            name: "Marvin"
        },
        {
            type: "nutria",
            color: "brown",
            mass: 4.24,
            name: "Greetchen"
        },
        {
            type: "wolf",
            color: "gray",
            mass: 45,
            name: "Iris"
        },
        elephant,
        fish,
        whale
    ];

    Animal.remove({}, function(err) {
        if (err) console.error(err);
        Animal.create(animalData, function(err, animals){
            if (err) console.error(err);
            Animal.findOne({type: "elephant"}, function(err, elephant) {
                console.log("It appered that " + elephant.name + " is "
                + elephant.color + ". So let's find other same color animals:");
                elephant.findSameColor(function(err, animals){
                    animals.forEach(function(animal){
                        console.log(animal.name + " the " + animal.color
                        + " " + animal.type + " is " + animal.size
                        + " (" + animal.mass + " kg)");
                    });
                    db.close(function(){
                        console.log("db connection closed");
                    });
                });
            });
        });
    });
});