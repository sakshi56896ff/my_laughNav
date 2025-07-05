
// const map = L.map("map").setView([28.61, 77.23], 12);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
// }).addTo(map);

// const emojiLabels = ["🎉", "🛒", "🍔", "🏫", "🏥", "🎭", "🏋️", "🎮", "📚", "🐶", "🛕", "🌳", "🍕", "🧃", "🎨"];
// let markers = [];
// let routeLine = null;

// // Geocoding a place name to lat,lng
// async function geocodePlace(place) {
//   const res = await fetch(
//     `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
//   );
//   const data = await res.json();
//   if (data.length === 0) throw new Error("Location not found: " + place);
//   return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
// }

// // Clear previous markers and route
// function clearMarkers() {
//   markers.forEach(m => map.removeLayer(m));
//   markers = [];
//   if (routeLine) {
//     map.removeLayer(routeLine);
//     routeLine = null;
//   }
// }

// // Draw a blue route line
// function drawRoute(start, end) {
//   routeLine = L.polyline([start, end], { color: "blue" }).addTo(map);
//   map.fitBounds(routeLine.getBounds());
// }

// // Build Overpass query to get POIs near route
// function buildOverpassQuery(start, end) {
//   const midLat = (start[0] + end[0]) / 2;
//   const midLng = (start[1] + end[1]) / 2;
//   const radius = 1500;

//   return `[out:json];
//     (
//       node["amenity"](around:${radius},${midLat},${midLng});
//       node["shop"](around:${radius},${midLat},${midLng});
//       node["leisure"](around:${radius},${midLat},${midLng});
//       node["tourism"](around:${radius},${midLat},${midLng});
//     );
//     out center;`;
// }

// // Fetch places from Overpass API
// async function fetchLandmarks(query) {
//   const res = await fetch("https://overpass-api.de/api/interpreter", {
//     method: "POST",
//     body: query,
//   });
//   const data = await res.json();
//   return data.elements;
// }

// // Create marker with funny emoji label
// function createEmojiMarker(lat, lon, emoji, label) {
//   const icon = L.divIcon({
//     className: "emoji-icon",
//     html: `<div title="${label}">${emoji}</div>`,
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//   });

//   const marker = L.marker([lat, lon], { icon }).addTo(map).bindPopup(`${emoji} ${label}`);
//   markers.push(marker);
// }

// // Add markers to map from Overpass results
// function addMarkersFromData(elements) {
//   const limited = elements.slice(0, emojiLabels.length);

//   limited.forEach((el, i) => {
//     const emoji = emojiLabels[i % emojiLabels.length];
//     const name = el.tags.name || "Unnamed Place";
//     createEmojiMarker(el.lat, el.lon, emoji, name);
//   });
// }

// // Add 📍 emoji markers for Start and End points
// function addStartEndMarkers(start, end) {
//   const startIcon = L.divIcon({
//     className: "start-marker",
//     html: "📍",
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//   });

//   const endIcon = L.divIcon({
//     className: "end-marker",
//     html: "📍",
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//   });

//   const startMarker = L.marker(start, { icon: startIcon }).addTo(map).bindPopup("Start 📍");
//   const endMarker = L.marker(end, { icon: endIcon }).addTo(map).bindPopup("Destination 📍");

//   markers.push(startMarker, endMarker);
// }

// // Handle button click
// document.getElementById("find").addEventListener("click", async () => {
//   const startName = document.getElementById("start").value.trim();
//   const endName = document.getElementById("end").value.trim();

//   if (!startName || !endName) {
//     alert("Please enter both start and end places.");
//     return;
//   }

//   clearMarkers();

//   try {
//     const startCoords = await geocodePlace(startName);
//     const endCoords = await geocodePlace(endName);

//     drawRoute(startCoords, endCoords);
//     addStartEndMarkers(startCoords, endCoords);

//     const query = buildOverpassQuery(startCoords, endCoords);
//     const data = await fetchLandmarks(query);
//     addMarkersFromData(data);
//   } catch (err) {
//     alert("Error: " + err.message);
//   }
// });

// // storyGenerator.js

// function calculateDistance(coord1, coord2) {
//   const R = 6371; // Radius of the Earth in km
//   const dLat = toRad(coord2[0] - coord1[0]);
//   const dLon = toRad(coord2[1] - coord1[1]);
//   const lat1 = toRad(coord1[0]);
//   const lat2 = toRad(coord2[0]);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1) * Math.cos(lat2) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// }

// function toRad(value) {
//   return (value * Math.PI) / 180;
// }

// function generateFunnyStory(start, end, landmarks, startLabel, endLabel) {
//   const distance = calculateDistance(start, end);
//   let paragraphs = 3;
//   if (distance > 2 && distance <= 5) paragraphs = 4;
//   else if (distance > 5 && distance <= 8) paragraphs = 5;
//   else if (distance > 8) paragraphs = 6;

