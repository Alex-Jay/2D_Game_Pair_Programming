//This defines the bounce behaviour. Objects bounce by moving
//up to an apex and then dropping back down. This is very
//similar to a jump and uses an animation timer

var BounceBehaviour = function(duration, height)
{
	this.duration = duration || 1000;
	this.distance = height * 2 || 100;
	this.bouncing = false;
	this.timer = new AnimationTimer(this.duration, 
		AnimationTimer.makeEaseOutInEasingFunction());
	this.paused = false;
};

BounceBehaviour.prototype = {
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

	startBouncing: function(sprite, now)
	{
		this.baseline = sprite.top;
		this.bouncing = true;
		this.timer.start(now);
	},

	resetTimer: function(now)
	{
		this.timer.stop(now);
		this.timer.reset(now);
		this.timer.start(now);
	},

	adjustVerticalPostion: function(sprite, elapsed, now)
	{
		var rising = false,
		    deltaY = this.timer.getElapsedTime(now)/this.duration
		     * this.distance;

		if(elapsed < this.duration/2)
		{
			rising = true;
		} 
		if(rising)
		{
			sprite.top = this.baseline - deltaY;
		}
		else
		{
			sprite.top = this.baseline - this.distance + deltaY;
		}
	},

	execute: function(sprite, now, fps, context, 
		lastAnimationFrameTime)
	{
		var elapsed,
		    deltaY;

		if(!this.bouncing)
		{
			this.startBouncing(sprite, now);
		}
		else
		{
			elapsed = this.timer.getElapsedTime(now);
			if(this.timer.isExpired(now))
			{
				this.resetTimer(now);
				return;
			}
			this.adjustVerticalPostion(sprite, elapsed, now);
		}
	}
};


