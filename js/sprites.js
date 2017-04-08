//Sprites
//Sprites have a type, an artist, and an array of behaviours.
//Sprites can be drawn and updated
//A sprite's artist draws the sprite: draw(sprite, context)
//A sprite's behaviours execute: execute(sprite, time, fps)
var Sprite = function(type, artist, behaviours)
{
	var DEFAULT_WIDTH = 10,
	    DEFAULT_HEIGHT = 10,
	    DEFAULT_OPACITY = 1.0;

	this.artist = artist;
	this.type = type;
	this.behaviours = behaviours || [];

	this.hOffset = 0;
	this.left = 0;
	this.top = 0;
	this.width = DEFAULT_WIDTH;
	this.height = DEFAULT_HEIGHT;
	this.velocityX = 0;
	this.velocityY = 0;
	this.opacity = DEFAULT_OPACITY;
	this.visible = true;

	this.collisionMargin = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	};
};

Sprite.prototype = 
{
	calculateCollisionRectangle: function()
	{
		return{
			left: this.left - this.hOffset + this.collisionMargin.left,
			right: this.left - this.hOffset + this.width - 
			this.collisionMargin.right,
			top: this.top + this.collisionMargin.top,
			bottom: this.top + this.height - this.collisionMargin.bottom,
			centreX: this.left + this.width/2,
			centreY: this.top + this.height/2
		}
	},

	draw: function(context)
	{
		context.save();
		context.globalAlpha = this.opacity;
		if(this.visible && this.artist)
		{
			this.artist.draw(this, context);
		}
		context.restore();
	},

	update: function(now, fps, context, lastAnimationFrameTime)
	{
		for(var i=0; i<this.behaviours.length;++i)
		{
			this.behaviours[i].execute(this, now, fps, context, lastAnimationFrameTime);
		}
	}
};

//Sprite artist
//Artists draw sprites with a draw(sprite, context) methods
var SpriteSheetArtist = function(spritesheet, cells)
{
	this.cells = cells;
	this.spritesheet = spritesheet;
	this.cellIndex = 0;
};

SpriteSheetArtist.prototype = 
{
	draw: function(sprite, context)
	{
		var cell = this.cells[this.cellIndex];
		context.drawImage(this.spritesheet, cell.left,
		 cell.top, cell.width, cell.height, sprite.left, 
		 sprite.top, cell.width, cell.height);
	},

	advance: function()
	{
		if(this.cellIndex === this.cells.length-1)
		{
			this.cellIndex = 0;
		}
		else
		{
			this.cellIndex++;
		}
	}
};
