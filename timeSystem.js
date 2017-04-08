//Custom time system. The default is that time passes as it does
//int the real world, i.e. 5 seconds passed in the real = 5 seconds 
//passed in the game. But, we can also speed time up and slow
//it down by setting transducer functions. Transducer change
//the flow of time in the game, they can speed it up or slow it down

var TimeSystem = function(){
	this.transducer = function(elapsedTime){return elapsedTime;};
	this.timer = new AnimationTimer();
	this.lastTimeTranducerWasSet = 0;
	this.gameTime = 0;
};

TimeSystem.prototype = {
	start: function()
	{
		this.timer.start();
	},

	reset: function()
	{
		this.timer.stop();
		this.timer.reset();
		this.timer.start();
		this.lastTimeTranducerWasSet = this.gameTime;
	},

	setTransducer: function(transducerFunction, duration)
	{
		//Duration is optional. If you specify it, the transducer 
		//is applied for the specified duration; after the duration
		//the permanent is reapplied. If you don't specify the duration
		//the transducer permanently replaces the current transducer
		var lastTransducer = this.transducer,
		    self = this;
		this.calculateGameTime();
		this.reset();
		this.transducer = transducerFunction;
		if(duration)
		{
			setTimeout(function(e){
				self.setTranducer(lastTransducer);
			}, duration);
		}
	},

	calculateGameTime: function()
	{
		this.gameTime = this.lastTimeTranducerWasSet + 
		this.transducer(this.timer.getElapsedTime());
		this.reset();
		return this.gameTime;
	}
}; 