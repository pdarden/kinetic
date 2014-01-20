$(function(){
  loadImages(sources, populateBadges);
});

function makeImage(){

}

var sources = { bigcheese: '../images/bigcheese.png',
               orgman: '../images/orgman.png',
           		describer: '../images/describer.png'};
var stage = new Kinetic.Stage({
container: 'container',
  width: 700,
  height: 700
});

var badgeStage = new Kinetic.Stage({
container: 'badges',
  width: 700,
  height: 200
});

var layer = new Kinetic.Layer();
var badgeLayer = new Kinetic.Layer();

stage.add(layer);
badgeStage.add(badgeLayer);

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
      // images[src].setAttribute('crossOrigin','anonymous');
    }
  }

var badges = []

function populateBadges(images){
	var i = 0;
	for (var image in images){
		badges[i] = new Kinetic.Image({
			image: images[image],
			x: 70 * i,
			y: 0,
			width: 70,
			height: 70,
			draggable: true
		})
		i++;
	}
	addBadgesToStage();
}

function addBadgesToStage(){
	for(var i=0;i < badges.length; i++){
		badgeLayer.add(badges[i]);
	}
	badgeLayer.draw();
}

layer.on('dragend', function(e){
	var image = e.dragEndNode;
	magicImage(image, e);
})
badgeLayer.on('dragend', function(e){
	var image = e.dragEndNode;
	magicImage(image, e);
})

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
  	var amount = Object.keys(sources).length - image.parent.children.length
    image.setX(70 * amount);
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

  function makeImage(){
  	stage.toImage({
  		callback: function(image){
  			debugger;
  		}
  	})
  }


