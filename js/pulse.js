//This defines the pulse behaviour. Objects pulse by changing
//their opacity. We spend half the time dimming and half the
//time brightening

var PulseBehaviour = function(duration, opacityThreshold)
{
	this.duration = duration || 1000;
	this.opacityThreshold = opacityThreshold || 0;
	this.pulsating = false;
	this.timer = new AnimationTimer(this.duration, 
		AnimationTimer.makeEaseInOutEasingFunction());
	this.paused = false;
};

PulseBehaviour.prototype = {
	pause: function(now)
	{
		if(!this.timer.isPaused())
		{
			this.timer.pause(now);
		}
		this.paused = true;
	},

	unpause: function(now)
	{
		if(this.timer.isPaused())
		{
			this.timer.unpause(now);
		}
		this.paused = false;
	},

	startPulsing: function()
	{
		this.pulsating = true;
		this.timer.start();
	},

	resetTimer: function()
	{
		this.timer.stop();
		this.timer.reset();
		this.timer.start();
	},

	dim: function(sprite, elapsed)
	{
		sprite.opacity = 1 - ((1-this.opacityThreshold)*(parseFloat(elapsed)/this.duration));
		//console.log(sprite.opacity);
	},

	brighten: function(sprite, elapsed)
	{
		sprite.opacity += (1-this.opacityThreshold)*(parseFloat(elapsed)/this.duration);
			//console.log(sprite.opacity);
	},

	execute: function(sprite, now, fps, context, 
		lastAnimationFrameTime)
	{
		var elapsed;

		if(!this.pulsating)
		{
			//console.log("Starting the pulse");
			this.startPulsing();
		}
		else
		{
			//console.log("Adjusting opacity");
			elapsed = this.timer.getElapsedTime();
			if(this.timer.isExpired())
			{
				this.resetTimer(now);
				return;
			}
			if(elapsed < this.duration/2)
			{
				this.dim(sprite, elapsed);
			}
			else
			{
				this.brighten(sprite, elapsed);
			}
		}
	}
};


