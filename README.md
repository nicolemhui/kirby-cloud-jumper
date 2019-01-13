# Javascript-Project

* Project Title
* Background and Overview 
    * This is an interactive game that was inspired by Tetris that will challenge the player to think quickly about shape orientation in order to pass each level. 
    * The player will face a series of walls, each containing a small window for him or her to navigate through without hitting any of the walls. The player can move their character vertically and change their positioning to fit through the spaces. As the game progresses, the walls begin to increase in speed and also fluctuate in design and difficulty. If at any point, the player collides with a wall then the game ends. The running score will be kept throughout the game.
* Functionality and MVP Features
    * Create sprites and walls
    * Wall functionality 
        * Have walls moving towards player continuously while populating new wall designs each time 
    * Player functionality
        * Move player vertically, and different formations
    * Create wall and player population 
    * Implement different levels 
    * Play audio continuously in background
    * Keep a running score and save highest score to database

    * In addition, this project will include:
      - [ ] A modal describing the game

* Architecture and Technologies
    * HTML5 Canvas to create and render game display and elements
        * To create the board, background, and walls. 
        * Use to simulate the game moving
    * Sprite Creator 
        * To create sprite characters
    * Web Audio API to allow sound playing throughout 
    * Vanilla DOM JavaScript for game logic 
    * Webpack to bundle and serve the various scripts.
* Implementation Timeline
    * Day 1 - Research Canvas and any animations to add to the game. Also spend time planning out the logic for the canvas frames.
        * Using sprite creators to creating the wall 
        * Work on player functionality -- moving up/down, left/right to spin 
    * Day 2 - Work on building the walls and collision detection.
        * Implement wall logic (randomly populate, move towards the player)
        * Test implementation
    * Day 3 - Focus on game logic to ensure things are working as planned. Then begin implementing different levels.
        * Continue working on wall logic
        * Test implementation
    * Day 4 - Allocating extra time to ensure backend is set up properly and that all logic is or has been set.
        * Work on audio playing in background
        * Create backend for high scores
        * Continue testing
    * Day 5 - Styling
        * Start wrapping up the game logic and focusing on presentation and styling bugs
        * Add CSS and other game display elements
    * Day 6 
        * Create game over screen and tidy up any other CSS
        * Push to Heroku and ensure game is working properly
* Classes 
    * Board
        * Handles logic for the the board moving frames
    * Walls (this may be combined with board and may be an additional layer)
        * Create moving walls on the board that will either be stationary or move vertically
    * Game
        * Keeps track of the game logic from start to finish 
        * Keep track of score and save to database 
    * Player
        * The current player, which will be represented as a sprite
        * This class handles the actions for moving (key up/down,left,right, w, a, s, d)
    