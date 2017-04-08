/* CYCLE: For sprites that have a spritesheet artist, this behaviour
advances the sprite through the sprite's images for the specified
duration. Then the behaviour waits for for the specified interval
and then starts the process all over again*/

CycleBehaviour = function(duration, interval)
{
	this.duration = duration || 1000;
	this.interval = interval;
	this.lastAdvance = 0;
};

CycleBehaviour.prototype = 
{
	execute: function(sprite, now, fps, context, 
		lastAnimationFrameTime)
	{
		if(this.lastAdvance === 0)
		{
			this.lastAdvance = now;
		}
		if(now - this.lastAdvance > this.duration)
		{
			sprite.artist.advance();
			this.lastAdvance = now;
		}
		else if(this.interval && sprite.artist.cellIndex === 0)
		{
			if(now - this.lastAdvance > this.interval)
			{
				sprite.artist.advance();
				this.lastAdvance = now;
			}
		}
	}
};