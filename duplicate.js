function duplicate(inImage){
    var outImage = new SimpleImage(inImage.getWidth()*2, inImage.getHeight()*2);
    for (outPixel of outImage.values()){
        var xOut = outPixel.getX();
        var yOut = outPixel.getY();
        var xIn = xOut;
        var yIn = yOut;
        if (xIn >= inImage.getWidth()) xIn = xIn - inImage.getWidth();
        if (yIn >= inImage.getHeight()) yIn = yIn - inImage.getHeight();
        var inPixel = inImage.getPixel(xIn,yIn);
        outPixel.setRed(inPixel.getRed());
        outPixel.setGreen(inPixel.getGreen());
        outPixel.setBlue(inPixel.getBlue());
    }
    return outImage;
}
var inImage = new SimpleImage("rodger.png");
print (duplicate(inImage));