<script setup>

</script>

<template>
    
  <div id="app">
      <div class="card">
          <div class="content">
              <h1>Hana</h1>
              <p>I'm a <strong>Student</strong> and <strong>Photographer!</strong></p>
              <p>based on East Java, Indonesia~</p>
              <p>Spariiing!</p>
              <div class="social-icons">
                  <a href="https://instagram.com/hawalinajwan_"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com/hawalinajwan"><i class="fab fa-twitter"></i></a>
                    <a href="https://github.com/hawalinajwan"><i class="fab fa-github"></i></a>
                    <a href="https://discord.com/users/644892716953632768"><i class="fab fa-discord"></i></a>
                </div>
                <a href="https://hawalinajwan.site" class="website-button">My website</a>
            </div>
            <img src="./assets/raul.svg" alt="Character" class="character-image">
            <div class="hills-wrapper">
                <div class="hills"></div>
            </div>
            <!-- Sparkles -->
            <div class="sparkles">
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
                <div class="sparkle"></div>
            </div>
            
        </div>  
    </div>
    <div id="spotify-activity">
        <img src="./assets/spotify-logo-png-7069.png" alt="spotify" id="spotify">
        <img id="album-cover" src="" alt="Album cover">
        <div id="track-info">
            <div id="track-details">
                <span id="song-title" class="inline"></span>
                <span class="separator">-</span>
                <span id="artist-name" class="inline"></span>
                <span class="separator">-</span>
                <span id="album-name" class="inline"></span>
            </div>
            <div id="progress-container">
                <div id="progress-bar"></div>
            </div>
        </div>
    </div>
</template>


