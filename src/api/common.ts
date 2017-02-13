// tslint:disable:object-literal-shorthand
// tslint:disable:only-arrow-functions

module SpriteSpin {

  SpriteSpin.registerApi({
    // Gets a value indicating whether the animation is currently running.
    isPlaying: function() {
      return this.data.animation !== null
    },

    // Gets a value indicating whether the animation looping is enabled.
    isLooping: function() {
      return this.data.loop
    },

    // Starts/Stops the animation playback
    toggleAnimation: function() {
      this.data.animate = !this.data.animate
      SpriteSpin.setAnimation(this.data)
    },

    // Stops animation playback
    stopAnimation: function() {
      this.data.animate = false
      SpriteSpin.setAnimation(this.data)
    },

    // Starts animation playback
    startAnimation: function() {
      this.data.animate = true
      SpriteSpin.setAnimation(this.data)
    },

    // Sets a value indicating whether the animation should be looped or not.
    // This might start the animation (if the 'animate' data attribute is set to true)
    loop: function(value) {
      this.data.loop = value
      SpriteSpin.setAnimation(this.data)
      return this
    },

    // Gets the current frame number
    currentFrame: function() {
      return this.data.frame
    },

    // Updates SpriteSpin to the specified frame.
    updateFrame: function(frame){
      SpriteSpin.updateFrame(this.data, frame)
      return this
    },

    // Skips the given number of frames
    skipFrames: function(step) {
      const data = this.data
      SpriteSpin.updateFrame(data, data.frame + (data.reverse ? - step : + step))
      return this
    },

    // Updates SpriteSpin so that the next frame is shown
    nextFrame: function() {
      return this.skipFrames(1)
    },

    // Updates SpriteSpin so that the previous frame is shown
    prevFrame: function() {
      return this.skipFrames(-1)
    },

    // Starts the animations that will play until the given frame number is reached
    // options:
    //   force [boolean] starts the animation, even if current frame is the target frame
    //   nearest [boolean] animates to the direction with minimum distance to the target frame
    playTo: function(frame, options) {
      const data = this.data
      options = options || {}
      if (!options.force && data.frame === frame) {
        return
      }
      if (options.nearest) {
        // distance to the target frame
        const a = frame - data.frame
        // distance to last frame and the to target frame
        const b = frame > data.frame ? a - data.frames : a + data.frames
        // minimum distance
        const c = Math.abs(a) < Math.abs(b) ? a : b
        data.reverse = c < 0
      }
      data.animate = true
      data.loop = false
      data.stopFrame = frame
      SpriteSpin.setAnimation(data)
      return this
    }
  })
}