//   let story = `🚗 <b>LaughNav Funny Route:</b> <b>${startLabel}</b> ➡️ <b>${endLabel}</b><br><br>`;
//   const steps = Math.ceil(landmarks.length / paragraphs);
//   let index = 0;

//   for (let i = 0; i < paragraphs; i++) {
//     const section = [];
//     for (let j = 0; j < steps && index < landmarks.length; j++, index++) {
//       section.push(landmarks[index].funnyName);
//     }

//     if (i === 0) {
//       story += `You start your laugh-packed trip from <b>${startLabel}</b>. Not long after, you breeze by landmarks like ${section.join(", ")}. It's already hilarious!<br><br>`;
//     } else if (i === paragraphs - 1) {
//       story += `As you near <b>${endLabel}</b>, you leave behind ${section.join(", ")} and arrive like the comic legend you are. 🎉<br><br>`;
//     } else {
//       story += `Somewhere along the way, between street honks and giggles, you zoom past ${section.join(", ")}. Is this a journey or a stand-up tour?<br><br>`;
//     }
//   }

//   document.getElementById("story").innerHTML = story;
// }

// Initialize map
const map = L.map("map").setView([28.61, 77.23], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

const emojiLabels = ["🎉", "🛒", "🍔", "🏫", "🏥", "🎭", "🏋️", "🎮", "📚", "🐶", "🛕", "🌳", "🍕", "🧃", "🎨"];
let markers = [];
let routeLine = null;

// Geocode place name to lat,lng
async function geocodePlace(place) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
  const data = await res.json();
  if (data.length === 0) throw new Error("Location not found: " + place);
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  if (routeLine) {
    map.removeLayer(routeLine);
    routeLine = null;
  }
}

function drawRoute(start, end) {
  routeLine = L.polyline([start, end], { color: "blue" }).addTo(map);
  map.fitBounds(routeLine.getBounds());
}

function buildOverpassQuery(start, end) {
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  const radius = 1500;
  return `[out:json];
    (
      node["amenity"](around:${radius},${midLat},${midLng});
      node["shop"](around:${radius},${midLat},${midLng});
      node["leisure"](around:${radius},${midLat},${midLng});
      node["tourism"](around:${radius},${midLat},${midLng});
    );
    out center;`;
}

async function fetchLandmarks(query) {
  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });
  const data = await res.json();
  return data.elements;
}

function createEmojiMarker(lat, lon, emoji, label) {
  const icon = L.divIcon({
    className: "emoji-icon",
    html: `<div title="${label}">${emoji}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const marker = L.marker([lat, lon], { icon }).addTo(map).bindPopup(`${emoji} ${label}`);
  markers.push(marker);
}

function addMarkersFromData(elements) {
  const limited = elements.slice(0, emojiLabels.length);

  limited.forEach((el, i) => {
    const emoji = emojiLabels[i % emojiLabels.length];
    const name = el.tags.name || "Unnamed Place";
    createEmojiMarker(el.lat, el.lon, emoji, name);
  });
}

function addStartEndMarkers(start, end) {
  const startIcon = L.divIcon({
    className: "start-marker",
    html: "📍",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const endIcon = L.divIcon({
    className: "end-marker",
    html: "📍",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const startMarker = L.marker(start, { icon: startIcon }).addTo(map).bindPopup("Start 📍");
  const endMarker = L.marker(end, { icon: endIcon }).addTo(map).bindPopup("Destination 📍");

  markers.push(startMarker, endMarker);
}

document.getElementById("find").addEventListener("click", async () => {
  const startName = document.getElementById("start").value.trim();
  const endName = document.getElementById("end").value.trim();

  if (!startName || !endName) {
    alert("Please enter both start and end places.");
    return;
  }

  clearMarkers();
  document.getElementById('story').innerHTML = "🕐 Generating funny story...";

  try {
    const startCoords = await geocodePlace(startName);
    const endCoords = await geocodePlace(endName);

    drawRoute(startCoords, endCoords);
    addStartEndMarkers(startCoords, endCoords);

    const query = buildOverpassQuery(startCoords, endCoords);
    const data = await fetchLandmarks(query);
    addMarkersFromData(data);

    const poisForStory = data.slice(0, 15).map(el => el.tags.name || "Unnamed Place");

    await requestFunnyStory(startName, endName, poisForStory, startCoords, endCoords);

  } catch (err) {
    console.error(err);
    document.getElementById('story').innerText = "❌ Error generating story: " + err.message;
  }
});

async function requestFunnyStory(startLabel, endLabel, pois, startCoord, endCoord) {
  try {
    const res = await fetch('http://localhost:3000/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start: startLabel,
        end: endLabel,
        pois,
        startCoord,
        endCoord
      })
    });

    const data = await res.json();
    document.getElementById('story').innerHTML = data.story || 'No story received.';
  } catch (err) {
    console.error('Story fetch error:', err);
    document.getElementById('story').innerText = '❌ Failed to load story.';
  }
}

