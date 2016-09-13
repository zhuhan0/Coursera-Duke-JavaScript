function setBlack(pixel){
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
}
function pixelOnEdge(pixel,image,borderWidth){
    var x = pixel.getX();
    var y = pixel.getY();
    if (x <= borderWidth || x >= image.getWidth() - borderWidth || y <= borderWidth || y >= image.getHeight() - borderWidth) return true;
    return false;
}
var image = new SimpleImage("eastereggs.jpg");
for (var pixel of image.values()){
    if (pixelOnEdge(pixel,image,10)){
        pixel = setBlack(pixel);
    }
}
print (image);
