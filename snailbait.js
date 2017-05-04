	var SnailBait = function() {
	    this.canvas = document.getElementById('game-canvas'),
	        this.context = this.canvas.getContext('2d'),
	        this.fpsElement = document.getElementById('fps'),
	        this.fpsWarningElement = document.getElementById('fps-warning'),
	        this.highScoreElement = document.getElementById('highScore'),
	        this.toastElement = document.getElementById('toast'),
	        this.instructionElement = document.getElementById('instructions'),
	        this.copyrightElement = document.getElementById('copyright'),
	        this.scoreElement = document.getElementById('score'),
	        this.loadingElement = document.getElementById('loading'),
	        this.loadingTitleElement = document.getElementById('loading-title'),
	        this.loadingAnimatedGIFElement = document.getElementById('loading-animated-gif');

	     //Mobile
	    this.mobileInstructionsVisible = false,
	    this.mobileStartToast = document.getElementById('snailbait-mobile-start-toast'),
	    this.mobileWelcomeToast = document.getElementById('snailbait-mobile-welcome-toast'),
	    this.welcomeStartLink = document.getElementById('snailbait-welcome-start-link'),
	    this.showHowLink = document.getElementById('snailbait-show-how-link'),
	    this.mobileStartLink = document.getElementById('snailbait-mobile-start-link'),
	    
	    //Score
	    score = 0;

	    //Set Highscore Text
	    this.highScoreElement.innerHTML = "Highscore: ";

	    //Box Movement Speed
	    this.BOX_MOVEMENT_SPEED = 5;

	    //Check if player died

	    //Slow-Mo Energy
	    this.SLOW_MOTION_ENERGY = 100;
	    //Time
	    this.playing = true;
	    this.timeSystem = new TimeSystem();
	    this.timeRate = 1.0; //1.0 is normal time, 0.5 1/2 speed

	    //Pixels and meters
	    this.CANVAS_WIDTH_IN_METRES = 13,
	        this.PIXELS_PER_METRE = this.canvas.width / this.CANVAS_WIDTH_IN_METRES;

	    //Gravity
	    this.GRAVITY_FORCE = 9.81;

	    //Constants
	    this.RIGHT = 1,
	        this.LEFT = 2,
	        this.RUNNER_LEFT = 50,
	        this.PLATFORM_HEIGHT = 8,
	        this.PLATFORM_STROKE_WIDTH = 2,
	        this.PLATFORM_STROKE_STYLE = 'rgb(0,0,0)',

	        this.RUNNER_EXPOSION_DURATION = 500,
	        this.BAD_GUYS_EXPLOSION_DURATION = 1500,
	        this.STARTING_RUNNER_TRACK = 1,

	        this.TRACK_1_BASELINE = 323,

	        this.SHORT_DELAY = 20,
	        this.OPAQUE = 1.0,
	        this.TRANSPARENT = 0,

	        //Game states
	        this.paused = false,
	        this.PAUSED_CHECK_INTERVAL = 200, //time in milliseconds
	        this.pauseStartTime,
	        this.windowHasFocus = true,
	        this.countDownInProgress = false,
	        this.gameStarted = false,

	        //Images
	        this.background = new Image(),
	        this.runner = new Image(),
	        this.spritesheet = new Image(),
	        //this.loadingAnimatedGIFElement = new Image();

	        //Time
	        this.lastAnimationFrameTime = 0,
	        this.lastFpsUpdateTime = 0,
	        this.fps = 60;

	    //Scrolling
	    this.STARTING_BACKGROUND_OFFSET = 0,
	        this.STARTING_BACKGROUND_VELOCITY = 0,
	        this.BACKGROUND_VELOCITY = 200,
	        this.SPEED_UP_RATE = 0.03,
	        this.STARTING_PLATFORM_OFFSET = 0,
	        this.PLATFORM_VELOCITY_MULTIPLER = 0,
	        this.STARTING_SPRITE_OFFSET = 50,

	        //Animation
	        this.RUN_ANIMATION_RATE = 20,


	        //Translation offsets
	        this.backgroundOffset = this.STARTING_BACKGROUND_OFFSET,
	        this.spriteOffset = this.STARTING_SPRITE_OFFSET,
	        this.bgVelocity = this.STARTING_BACKGROUND_VELOCITY,
	        this.platformOffset = this.STARTING_PLATFORM_OFFSET,
	        this.platformVelocity;

	    //Key codes
	    this.KEY_P = 80,
	        this.KEY_JUMP = 38,
	        this.KEY_X = 88,

	        // Sprite sheet cells................................................

	        this.RUNNER_CELLS_WIDTH = 40; // pixels
	    this.RUNNER_CELLS_HEIGHT = 48;

	    this.EXPLOSION_CELLS_HEIGHT = 62;

	    this.explosionCells = [{
	            left: 3,
	            top: 48,
	            width: 52,
	            height: this.EXPLOSION_CELLS_HEIGHT
	        },
	        {
	            left: 63,
	            top: 48,
	            width: 70,
	            height: this.EXPLOSION_CELLS_HEIGHT
	        },
	        {
	            left: 146,
	            top: 48,
	            width: 70,
	            height: this.EXPLOSION_CELLS_HEIGHT
	        },
	        {
	            left: 233,
	            top: 48,
	            width: 70,
	            height: this.EXPLOSION_CELLS_HEIGHT
	        },
	        {
	            left: 308,
	            top: 48,
	            width: 70,
	            height: this.EXPLOSION_CELLS_HEIGHT
	        },
	        {
	            left: 392,
	            top: 48,
	            width: 70,
	            height: this.EXPLOSION_CELLS_HEIGHT
	        },
	        {
	            left: 473,
	            top: 48,
	            width: 70,
	            height: this.EXPLOSION_CELLS_HEIGHT
	        }
	    ];

	    this.boxCells = [{
	        left: 14,
	        top: 248,
	        width: 43,
	        height: 39
	    }];
	    // Sprite sheet cells................................................

	    this.runnerCellsRight = [{
	                left: 4,
	                top: 311,
	                width: 37,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 47,
	                top: 311,
	                width: 39,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 91,
	                top: 311,
	                width: 39,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 134,
	                top: 311,
	                width: 45,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 184,
	                top: 311,
	                width: 44,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 233,
	                top: 311,
	                width: 38,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 279,
	                top: 311,
	                width: 37,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 323,
	                top: 311,
	                width: 41,
	                height: this.RUNNER_CELLS_HEIGHT
	            },

	            {
	                left: 419,
	                top: 311,
	                width: 42,
	                height: this.RUNNER_CELLS_HEIGHT
	            }
	        ];

	    // Sprite data.......................................................

	    //Platforms
	    //Investigate writing a function which will generate random 
	    //positions and fillStyles for the platforms
	    this.platformData = [
	        //Screen 1
	        {
	            left: 50,
	            width: 800,
	            height: this.PLATFORM_HEIGHT,
	            fillStyle: 'rgb(66, 244, 143)',
	            opacity: 1.0,
	            track: 1,
	            pulsate: false
	        },
	    ];

	    this.boxData = [{
	            left: 1900,
	            top: this.TRACK_1_BASELINE - 39
	        },
	        {
	            left: 2700,
	            top: this.TRACK_1_BASELINE - 39
	        },
	        {
	            left: 3600,
	            top: this.TRACK_1_BASELINE - 39
	        },
	    ];

	    this.smokingHoleData = [{
	        left: 10,
	        top: this.TRACK_1_BASELINE
	    }, ];

	    //Sprite Behaviours
	    this.runBehaviour = {
	        lastAdvanceTime: 0,

	        execute: function(sprite, now, fps, context, lastAnimationFrameTime) {
	            if (sprite.runAnimationRate === 0) {
	                return;
	            }
	            if (this.lastAdvanceTime === 0) {
	                this.lastAdvanceTime = now;
	            } else if (now - this.lastAdvanceTime > 1000 / sprite.runAnimationRate) {
	                sprite.artist.advance();
	                this.lastAdvanceTime = now;
	            }
	        }
	    };

	    this.paceBehaviour = {
	        setDirection: function(sprite) {
	            var sRight = sprite.left + sprite.width,
	                pRight = sprite.platform.left + sprite.platform.width;

	            if (sprite.direction === undefined) {
	                sprite.direction = snailBait.RIGHT;
	            }
	            if (sRight > pRight && sprite.direction === snailBait.RIGHT) {
	                sprite.direction = snailBait.LEFT;
	            } else if (sprite.left < sprite.platform.left && sprite.direction === snailBait.LEFT) {
	                sprite.direction = snailBait.RIGHT;
	            }
	        },

	        setPosition: function(sprite, now, lastAnimationFrameTime) {
	            //console.log(sprite.velocityX);
	            var pixelsToMove = sprite.velocityX * (now - lastAnimationFrameTime) / 1000;
	            //console.log(pixelsToMove);

	            if (sprite.direction === snailBait.RIGHT) {
	                sprite.left += pixelsToMove;
	            } else {
	                sprite.left -= pixelsToMove;
	            }
	        },

	        execute: function(sprite, now, fps, context, lastAnimationFrameTime) {
	            //console.log("Pace Behaviour Execute being called");
	            this.setDirection(sprite);
	            this.setPosition(sprite, now, lastAnimationFrameTime);
	        }
	    };

	    //Runner Jump Behaviour
	    this.jumpBehaviour = {
	        pause: function(sprite, now) {
	            if (sprite.ascendTimer.isRunning()) {
	                sprite.ascendTimer.pause(now);
	            } else if (sprite.descendTimer.isRunning()) {
	                sprite.descendTimer.pause(now);
	            }
	        },

	        unpause: function(sprite, now) {
	            if (sprite.ascendTimer.isRunning()) {
	                sprite.ascendTimer.unpause(now);
	            } else if (sprite.descendTimer.isRunning()) {
	                sprite.descendTimer.unpause(now);
	            }
	        },

	        isAscending: function(sprite) {
	            return sprite.ascendTimer.isRunning();
	        },

	        ascend: function(sprite, now) {
	            var elapsedTime = sprite.ascendTimer.getElapsedTime(now),
	                deltaY = elapsedTime / (sprite.JUMP_DURATION / 2) * sprite.JUMP_HEIGHT;
	            sprite.top = sprite.verticalLaunchPosition - deltaY;
	        },

	        isDoneAscending: function(sprite, now) {
	            return sprite.ascendTimer.getElapsedTime(now) > sprite.JUMP_DURATION / 2;
	        },

	        finishAscent: function(sprite, now) {
	            sprite.jumpApex = sprite.top;
	            sprite.ascendTimer.stop(now);
	            sprite.descendTimer.start(now);
	        },

	        isDescending: function(sprite) {
	            return sprite.descendTimer.isRunning();
	        },

	        descend: function(sprite, now) {
	            var elapsedTime = sprite.descendTimer.getElapsedTime(now),
	                deltaY = elapsedTime / (sprite.JUMP_DURATION / 2) * sprite.JUMP_HEIGHT;
	            sprite.top = sprite.jumpApex + deltaY;
	        },

	        isDoneDescending: function(sprite, now) {
	            return sprite.descendTimer.getElapsedTime(now) > sprite.JUMP_DURATION / 2;
	        },

	        finishDescent: function(sprite, now) {
	            sprite.stopJumping();
	            sprite.runAnimationRate = snailBait.RUN_ANIMATION_RATE;
	            //console.log(sprite.runAnimationRate);
	            if (snailBait.platformUnderneath(sprite)) {
	                sprite.top = sprite.verticalLaunchPosition;
	            } else {
	                sprite.fall();
	            }
	            //sprite.runAnimationRate = snailBait.RUN_ANIMATION_RATE;
	        },

	        execute: function(sprite, now, fps, context, lastAnimationFrameTime) {
	            if (!sprite.jumping) {
	                return;
	            }
	            if (this.isAscending(sprite)) {
	                if (!this.isDoneAscending(sprite, now)) {
	                    this.ascend(sprite, now);
	                } else {
	                    this.finishAscent(sprite, now);
	                }
	            } else if (this.isDescending(sprite)) {
	                if (!this.isDoneDescending(sprite, now)) {
	                    this.descend(sprite, now);
	                } else {
	                    this.finishDescent(sprite, now);
	                }
	            }
	        }
	    };

	    this.collideBehaviour = {
	        //Three step process
	        //1. What should we consider for collision?
	        //2. Is there a collision
	        //3. React to the collision
	        isCandidateForCollision: function(sprite, otherSprite) {
	            var s, o;
	            s = sprite.calculateCollisionRectangle(),
	                o = otherSprite.calculateCollisionRectangle();

	            candidate = o.left < s.right && sprite !== otherSprite &&
	                sprite.visible && otherSprite.visible && !sprite.exploding && !otherSprite.exploding;
	            return candidate;
	        },

	        didCollide: function(sprite, otherSprite, context) {
	            var o = otherSprite.calculateCollisionRectangle(),
	                r = sprite.calculateCollisionRectangle();
	            //Determine if any of the four corners of the runner's
	            //sprite or the centre lie within the other sprites
	            //bounding box
	            context.beginPath();
	            context.rect(o.left, o.top, o.right - o.left, o.bottom - o.top);
	            var collision = context.isPointInPath(r.left, r.top) || context.isPointInPath(r.right, r.top) || context.isPointInPath(r.left, r.bottom) || context.isPointInPath(r.right, r.bottom) || context.isPointInPath(r.centreX, r.centreY);
	            return collision;

	        },

	        processPlatformCollisionDuringJump: function(sprite, platform) {
	            var isDescending = sprite.descendTimer.isRunning();
	            sprite.stopJumping();
	            if (isDescending) {
	                sprite.track = platform.track;
	                sprite.top = snailBait.calculatePlatformTop(sprite.track) - sprite.height;
	            } else {
	                sprite.fall();
	            }
	        },

	        processBadGuyCollision: function(sprite) {
	            snailBait.explode(sprite);
	            snailBait.shake();
	            snailBait.loseLife();
	        },

	        processCollision: function(sprite, otherSprite) {
	            //console.log(sprite.type, otherSprite.type);
	            if (sprite.jumping && 'platform' === otherSprite.type) {
	                //console.log("Jump platform collision");
	                this.processPlatformCollisionDuringJump(sprite, otherSprite);
	            }
	            if ('box' === otherSprite.type) {
	                //console.log("Bad collision");
	                this.processBadGuyCollision(sprite);
	            }
	        },

	        execute: function(sprite, now, fps, context, lastAnimationFrameTime) {
	            var otherSprite;
	            for (var i = 0; i < snailBait.sprites.length; ++i) {
	                otherSprite = snailBait.sprites[i];
	                if (this.isCandidateForCollision(sprite, otherSprite)) {
	                    if (this.didCollide(sprite, otherSprite, context)) {
	                        this.processCollision(sprite, otherSprite);
	                    }
	                }
	            }
	        }
	    };

	    //Fall Behaviour
	    this.fallBehaviour = {

	        pause: function(sprite, now) {
	            sprite.fallTimer.pause(now);
	        },

	        unpause: function(sprite, now) {
	            sprite.fallTimer.unpause(now);
	        },

	        isOutOfPlay: function(sprite) {
	            return sprite.top > snailBait.canvas.height;
	        },

	        setSpriteVelocity: function(sprite, now) {
	            sprite.velocityY = sprite.initialVelocityY + snailBait.GRAVITY_FORCE * (sprite.fallTimer.getElapsedTime(now) / 1000) * snailBait.PIXELS_PER_METRE;
	            //console.log(sprite.velocityY);
	        },

	        calculateVerticalDrop: function(sprite, now, lastAnimationFrameTime) {
	            return sprite.velocityY * (now - lastAnimationFrameTime) / 1000;
	        },

	        willFallBelowCurrentTrack: function(sprite, dropDistance) {
	            return sprite.top + sprite.height + dropDistance > snailBait.calculatePlatformTop(sprite.track);
	        },

	        fallOnPlatform: function(sprite) {
	            sprite.stopFalling();
	            snailBait.putSpriteOnTrack(sprite, sprite.track);
	        },

	        moveDown: function(sprite, now, lastAnimationFrameTime) {
	            var dropDistance;
	            this.setSpriteVelocity(sprite, now);
	            dropDistance = this.calculateVerticalDrop(sprite, now, lastAnimationFrameTime);
	            //console.log(dropDistance);
	            if (!this.willFallBelowCurrentTrack(sprite, dropDistance)) {
	                sprite.top += dropDistance;
	            } else {
	                if (snailBait.platformUnderneath(sprite)) {
	                    this.fallOnPlatform(sprite);
	                    sprite.stopFalling();
	                } else {
	                    sprite.track--;
	                    sprite.top += dropDistance;
	                }
	            }
	        },

	        execute: function(sprite, now, fps, context, lastAnimationFrameTime) {
	            if (!sprite.falling) {
	                if (!sprite.jumping && !snailBait.platformUnderneath(sprite)) {
	                    sprite.fall();
	                }
	            } else {
	                if (this.isOutOfPlay(sprite) || sprite.exploding) {
	                    sprite.stopFalling();
	                    if (this.isOutOfPlay(sprite)) {
	                        snailBait.loseLife();
	                    }
	                } else {
	                    //console.log("Sprite is falling so move it down");
	                    this.moveDown(sprite, now, lastAnimationFrameTime);
	                }
	            }
	        }

	    };

	    //Runner explosions

	    this.runnerExplodeBehaviour = new CellSwitchBehaviour(
	        this.explosionCells, this.RUNNER_EXPLOSION_DURATION,
	        function(sprite, now, fps) {
	            return sprite.exploding;
	        },
	        function(sprite, animator) {
	            sprite.exploding = false;
	        });

	    //Sprites
	    //This costs more memory but is faster to iterate through all of the sprites of a particular type
	    this.sprites = [];
	    this.platforms = [];
	    this.boxes = [];

	    this.platformArtist = {
	        draw: function(sprite, context) {
	            var PLATFORM_STROKE_WIDTH = 1.0,
	                PLATFORM_STROKE_STYLE = 'black',
	                top;
	            top = snailBait.calculatePlatformTop(sprite.track);
	            context.lineWidth = PLATFORM_STROKE_WIDTH;
	            context.strokeStyle = PLATFORM_STROKE_STYLE;
	            context.fillStyle = sprite.fillStyle;

	            context.strokeRect(sprite.left, top, sprite.width,
	                sprite.height);
	            context.fillRect(sprite.left, top, sprite.width,
	                sprite.height);

	        }
	    }
	}; //End of constructor

	SnailBait.prototype = {
	    createSprites: function() {
	        this.createPlatformSprites();
	        this.createRunnerSprite();
	        this.createBoxSprites();
	        this.initializeSprites();
	        //Add all of the sprites to a single array
	        this.addSpritesToSpriteArray();
	    },

	    addSpritesToSpriteArray: function() {
	        for (var i = 0; i < this.platforms.length; ++i) {
	            this.sprites.push(this.platforms[i]);
	        }
	        for (var i = 0; i < this.boxes.length; ++i) {
	            this.sprites.push(this.boxes[i]);
	        }

	        this.sprites.push(this.runner);
	    },

	    initializeSprites: function() {
	        this.positionSprites(this.boxes, this.boxData);

	        this.equipRunner();
	    },

	    equipRunner: function() {
	        this.equipRunnerForJumping();
	        this.equipRunnerForFalling();
	    },

	    equipRunnerForJumping: function() {
	        var INITIAL_TRACK = 1,
	            RUNNER_JUMP_HEIGHT = 100,
	            RUNNER_JUMP_DURATION = 500,
	            EASING_FACTOR = 1.1;

	        this.runner.JUMP_HEIGHT = RUNNER_JUMP_HEIGHT;
	        this.runner.JUMP_DURATION = RUNNER_JUMP_DURATION;
	        this.runner.jumping = false;
	        this.runner.track = INITIAL_TRACK;
	        this.runner.ascendTimer = new AnimationTimer(this.runner.JUMP_DURATION / 2, AnimationTimer.makeEaseOutEasingFunction(EASING_FACTOR));
	        this.runner.descendTimer = new AnimationTimer(this.runner.JUMP_DURATION / 2, AnimationTimer.makeEaseInEasingFunction(EASING_FACTOR));

	        this.runner.jump = function() {
	            if (this.jumping) {
	                return;
	            }
	            this.jumping = true;
	            this.runAnimationRate = 0;
	            this.verticalLaunchPosition = this.top;
	            this.ascendTimer.start(snailBait.timeSystem.calculateGameTime());
	        };

	        this.runner.stopJumping = function() {
	            this.descendTimer.stop();
	            this.jumping = false;
	        };
	    },

	    equipRunnerForFalling: function() {
	        this.runner.fallTimer = new AnimationTimer();
	        this.runner.fall = function(initialVelocity) {
	            this.falling = true;
	            this.velocityY = initialVelocity || 0;
	            this.initialVelocityY = initialVelocity || 0;
	            this.fallTimer.start(snailBait.timeSystem.calculateGameTime());
	        };
	        this.runner.stopFalling = function() {
	            this.falling = false;
	            this.velocityY = 0;
	            this.fallTimer.stop(snailBait.timeSystem.calculateGameTime());
	        };
	    },

	    positionSprites: function(sprites, spriteData) {
	        var sprite;
	        for (var i = 0; i < sprites.length; ++i) {
	            sprite = sprites[i];
	            if (spriteData[i].platformIndex) {
	                this.putSpriteOnPlatform(sprite, this.platforms[spriteData[i].platformIndex]);
	            } else {
	                sprite.top = spriteData[i].top;
	                sprite.left = spriteData[i].left;
	            }
	        }
	    },

	    putSpriteOnPlatform: function(sprite, platformSprite) {
	        sprite.top = platformSprite.top - sprite.height;
	        sprite.left = platformSprite.left;
	        sprite.platform = platformSprite;
	    },

	    putSpriteOnTrack: function(sprite, track) {
	        sprite.track = track;
	        sprite.top = this.calculatePlatformTop(sprite.track) - sprite.height;
	    },

	    platformUnderneath: function(sprite, track) {
	        var platform, platformUnderneath,
	            sr = sprite.calculateCollisionRectangle(),
	            pr;
	        if (track === undefined) {
	            track = sprite.track;
	        }
	        for (var i = 0; i < snailBait.platforms.length; ++i) {
	            platform = snailBait.platforms[i];
	            pr = platform.calculateCollisionRectangle();
	            if (track === platform.track) {
	                if (sr.right > pr.left && sr.left < pr.right) {
	                    platformUnderneath = platform;
	                    break;
	                }
	            }
	        }
	        return platformUnderneath;
	    },

	    createPlatformSprites: function() {
	        var sprite, pd,
	            PULSE_DURATION = 800,
	            PULSE_OPACITY_THRESHOLD = 0.1;
	        for (var i = 0; i < this.platformData.length; ++i) {
	            pd = this.platformData[i];
	            sprite = new Sprite('platform', this.platformArtist);
	            sprite.left = pd.left;
	            sprite.width = pd.width;
	            sprite.height = pd.height;
	            sprite.fillStyle = pd.fillStyle;
	            sprite.opacity = pd.opacity;
	            sprite.track = pd.track;
	            sprite.pulsate = pd.pulsate;

	            sprite.top = this.calculatePlatformTop(pd.track);
	            if (sprite.pulsate) {
	                sprite.behaviours = [new PulseBehaviour(PULSE_DURATION, PULSE_OPACITY_THRESHOLD)];
	            }

	            this.platforms.push(sprite);
	        }
	    },

	    createRunnerSprite: function() {
	        var RUNNER_LEFT = 50,
	            RUNNER_HEIGHT = 53,
	            STARTING_RUN_ANIMATION_RATE = 0,
	            STARTING_RUNNER_TRACK = 1;

	        this.runner = new Sprite('runner', new SpriteSheetArtist(this.spritesheet, this.runnerCellsRight), [this.runBehaviour, this.jumpBehaviour, this.collideBehaviour, this.fallBehaviour, this.runnerExplodeBehaviour]);
	        this.runner.runAnimationRate = STARTING_RUN_ANIMATION_RATE;
	        this.runner.track = STARTING_RUNNER_TRACK;
	        this.runner.left = RUNNER_LEFT;
	        this.runner.top = this.calculatePlatformTop(this.runner.track) - RUNNER_HEIGHT;
	        this.runner.width = this.RUNNER_CELLS_WIDTH;
	        this.runner.height = this.RUNNER_CELLS_HEIGHT;
	        this.sprites.push(this.runner);
	    },

	    createBoxSprites: function() {
	        var box;

	        for (var i = 0; i < this.boxData.length; ++i) {
	            box = new Sprite('box', new SpriteSheetArtist(this.spritesheet, this.boxCells));
	            box.width = 48;
	            box.height = 31;
	            box.value = 200;
	            box.left = 30;
	            this.boxes.push(box);
	        }
	    },

	    //Animation
	    animate: function(now) {
	        //Replace the time passed to animate by the browser
	        //with our own game time
	        //console.log(this.score);
	        //console.log(snailBait.BACKGROUND_VELOCITY);

	        now = snailBait.timeSystem.calculateGameTime();
	        if (snailBait.paused) {
	            setTimeout(function() {
	                requestAnimationFrame(snailBait.animate);
	            }, snailBait.PAUSED_CHECK_INTERVAL);
	        } else {
	            fps = snailBait.calculateFps(now);

	            if (!snailBait.hasDied) //Stop counting up if the player dies
	            {
	                //Increment and Write Score every frame.
	                this.score++;
	            }

	            //Draw Score on screen every frame
	            this.snailBait.scoreElement.innerHTML = this.score;

	            //Speed up background velocity and box velocity.
	            snailBait.speedUp();

	            snailBait.highScoreElement.innerHTML = "Highscore: " + localStorage.getItem('score');

	            if (fps <= 30 && !snailBait.paused) //Show Warning Message On Frame Drop
	            {
	            	snailBait.fpsElement.style.color = 'red';
	                snailBait.revealToast("FPS Low. Problems Might Occur", 3000);
	            }
	            else
	            {
	            	snailBait.fpsElement.style.color = 'green';
	            }

	            snailBait.draw(now);
	            snailBait.lastAnimationFrameTime = now;
	            requestAnimationFrame(snailBait.animate);
	        }
	    },

	    calculateFps: function(now) {
	        var fps = 1 / (now - snailBait.lastAnimationFrameTime) * 1000 *
	            this.timeRate;
	        if (now - snailBait.lastFpsUpdateTime > 1000) {
	            snailBait.lastFpsUpdateTime = now;
	            snailBait.fpsElement.innerHTML = fps.toFixed(0) + ' fps';
	        }
	        return fps;
	    },

	    initializeImages: function() {
	        snailBait.background.src = 'images/background.png';
	        snailBait.runner.src = 'images/runner.png';
	        snailBait.loadingAnimatedGIFElement.src = 'images/snail.gif';
	        this.spritesheet.src = 'images/spritesheet.png';

	        this.background.onload = function(e) {
	            snailBait.backgroundLoaded();
	        };

	        this.loadingAnimatedGIFElement.onload = function(e) {
	            snailBait.loadingAnimationLoaded();
	        };
	    },

	    backgroundLoaded: function() {
	        var LOADING_SCREEN_TRANSITION_DURATION = 2000;
	        this.fadeOutElements(this.loadingElement, LOADING_SCREEN_TRANSITION_DURATION);
	        setTimeout(function(e) {
	            snailBait.startGame();
	            //console.log(localStorage.setItem('score', score));
	            snailBait.gameStarted = true;
	        }, LOADING_SCREEN_TRANSITION_DURATION);
	    },

	    loadingAnimationLoaded: function() {
	        if (!this.gameStarted) {
	            this.fadeInElements(this.loadingAnimatedGIFElement, this.loadingTitleElement);
	        }
	    },

	    startGame: function() {
	        //this.togglePaused();
	        this.revealGame();

	        if(snailBait.mobile)
		    {
		        this.fadeInElements(snailBait.mobileWelcomeToast);
		        //this.mobileInstructionsVisible = true;
		    }
		    else
		    {   
			    this.revealInitialToast();
			    //this.playing = true;
		    }
		    
	        //this.revealInitialToast();
	        //Initially Sets the player to move right
	        snailBait.turnRight();
	        snailBait.putSpriteOnTrack(snailBait.runner, 1);
	        this.timeSystem.start();
	        //this.setTimeRate(0.5);
	        this.gameStarted = true;

	        window.requestAnimationFrame(snailBait.animate);
	    },



	    setTimeRate: function(rate) {
	        this.timeRate = rate;
	        this.timeSystem.setTransducer(function(now) {
	            return now * snailBait.timeRate;
	        });
	    },

	    revealGame: function() {
	        var DIM_CONTROLS_DELAY = 300;
	        this.revealTopChromeDimmed();
	        this.revealCanvas();
	        this.revealBottomChrome();

	        setTimeout(function() {
	            snailBait.dimControls();
	            snailBait.revealTopChrome();
	        }, DIM_CONTROLS_DELAY);
	    },

	    revealTopChromeDimmed: function() {
	        var DIM = 0.25;
	        this.scoreElement.style.display = 'block';
	        this.fpsElement.style.display = 'block';
	        setTimeout(function() {
	            snailBait.scoreElement.style.opacity = 'block';
	            snailBait.fpsElement.style.opacity = 'block';
	        }, this.SHORT_DELAY);
	    },

	    revealCanvas: function() {
	        this.fadeInElements(this.canvas);
	    },

	    revealBottomChrome: function() {
	        this.fadeInElements(this.instructionElement, this.copyrightElement);
	    },

	    dimControls: function() {
	        var FINAL_OPACITY = 1;
	        snailBait.instructionElement.style.opacity = FINAL_OPACITY;
	    },

	    revealTopChrome: function() {
	        this.fadeInElements(this.fpsElement, this.scoreElement);
	    },

	    revealInitialToast: function() {
	        var INITIAL_TOAST_DELAY = 200,
	            INITIAL_TOAST_DURATION = 1500;
	        setTimeout(function() {
	            snailBait.revealToast('Jump over the obstacles.', INITIAL_TOAST_DURATION);
	        }, INITIAL_TOAST_DELAY);
	    },

	    drawBoxes: function() {
	        snailBait.sprites[2].left -= snailBait.BOX_MOVEMENT_SPEED;
	        snailBait.sprites[3].left -= snailBait.BOX_MOVEMENT_SPEED;
	        snailBait.sprites[4].left -= snailBait.BOX_MOVEMENT_SPEED;
	        if (snailBait.sprites[2].left < -100) {
	            snailBait.sprites[2].left = snailBait.sprites[4].left + Math.floor((Math.random() * 100) + 200);
	        }

	        if (snailBait.sprites[3].left < -100) {
	            snailBait.sprites[3].left = snailBait.sprites[2].left + Math.floor((Math.random() * 200) + 600);
	        }

	        if (snailBait.sprites[4].left < -100) {
	            snailBait.sprites[4].left = snailBait.sprites[3].left + Math.floor((Math.random() * 50) + 900);
	        }
	    },

	    draw: function(now) {
	        snailBait.setPlatformVelocity();
	        snailBait.setOffsets(now);
	        snailBait.drawBackground();
	        this.updateSprites(now);
	        this.drawBoxes();
	        //console.log("About to call drawSprites");
	        this.drawSprites();
	        if(snailBait.mobileInstructionsVisible)
		    {
		        snailBait.drawMobileInstructions();
		    }
	        //snailBait.drawRunner();
	        //snailBait.drawPlatforms();
	       	
	    },

	    updateSprites: function(now) {
	        var sprite;
	        for (var i = 0; i < this.sprites.length; i++) {
	            sprite = this.sprites[i];
	            if (sprite.visible && this.isSpriteInView(sprite)) {
	                //this.context.translate(-sprite.hOffset, 0);
	                sprite.update(now, this.fps, this.context, this.lastAnimationFrameTime);
	                //this.context.translate(sprite.hOffset, 0);
	            }
	        }
	    },

	    //lines 968-979 & 996-1071 gotten from powerpoint on moodle
	    detectMobile: function()
		{
      		snailBait.mobile = 'ontouchstart' in window;
      		console.log(snailBait.mobile);
   		},

   		resizeElement: function(element, w, h)
	   	{
	    	element.style.width = w + 'px';
	    	element.style.height = h + 'px';
	   	},


	    drawSprites: function() {
	        var sprite;
	        for (var i = 0; i < this.sprites.length; i++) {
	            //console.log(this.sprite[i].type);
	            sprite = this.sprites[i];
	            //console.log(sprite);
	            if (sprite.visible && this.isSpriteInView(sprite)) {
	                this.context.translate(-sprite.hOffset, 0);
	                sprite.draw(this.context);
	                this.context.translate(sprite.hOffset, 0);
	            }
	        }
	    },

	   	fitScreen: function()
	   	{
	    	var arenaSize = snailBait.calculateArenaSize(snailBait.getViewportSize());
	    	snailBait.resizeElementsToFitScreen(arenaSize.width, arenaSize.height);
	   	},

	   	getViewportSize: function()
		{
			return { 
		    width: Math.max(document.documentElement.clientWidth 
		    || window.innerWidth || 0), 
		    height: Math.max(document.documentElement.clientHeight 
		    || window.innerHeight || 0)};
		},


   		drawMobileInstructions: function()
   		{
      		var cw = this.canvas.width,
          	ch = this.canvas.height,
          	TOP_LINE_OFFSET = 115,
          	LINE_HEIGHT = 40;

      	this.context.save();
      	this.initializeContextForMobileInstruction();
      	this.drawMobileDivider(cw, ch);
      	this.drawMobileInstructionsLeft(cw, ch, TOP_LINE_OFFSET, LINE_HEIGHT);
      	this.drawMobileInstructionsRight(cw, ch, TOP_LINE_OFFSET, LINE_HEIGHT);
      	this.context.restore();
   		},

	   initializeContextForMobileInstruction: function()
	   {
	      	this.context.textAlign = 'center';
	      	this.context.textBaseLine = 'middle';
	      	this.context.font = '26px fantasy';
	      	this.context.shadowBlur = 2;
	      	this.context.shadowOffsetX = 2;
	      	this.context.shadowOffsetY = 2;
	      	this.context.shadowColor = 'black';
	      	this.context.fillStyle = 'yellow';
	      	this.context.strokeStyle = 'yellow';
	    },

	   drawMobileDivider: function(cw, ch)
	   {
	      	this.context.beginPath();
	      	this.context.moveTo(cw/2, 0);
	      	this.context.lineTo(cw/2, ch);
	    	this.context.stoke();
	   	},

   		drawMobileInstructionsLeft: function(cw, ch, topLineOffset, lineHeight)
   		{
      		this.context.font = '32px fantasy';
      		this.context.fillText('Tap on this side to:', cw/4, ch/2-topLineOffset);
      		this.context.fillStyle = 'white';
      		this.context.font = 'italic 26px fantasy';
      		this.context.fillText('Turn around when running right', cw/4,
        	ch/2 - topLineOffset + 2 * lineHeight);
      		this.context.fillText('Jump when running left', cw/4,
         	ch/2 - topLineOffset + 3 * lineHeight);
   		},

   		drawMobileInstructionsRight: function(cw, ch, topLineOffset, lineHeight)
   		{
      		this.context.font = '32px fantasy';
      		this.context.fillText('Tap on this side to:', 3*cw/4, ch/2-topLineOffset);
      		this.context.fillStyle = 'white';
      		this.context.font = 'italic 26px fantasy';
      		this.context.fillText('Turn around when running left', 3*cw/4,
         	ch/2 - topLineOffset + 2 * lineHeight);
      		this.context.fillText('Jump when running right', 3*cw/4,
         	ch/2 - topLineOffset + 3 * lineHeight);
      		this.context.fillText('Start running right', 3*cw/4,
         	ch/2 - topLineOffset + 5 * lineHeight);
   		},


	    isSpriteInView: function(sprite) {
	        return sprite.left + sprite.width > sprite.hOffset && sprite.left < sprite.hOffset + this.canvas.width;
	    },

	    drawBackground: function() {
	        snailBait.context.translate(-snailBait.backgroundOffset, 0);
	        snailBait.context.drawImage(snailBait.background, 0, 0);
	        snailBait.context.drawImage(snailBait.background, snailBait.background.width, 0);
	        snailBait.context.translate(snailBait.backgroundOffset, 0);
	    },

	    drawRunner: function() {
	        snailBait.context.drawImage(snailBait.runner, snailBait.RUNNER_LEFT, snailBait.calculatePlatformTop(snailBait.STARTING_RUNNER_TRACK) - snailBait.runner.height);
	    },

	    drawPlatform: function(data) {
	        var platformTop = snailBait.
	        calculatePlatformTop(data.track);
	        snailBait.context.lineWidth = snailBait.PLATFORM_STROKE_WIDTH;
	        snailBait.context.strokeStyle = snailBait.PLATFORM_STROKE_STYLE;
	        snailBait.context.fillStyle = data.fillStyle;
	        snailBait.context.globalAlpha = data.opacity;
	        snailBait.context.strokeRect(data.left, platformTop, data.width, data.height);
	        snailBait.context.fillRect(data.left, platformTop, data.width, data.height);
	    },

	    drawPlatforms: function() {
	        var index;
	        snailBait.context.translate(-snailBait.platformOffset, 0);
	        for (index = 0; index < snailBait.platformData.length; ++index) {
	            snailBait.drawPlatform(snailBait.platformData[index]);
	        }
	        snailBait.context.translate(snailBait.platformOffset, 0);
	    },

	    calculatePlatformTop: function(track) {
	        if (track === 1) {
	            return snailBait.TRACK_1_BASELINE;
	        }
	    },

	    setBackgroundOffset: function(now) {
	        snailBait.backgroundOffset += snailBait.bgVelocity * (now - snailBait.lastAnimationFrameTime) / 1000;
	        if (snailBait.backgroundOffset < 0 || snailBait.backgroundOffset > snailBait.background.width) {
	            snailBait.backgroundOffset = 0;
	        }
	    },

	    turnLeft: function() {
	        snailBait.bgVelocity = -snailBait.BACKGROUND_VELOCITY;
	        this.runner.runAnimationRate = this.RUN_ANIMATION_RATE;
	        this.runner.artist.cells = this.runnerCellsLeft;
	    },

	    turnRight: function() {
	        snailBait.bgVelocity = snailBait.BACKGROUND_VELOCITY;
	        this.runner.runAnimationRate = this.RUN_ANIMATION_RATE;
	        this.runner.artist.cells = this.runnerCellsRight;
	    },

	    speedUp: function() {

	        snailBait.BACKGROUND_VELOCITY = snailBait.BACKGROUND_VELOCITY + snailBait.SPEED_UP_RATE;
	        snailBait.bgVelocity = snailBait.BACKGROUND_VELOCITY;
	        snailBait.BOX_MOVEMENT_SPEED += 0.001;
	    },

	    setPlatformVelocity: function() {
	        snailBait.platformVelocity = snailBait.bgVelocity * snailBait.PLATFORM_VELOCITY_MULTIPLER;
	    },

	    setPlatformOffset: function(now) {
	        snailBait.platformOffset += snailBait.platformVelocity * (now - snailBait.lastAnimationFrameTime) / 1000;
	        //console.log(snailBait.platformOffset);
	        if (snailBait.platformOffset > 2 * snailBait.background.width) {
	            snailBait.turnLeft();
	        } else if (snailBait.platformOffset < 0) {
	            snailBait.turnRight();
	        }
	    },

	    setOffsets: function(now) {
	        snailBait.setBackgroundOffset(now);
	        snailBait.setSpriteOffsets(now);
	        //snailBait.setPlatformOffset(now);
	    },

	    setSpriteOffsets: function(now) {
	        var sprite;

	        // In step with platforms
	        this.spriteOffset +=
	            this.platformVelocity * (now - this.lastAnimationFrameTime) / 1000;

	        for (var i = 0; i < this.sprites.length; ++i) {
	            sprite = this.sprites[i];

	            if ('runner' !== sprite.type) {
	                sprite.hOffset = this.spriteOffset;
	            }
	        }
	    },

	    togglePaused: function() {
	        var now = this.timeSystem.calculateGameTime();
	        this.paused = !this.paused;
	        if (this.paused) {
	            this.pauseStartTime = now;
	        } else {
	            this.lastAnimationFrameTime += (now - this.pauseStartTime);

	        }
	    },

	    revealToast: function(text, duration) {
	        var DEFAULT_TOAST_DURATION = 1000;
	        duration = duration || DEFAULT_TOAST_DURATION;
	        this.startToastTransition(text, duration);
	        setTimeout(function(e) {
	            snailBait.hideToast();
	        }, duration);
	    },

	    startToastTransition: function(text, duration) {
	        this.toastElement.innerHTML = text;
	        this.fadeInElements(this.toastElement);
	    },

	    hideToast: function() {
	        var TOAST_TRANSITION_DURATION = 500;
	        this.fadeOutElements(this.toastElement, TOAST_TRANSITION_DURATION);
	    },

	    fadeInElements: function() {
	        var args = arguments;
	        for (var i = 0; i < args.length; ++i) {
	            args[i].style.display = 'block';
	        }
	        setTimeout(function(e) {
	            for (var i = 0; i < args.length; ++i) {
	                args[i].style.opacity = snailBait.OPAQUE;
	            }
	        }, this.SHORT_DELAY);
	    },

	    fadeOutElements: function() {
	        var args = arguments,
	            fadeDuration = args[args.length - 1];

	        for (var i = 0; i < args.length - 1; ++i) {
	            args[i].style.opacity = snailBait.TRANSPARENT;
	        }
	        setTimeout(function(e) {
	            for (var i = 0; i < args.length - 1; ++i) {
	                args[i].style.display = 'none';
	            }
	        }, fadeDuration);
	    },

	    explode: function(sprite) {
	        if (!sprite.exploding) {
	            if (sprite.runAnimationRate === 0) {
	                sprite.runAnimationRate = this.RUN_ANIMATION_RATE;
	            }
	            sprite.exploding = true;
	        }
	    },

	    shake: function() {
	        var SHAKE_INTERVAL = 80, // milliseconds
	            v = snailBait.BACKGROUND_VELOCITY * 1.5,
	            ov = snailBait.bgVelocity; // ov means original velocity

	        snailBait.bgVelocity = -v;

	        setTimeout(function(e) {
	            snailBait.bgVelocity = v;
	            setTimeout(function(e) {
	                snailBait.bgVelocity = -v;
	                setTimeout(function(e) {
	                    snailBait.bgVelocity = v;
	                    setTimeout(function(e) {
	                        snailBait.bgVelocity = -v;
	                        setTimeout(function(e) {
	                            snailBait.bgVelocity = v;
	                            setTimeout(function(e) {
	                                snailBait.bgVelocity = -v;
	                                setTimeout(function(e) {
	                                    snailBait.bgVelocity = v;
	                                    setTimeout(function(e) {
	                                        snailBait.bgVelocity = -v;
	                                        setTimeout(function(e) {
	                                            snailBait.bgVelocity = v;
	                                            setTimeout(function(e) {
	                                                snailBait.bgVelocity = -v;
	                                                setTimeout(function(e) {
	                                                    snailBait.bgVelocity = v;
	                                                    setTimeout(function(e) {
	                                                        snailBait.bgVelocity = ov;
	                                                    }, SHAKE_INTERVAL);
	                                                }, SHAKE_INTERVAL);
	                                            }, SHAKE_INTERVAL);
	                                        }, SHAKE_INTERVAL);
	                                    }, SHAKE_INTERVAL);
	                                }, SHAKE_INTERVAL);
	                            }, SHAKE_INTERVAL);
	                        }, SHAKE_INTERVAL);
	                    }, SHAKE_INTERVAL);
	                }, SHAKE_INTERVAL);
	            }, SHAKE_INTERVAL);
	        }, SHAKE_INTERVAL);
	    },

	    loseLife: function() {
	        var TRANSITION_DURATION = 3000;
	        this.lives--;
	        if (localStorage.getItem('score') < score) {
	            localStorage.setItem('score', score); //Saves score upon collision
	        }

	        snailBait.BACKGROUND_VELOCITY = 0;
	        snailBait.BOX_MOVEMENT_SPEED = 0;
	        snailBait.hasDied = true;

	        //console.log(localStorage.getItem('score'));
	        this.startLifeTransition(snailBait.RUNNER_EXPOSION_DURATION);
	        setTimeout(function() {
	            snailBait.endLifeTransition();
	        }, TRANSITION_DURATION);
	    },

	    startLifeTransition: function(slowMotionDelay) {
	        var CANVAS_TRANSITION_OPACITY = 0.05,
	            SLOW_MOTION_RATE = 0.1;
	        this.canvas.style.opacity = CANVAS_TRANSITION_OPACITY;
	        this.playing = false;
	        setTimeout(function() {
	            snailBait.setTimeRate(SLOW_MOTION_RATE);
	            snailBait.runner.visible = false;
	        }, slowMotionDelay);
	    },

	    endLifeTransition: function() {
	        var TIME_RESET_DELAY = 600,
	            RUN_DELAY = 500;
	        snailBait.reset();
	        score = 0;
	        snailBait.BACKGROUND_VELOCITY = 100;
	        snailBait.turnRight();
	        snailBait.sprites[1].left = 0;
	        snailBait.sprites[2].left = 1900;
	        snailBait.sprites[3].left = 2600;
	        snailBait.sprites[4].left = 3700;
	        snailBait.BOX_MOVEMENT_SPEED = 5;
	        snailBait.BACKGROUND_VELOCITY = 200;
	        snailBait.hasDied = false;
	        setTimeout(function() {
	            snailBait.setTimeRate(1.0);
	            setTimeout(function() {
	                snailBait.runner.runAnimationRate = 0;
	                snailBait.playing = true;
	            }, RUN_DELAY);
	        }, TIME_RESET_DELAY);
	    },

	    reset: function() {
	        snailBait.resetOffsets();
	        snailBait.resetRunner();
	        snailBait.makeAllSpritesVisible();
	        snailBait.canvas.style.opacity = 1.0;
	    },

	    resetRunner: function() {
	        this.runner.left = snailBait.RUNNER_LEFT;
	        this.runner.track = 1;
	        this.runner.hOffset = 0;
	        this.runner.visible = true;
	        this.runner.exploding = false;
	        this.runner.jumping = false;
	        this.runner.top = this.calculatePlatformTop(1) - this.runner.height;
	        this.runner.artist.cells = this.runnerCellsRight;
	        this.runner.artist.cellIndex = 0;
	    },

	    resetOffsets: function() {
	        this.bgVelocity = 0;
	        this.backgroundOffset = 0;
	        this.platformOffset = 0;
	        this.spriteOffset = 0;
	    },

	    makeAllSpritesVisible: function() {
	        for (var i = 0; i < snailBait.sprites.length; ++i) {
	            snailBait.sprites[i].visible = true;
	        }
	    }

	
	    //code from line 1373-1470 gotten of powerpiont on moodle
		calculateArenaSize: function(viewportSize)
	   	{
	    	var DESKTOP_ARENA_WIDTH = 800,
		    DESKTOP_ARENA_HEIGHT = 520,
		    arenaHeight,
		    arenaWidth;
		    //maintain aspect ratio
		    arenaHeight = viewportSize.width*(DESKTOP_ARENA_HEIGHT/DESKTOP_ARENA_WIDTH);
		    if(arenaHeight < viewportSize.height) //Height fits
		    {
		        arenaWidth = viewportSize.width;
		    }
		    else //Height does not fit
		    {
		        arenaHeight = viewportSize.height;
		        arenaWidth = arenaHeight*(DESKTOP_ARENA_WIDTH/DESKTOP_ARENA_HEIGHT);
		    }
		    if(arenaWidth > DESKTOP_ARENA_WIDTH)
		    {
		    	arenaWidth = DESKTOP_ARENA_WIDTH;
		    }
		    if(arenaHeight > DESKTOP_ARENA_HEIGHT)
		    {
		        arenaHeight = DESKTOP_ARENA_HEIGHT;
		    }
		    return { 
		        width:  arenaWidth, 
		        height: arenaHeight 
		    };
		},

	   resizeElementsToFitScreen: function(arenaWidth, arenaHeight)
	   {
	      	snailBait.resizeElement(document.getElementById('arena'), arenaWidth,
	       	arenaHeight);
	      	snailBait.resizeElement(snailBait.mobileWelcomeToast, arenaWidth,
	        arenaHeight);
	      	snailBait.resizeElement(snailBait.mobileStartToast, arenaWidth,
	        arenaHeight);
	    },

	    addTouchEventHandlers: function()
   		{
      		snailBait.canvas.addEventListener('touchstart', snailBait.touchStart);
      		snailBait.canvas.addEventListener('touchend', snailBait.touchEnd);
   		},

   		//lines 1422- 1473 have to be changed to fit the comtrols for moblie
   		touchStart: function(e)
   		{
      		if(snailBait.playing)
      		{
         		//Prevent players from inadvertently dragging the game canvas
         		e.preventDefault();
      		}
   		},

   		touchEnd: function(e)
   		{
      		var x = e.changedTouches[0].pageX;
      		if(snailBait.playing)
      		{
         		if(x < snailBait.canvas.width/2)
         		{
            		snailBait.processLeftTap();
         		}
	         	else if(x > snailBait.canvas.width/2)
	         	{
	            	snailBait.processRightTap();
	         	}
	         	//Prevent players from double tapping to zoom 
	         	//when the game is playing
	         	e.preventDefault();
	      	}
   		},

   		processLeftTap: function()
   		{
      		if(snailBait.runner.direction === snailBait.RIGHT)
      		{
         		snailBait.turnLeft();
      		}
      		else
      		{
         		snailBait.runner.jump();
      		}
   		},

   		processRightTap: function()
   		{
      		if(snailBait.runner.direction === snailBait.LEFT)
      		{
         		snailBait.turnRight();
      		}
      		else
      		{
         		snailBait.runner.jump();
      		}
   		},
	};

	window.addEventListener('keydown', function(e) {
	    var key = e.keyCode;
	    if (!snailBait.playing || snailBait.runner.exploding) {
	        return;
	    } else if (key === snailBait.KEY_P) {
	        snailBait.togglePaused();
	    } else if (key === snailBait.KEY_JUMP) {
	        snailBait.runner.jump();
	    } else if (key === snailBait.KEY_X) {
	        snailBait.setTimeRate(0.5);
	    }
	});

	window.addEventListener('keyup', function(e) {
	    var key = e.keyCode;
	    if (!snailBait.playing || snailBait.runner.exploding) {
	        return;
	    } else if (key === snailBait.KEY_X) {
	        snailBait.setTimeRate(1.0);
	    }
	});

	window.addEventListener('blur', function(e) {
	    snailBait.windowHasFocus = false;
	    if (!snailBait.paused) {
	        snailBait.togglePaused(); //Pause the game
	    }
	});

	window.addEventListener('focus', function(e) {
	    var originalFont = snailBait.toastElement.style.fontSize,
	        DIGIT_DISPLAY_DURATION = 1000;

	    snailBait.windowHasFocus = true;
	    snailBait.countDownInProgress = true;
	    if (snailBait.paused) {
	        snailBait.toastElement.style.font = '128px fantasy';
	        if (snailBait.windowHasFocus && snailBait.countDownInProgress) {
	            snailBait.revealToast('3', DIGIT_DISPLAY_DURATION);
	        }
	        setTimeout(function(e) {
	            if (snailBait.windowHasFocus && snailBait.countDownInProgress) {
	                snailBait.revealToast('2', DIGIT_DISPLAY_DURATION);
	            }
	            setTimeout(function(e) {
	                if (snailBait.windowHasFocus && snailBait.countDownInProgress) {
	                    snailBait.revealToast('1', DIGIT_DISPLAY_DURATION);
	                }
	                setTimeout(function(e) {
	                    if (snailBait.windowHasFocus && snailBait.countDownInProgress) {
	                        snailBait.togglePaused();
	                    }
	                    if (snailBait.windowHasFocus && snailBait.countDownInProgress) {
	                        snailBait.toastElement.style.fontSize = originalFont;
	                    }
	                    snailBait.countdownInProgress = false;
	                }, DIGIT_DISPLAY_DURATION);
	            }, DIGIT_DISPLAY_DURATION);
	        }, DIGIT_DISPLAY_DURATION);
	    }
	});


	var snailBait = new SnailBait();
	//lines 1539-1589 gotten from powerpoint on moodle
	snailBait.welcomeStartLink.addEventListener('click',
    function(e)
    {
       var FADE_DURATION = 1000;
       snailBait.playSound(snailBait.coinSound);
       snailBait.fadeOutElements(snailBait.mobileWelcomeToast, FADE_DURATION);
       snailBait.playing = true;
    });

	snailBait.mobileStartLink.addEventListener('click',
   	function(e)
   	{
    	var FADE_DURATION = 1000;
    	snailBait.fadeOutElements(snailBait.mobileStartToast, FADE_DURATION);
    	snailBait.mobileInstructionsVisible = false;
    	snailBait.playSound(snailBait.coinSound);
    	snailBait.playing = true;
   	});

   	snailBait.showHowLink.addEventListener('click',
   	function(e)
   	{
    	var FADE_DURATION = 1000;
      	snailBait.fadeOutElements(snailBait.mobileWelcomeToast, FADE_DURATION);
      	snailBait.drawMobileInstructions();
      	snailBait.revealMobileStartToast();
      	snailBait.mobileInstructionsVisible = true;
   	});

	snailBait.initializeImages();
	snailBait.createSprites();
	
	snailBait.detectMobile();
	if(snailBait.mobile)
	{
	   //mobile specific stuff - touch handler etc
	   snailBait.instructionsElement = document.getElementById('snailbait-mobile-instructions');
	   snailBait.addTouchEventHandlers();

	   /*if(/android/i.text(navigator.userAgent))
	   {
	      snailBait.cannonSound.position = 5.4;
	      snailBait.coinSound.position = 4.8;
	      snailBait.electricityFlowingSound.position = 0.3;
	      snailBait.explosionSound.position = 2.8;
	      snailBait.pianoSound.position = 3.5;
	      snailBait.thudSound.position = 1.8;
	   }*/
	}

	snailBait.fitScreen();
	window.addEventListener("resize", snailBait.fitScreen());
	window.addEventListener("orientationchange", snailBait.fitScreen());
