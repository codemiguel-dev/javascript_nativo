//simple function
function vehicle(name,maker,engine){
    this.name = name;
    this.maker = maker;
    this.engine = engine;
}
//new keyword to create an object
let car  = new vehicle('GT','BMW','1998cc');
//property accessors
console.log(car.name);
console.log(car.maker);
console.log(car['engine']);