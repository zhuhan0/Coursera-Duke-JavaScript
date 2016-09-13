//Combine
function crop(image,width,height){
    var cropped = new SimpleImage(width,height);
    for(var p of image.values()){
        var x = p.getX();
        var y = p.getY();
        if (x < width && y < height){
            var cp = cropped.getPixel(x,y);
            cp.setRed(p.getRed());
            cp.setGreen(p.getGreen());
            cp.setBlue(p.getBlue());
        }
    }
    return cropped;
}
function pixchange(pixval, n){
    var a = Math.floor(pixval/Math.pow(2, n)) * Math.pow(2, n);
    return a;
}
function chop2hide(image, n){
    for (var pi of image.values()){
        pi.setRed(pixchange(pi.getRed(), n));
        pi.setGreen(pixchange(pi.getGreen(), n));
        pi.setBlue(pixchange(pi.getBlue(), n));
    }
    return image;
}
function shift(image, n){
    var hidden = new SimpleImage(image.getWidth(),image.getHeight());
    for (var pix of image.values()){
        var x = pix.getX();
        var y = pix.getY();
        var hp = hidden.getPixel(x,y);
        hp.setRed(Math.floor(pix.getRed()/Math.pow(2, 8 - n)));
        hp.setGreen(Math.floor(pix.getGreen()/Math.pow(2, 8 - n)));
        hp.setBlue(Math.floor(pix.getBlue()/Math.pow(2, 8 - n)));
    }
    return hidden;
}
function newpv(p,q){
    var npv = p + q;
    if (npv > 255) print ("Error: newpv too big");
    return npv;
}
function combine(appear,hidden){
    var combined = new SimpleImage(appear.getWidth(),appear.getHeight());
    for (var ap of appear.values()){
        var hp = hidden.getPixel(ap.getX(),ap.getY());
        var cp = combined.getPixel(ap.getX(),ap.getY());
        cp.setRed(newpv(ap.getRed(),hp.getRed()));
        cp.setGreen(newpv(ap.getGreen(),hp.getGreen()));
        cp.setBlue(newpv(ap.getBlue(),hp.getBlue()));
    }
    return combined;
}
var image = new SimpleImage("IMG_0235.jpg");
var start = crop(image, 200, 233);
var n = 2
var start = chop2hide(start, n);
var hide = new SimpleImage("keepCalm.png");
var hide = shift(hide, n);
var combined = combine(start,hide);
//print (start);
//print (hide);
//print (combined);

//Extract
function convertRGB(pixelValue, n){
    var extractedRGB = (pixelValue - Math.floor(pixelValue/Math.pow(2, n)) * Math.pow(2, n)) * Math.pow(2, 8 - n);
    return extractedRGB;
}
function extract(image, n){
    var extracted = new SimpleImage(image.getWidth(),image.getHeight());
    for (var p of image.values()){
        var ep = extracted.getPixel(p.getX(),p.getY());
        ep.setRed(convertRGB(p.getRed(), n));
        ep.setGreen(convertRGB(p.getGreen(), n));
        ep.setBlue(convertRGB(p.getBlue(), n));
    }
    return extracted;
}
var extracted = extract(combined, n);
print (extracted);