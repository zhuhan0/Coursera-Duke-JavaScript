function ensureInImage(coordinate, size){
    if (coordinate < 0){
        return 0;
    }
    if (coordinate >= size){
        return size - 1;
    }
    return coordinate;
}
function getPixelNearby(image, x, y, diameter){
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}
var image = new SimpleImage("duvall.jpg");
var output = new SimpleImage(image.getWidth(),image.getHeight());
for (var pixel of image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5){
        var other = getPixelNearby(image, x, y, 5);
        output.setPixel(x, y, other);
    }
    else {
        output.setPixel(x, y, pixel);
    }
}
print (output);