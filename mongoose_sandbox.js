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
        size: {type: String, default: "small"},
        color: {type: String, default: "golden"},
        mass: {type: Number, default: 0.0007},
        type: {type: String, default: "goldfish"},
        name: {type: String, default: "Angela"}
    });

    var Animal = mongoose.model("Animal", AnimalSchema);

    var elephant = new Animal({
        type: "elephant",
        size: "big",
        color: "gray",
        mass: 6000,
        name: "Lawrance"
    });

    var fish = new Animal({}); // Goldfish is default animal

    var whale = new Animal({
        type: "whale",
        size: "big",
        mass: 190500,
        name: "Fig"
    });

    Animal.remove({}, function(err) {
        if (err) console.error(err);
        elephant.save(function(err){
            if (err) console.error(err);
            fish.save(function(err){
                if (err) console.error(err);
                whale.save(function(err){
                    if (err) console.log(err);
                        Animal.find({size: 'big'}, function(err, animals) {
                            console.log("Does Aminal.find() works?");
                            animals.forEach(function(animal){
                                console.log(animal.name + "the" + animal.color
                                + " " + animal.type);
                            });
                    });

                    db.close(function(){
                        console.log("db connection closed");
                    });
                });
            });
        });
    });



});