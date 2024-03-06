/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <YOUR_NAME>
 *      Student ID: <YOUR_STUDENT_ID>
 *      Date:       <SUBMISSION_DATE>
 */
// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");

// Event handler for when the page is loaded
window.onload = function() {
  // Create buttons for each artist
  const menu = document.getElementById('menu');
  artists.forEach(artist => {
    const button = document.createElement('button');
    button.textContent = artist.name;
    button.addEventListener('click', function() {
      showSongs(artist.artistId);
    });
    menu.appendChild(button);
  });

  // Show songs for the default artist (first artist)
  showSongs(artists[0].artistId);
};

// Function to show songs for a specific artist
function showSongs(artistId) {
  const selectedArtistHeader = document.getElementById('selected-artist');
  const songsTableBody = document.getElementById('songs');
  const selectedArtist = artists.find(artist => artist.artistId === artistId);

  // Update selected artist header and links
  selectedArtistHeader.textContent = selectedArtist.name;
  const artistLinks = selectedArtist.urls.map(link => `<a href="${link.url}" target="_blank">${link.name}</a>`);
  selectedArtistHeader.innerHTML += ` (${artistLinks.join(', ')})`;

  // Clear current songs from the table
  songsTableBody.innerHTML = '';

  // Filter songs for the selected artist
  const filteredSongs = songs.filter(song => song.artistId === artistId && !song.explicit);

  // Add filtered songs to the table
  filteredSongs.forEach(song => {
    const row = document.createElement('tr');
    row.addEventListener('click', function() {
      console.log(song);
    });

    const titleCell = document.createElement('td');
    const titleLink = document.createElement('a');
    titleLink.textContent = song.title;
    titleLink.href = song.url;
    titleLink.target = '_blank';
    titleCell.appendChild(titleLink);
    row.appendChild(titleCell);

    const yearCell = document.createElement('td');
    yearCell.textContent = song.year;
    row.appendChild(yearCell);

    const durationCell = document.createElement('td');
    durationCell.textContent = formatDuration(song.duration);
    row.appendChild(durationCell);

    songsTableBody.appendChild(row);
    
  });
}

// Function to format duration from seconds to mm:ss
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
