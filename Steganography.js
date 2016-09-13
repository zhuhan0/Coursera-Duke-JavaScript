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
function pixchange(pixval){
    var a = Math.floor(pixval/16) * 16;
    return a;
}
function chop2hide(image){
    for (var pi of image.values()){
        pi.setRed(pixchange(pi.getRed()));
        pi.setGreen(pixchange(pi.getGreen()));
        pi.setBlue(pixchange(pi.getBlue()));
    }
    return image;
}
function shift(image){
    var hidden = new SimpleImage(image.getWidth(),image.getHeight());
    for (var pix of image.values()){
        var x = pix.getX();
        var y = pix.getY();
        var hp = hidden.getPixel(x,y);
        hp.setRed(Math.floor(pix.getRed()/16));
        hp.setGreen(Math.floor(pix.getGreen()/16));
        hp.setBlue(Math.floor(pix.getBlue()/16));
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
var image = new SimpleImage("astrachan.jpg");
var start = crop(image,200,300);
var start = chop2hide(start);
var hide = new SimpleImage("duvall.jpg");
var hide = shift(hide);
var combined = combine(start,hide);
print (start);
print (hide);
print (combined);

//Extract
function convertRGB(pixelValue){
    var extractedRGB = (pixelValue - Math.floor(pixelValue/16) * 16) * 16;
    return extractedRGB;
}
function extract(image){
    var extracted = new SimpleImage(image.getWidth(),image.getHeight());
    for (var p of image.values()){
        var ep = extracted.getPixel(p.getX(),p.getY());
        ep.setRed(convertRGB(p.getRed()));
        ep.setGreen(convertRGB(p.getGreen()));
        ep.setBlue(convertRGB(p.getBlue()));
    }
    return extracted;
}
var extracted = extract(combined);
print (extracted);