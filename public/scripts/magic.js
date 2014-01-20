$(function(){
  var stage = new Kinetic.Stage({
    container: 'container',
      width: 400,
      height: 400
  });

  var badges = new Kinetic.Stage({
    container: 'badges',
      width: 400,
      height: 400
  });

  var layer = new Kinetic.Layer();
  var badgeLayer = new Kinetic.Layer();
  var cheeseImage = new Image();
  var sources = { bigcheese: '../images/bigcheese.png',
                   orgman: '../images/orgman.png'};
  function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++; 
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

      
  var cheese = new Kinetic.Image({
    x: 0,
    y: 0,
      image: cheeseImage,
      width: 100,
      height: 100,
      draggable: true
  });
  layer.add(cheese);
  stage.add(layer);
  badges.add(badgeLayer);
  cheese.on('dragend', function(e){
    magicImage(cheese, e);
  });

  }
  cheeseImage.src = '../images/bigcheese.png';
  function magicImage(image, e){
    if (e.y > stage.getHeight() || e.x > stage.getWidth()){
      resetImage(image);
      removeImage(image);
    } else if(image.parent.parent.container().id == 'badges' && (e.y <= stage.getHeight() || e.x <= stage.getWidth())){
      resetImage(image);
      addImage(image);
    }
    
  }

  function resetImage(image){
    image.setX(0);
    image.setY(0);
  }

  function addImage(image){
    image.remove();
    layer.add(image);
    drawLayers();
  };
  function removeImage(image){
      image.remove();
      badgeLayer.add(image);
      drawLayers();
    }

  function drawLayers(){
    layer.draw();
    badgeLayer.draw();
  }
});
