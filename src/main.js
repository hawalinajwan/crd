// main.js
import { createApp, ref, onMounted, watch } from 'vue'
import './style.css'
import App from './App.vue'

const clientId = '4f61f26d20054006b889a18346fdfe44';
const redirectUri = 'http://localhost:5173/callback';
const scopes = 'user-read-currently-playing';
let currentTrackId = ref(''); 

createApp(App).mount('#app')

function getAccessToken() {
    const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
        if (item) {
            const parts = item.split('=');
            acc[parts[0]] = decodeURIComponent(parts[1]);
        }
        return acc;
    }, {});

    if (hash.access_token) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    
    return hash.access_token;
}

function redirectToSpotifyAuth() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes}`;
    window.location = authUrl;
}

async function fetchSpotifyActivity(token) {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Spotify activity');
    }
    return response.json();
}

function updateProgressBar(startTime, duration) {
    const progressBar = document.getElementById('progress-bar');
    const update = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const percentage = Math.min(100, (elapsed / duration) * 100);
        progressBar.style.width = `${percentage}%`;
        if (percentage < 100) {
            requestAnimationFrame(update);
        }
    };
    update();
}

async function displaySpotifyActivity() {
    const token = getAccessToken();
    if (!token) {
        redirectToSpotifyAuth();
    } else {
        try {
            const activity = await fetchSpotifyActivity(token);
            if (activity && activity.item) {
                const song = activity.item.name;
                const artist = activity.item.artists.map(artist => artist.name).join(', ');
                const album = activity.item.album.name;
                const albumImage = activity.item.album.images[0].url;
                const trackId = activity.item.id;
                const startTime = Date.now() - activity.progress_ms;
                const duration = activity.item.duration_ms;

                if (trackId !== currentTrackId.value) {
                    currentTrackId.value = trackId; // Update reactive ref
                    document.getElementById('album-cover').src = albumImage;
                    document.getElementById('song-title').textContent = song;
                    document.getElementById('artist-name').textContent = artist;
                    document.getElementById('album-name').textContent = album;
                    updateProgressBar(startTime, duration);
                }
            } else {
                document.getElementById('song-title').textContent = 'Tidak ada musik yang sedang diputar.';
                document.getElementById('artist-name').textContent = '';
                document.getElementById('album-name').textContent = '';
                currentTrackId.value = ''; // Reset reactive ref
                document.getElementById('progress-bar').style.width = '0%';
            }
        } catch (error) {
            console.error('Error fetching Spotify activity:', error);
            document.getElementById('song-title').textContent = 'Tidak ada musik yang sedang diputar.';
            document.getElementById('artist-name').textContent = '';
            document.getElementById('album-name').textContent = '';
        }
    }
}

setInterval(displaySpotifyActivity, 60000); 
displaySpotifyActivity();
