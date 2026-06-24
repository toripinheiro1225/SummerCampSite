// Schedule data and grid renderer
(function () {
  const DAYS = [
    { key: "wed", label: "Weds 7/1" },
    { key: "thu", label: "Thurs 7/2" },
    { key: "fri", label: "Friday 7/3" },
    { key: "sat", label: "Saturday 7/4" },
    { key: "sun", label: "Sunday 7/5" },
    { key: "mon", label: "Monday 7/6" },
  ];

  const START_HOUR = 8;
  const END_HOUR = 24; // midnight
  const PX_PER_HOUR = 80;
  const TOTAL_HEIGHT = (END_HOUR - START_HOUR) * PX_PER_HOUR;

  const events = [
    // Wednesday
    { day: "wed", start: 11, end: 18, title: "Build", type: "default" },
    { day: "wed", start: 15, end: 15.5, title: "Baby Music Time", loc: "Baby Dome", type: "default" },
    { day: "wed", start: 18, end: 19.5, title: "Dinner (Taco Truck)", loc: "Picnic Tables", type: "meal" },
    // Thursday
    { day: "thu", start: 10, end: 16, title: "Build", type: "default" },
    { day: "thu", start: 12, end: 13, title: "The Age of AIM", loc: "Fireside", type: "default" },
    { day: "thu", start: 14, end: 16.5, title: "River Day Party & iPits 6: Now in Neon", loc: "River Beach", type: "default" },
    { day: "thu", start: 16, end: 17.5, title: "Glass House", loc: "Fireside", type: "default" },
    { day: "thu", start: 17.5, end: 18, title: "All Camp Meeting", loc: "Fireside", type: "highlight" },
    { day: "thu", start: 18, end: 19.5, title: "Dinner (Cuntwrap Supremez)", loc: "Picnic Tables", type: "meal" },
    { day: "thu", start: 18, end: 19.5, title: "Hot Pot Icebreaker", loc: "Picnic Tables", type: "default" },
    { day: "thu", start: 19.5, end: 21, title: "Get Ready!", loc: "Lewks Loft", type: "default" },
    { day: "thu", start: 21, end: 24, title: "Bug Party", loc: "Forest Stage", type: "party" },
    // Friday
    { day: "fri", start: 8, end: 9.5, title: "Bird-watching ('Nocs Provided!)", loc: "Fireside", type: "default" },
    { day: "fri", start: 10, end: 11, title: "Gratitude & Connection Yoga", loc: "River Deck", type: "default" },
    { day: "fri", start: 12, end: 15, title: "DnD Session", loc: "Picnic Tables", type: "default" },
    { day: "fri", start: 15, end: 15.5, title: "Baby Music Time", loc: "Baby Dome", type: "default" },
    { day: "fri", start: 15, end: 17, title: "Re:turn Ritual", loc: "Dome", type: "default" },
    { day: "fri", start: 17.5, end: 18, title: "All Camp Meeting", loc: "Fireside", type: "highlight" },
    { day: "fri", start: 18, end: 19.5, title: "Dinner (Mezze)", loc: "Picnic Tables", type: "meal" },
    { day: "fri", start: 19.5, end: 21, title: "Get Ready!", loc: "Lewks Loft", type: "default" },
    { day: "fri", start: 21, end: 24, title: "Wet Metal Party", loc: "River Deck", type: "party" },
    // Saturday
    { day: "sat", start: 9, end: 10, title: "Baby Banana Pancakes", loc: "Lodge", type: "default" },
    { day: "sat", start: 10, end: 11, title: "Parents Group Sesh", loc: "Lodge", type: "default" },
    { day: "sat", start: 11, end: 13, title: "Coffee Shop", loc: "Near Lodge", type: "default" },
    { day: "sat", start: 11.5, end: 13.5, title: "Claytime", loc: "Picnic Tables", type: "default" },
    { day: "sat", start: 13.5, end: 14.5, title: "Ethics: What Is Meaning?", loc: "Fireside", type: "default" },
    { day: "sat", start: 14.5, end: 17, title: "River Day Party", loc: "River", type: "default" },
    { day: "sat", start: 15, end: 15.5, title: "Baby Music Time", loc: "Baby Dome", type: "default" },
    { day: "sat", start: 17.5, end: 18, title: "All Camp Meeting", loc: "Fireside", type: "highlight" },
    { day: "sat", start: 18, end: 19.5, title: "Dinner (Nourish Thyself Bowls)", loc: "Picnic Tables", type: "meal" },
    { day: "sat", start: 19, end: 20, title: "Jockstrap Jock Jams", loc: "The Lodge", type: "default" },
    { day: "sat", start: 20, end: 22, title: "Gift Show", loc: "Forest Stage", type: "highlight" },
    { day: "sat", start: 22.5, end: 24, title: "Uncle Ray's Noods and Novelties", loc: "Dome", type: "party" },
    // Sunday
    { day: "sun", start: 10.5, end: 11.5, title: "Tai Chi Chai Tea", loc: "Open Area Near Dome", type: "default" },
    { day: "sun", start: 12.5, end: 13, title: "All Camp Meeting", loc: "Fireside", type: "highlight" },
    { day: "sun", start: 13, end: 17, title: "Break", type: "default" },
    { day: "sun", start: 15, end: 16, title: "Baby Painting", loc: "Shade Tree near River Deck", type: "default" },
    { day: "sun", start: 16, end: 16.5, title: "Baby Chorus", loc: "Shade Tree near River Deck", type: "default" },
    { day: "sun", start: 18, end: 19.5, title: "Dinner (Trash Panda Feast)", loc: "Picnic Tables", type: "meal" },
    { day: "sun", start: 18.5, end: 19.5, title: "Queers and Beers", loc: "The Lodge", type: "default" },
    { day: "sun", start: 20, end: 24, title: "Double Feature Movie Night", loc: "River Deck", type: "default" },
    // Monday
    { day: "mon", start: 8, end: 11.5, title: "Departures", type: "default" },
    { day: "mon", start: 11, end: 12, title: "Bad Church", loc: "Fire Pit", type: "default" },
  ];

  function assignLanes(dayEvents) {
    dayEvents.sort((a, b) => a.start - b.start || a.end - b.end);
    const lanes = [];
    for (const ev of dayEvents) {
      let placed = false;
      for (let i = 0; i < lanes.length; i++) {
        const lastInLane = lanes[i][lanes[i].length - 1];
        if (ev.start >= lastInLane.end) {
          lanes[i].push(ev);
          ev.lane = i;
          placed = true;
          break;
        }
      }
      if (!placed) {
        ev.lane = lanes.length;
        lanes.push([ev]);
      }
    }
    return lanes.length;
  }

  function renderGrid() {
    const grid = document.getElementById("schedule-grid");
    if (!grid) return;

    // Build time labels column
    let html = '<div class="sg-time-col">';
    for (let h = START_HOUR; h < END_HOUR; h++) {
      const top = (h - START_HOUR) * PX_PER_HOUR;
      const label = h <= 12 ? (h === 12 ? "12:00 PM" : h + ":00 AM") : (h - 12) + ":00 PM";
      html += `<div class="sg-time-label" style="top:${top}px">${label}</div>`;
    }
    html += "</div>";

    // Build day columns
    for (const day of DAYS) {
      const dayEvents = events.filter((e) => e.day === day.key);
      const totalLanes = assignLanes(dayEvents);

      html += `<div class="sg-day-col">`;
      html += `<div class="sg-day-header">${day.label}</div>`;
      html += `<div class="sg-day-body" style="height:${TOTAL_HEIGHT}px">`;

      // Grid lines
      for (let h = START_HOUR; h < END_HOUR; h++) {
        const top = (h - START_HOUR) * PX_PER_HOUR;
        html += `<div class="sg-gridline" style="top:${top}px"></div>`;
        html += `<div class="sg-gridline sg-gridline-half" style="top:${top + PX_PER_HOUR / 2}px"></div>`;
      }

      // Events
      for (const ev of dayEvents) {
        const top = (ev.start - START_HOUR) * PX_PER_HOUR;
        const height = Math.max((ev.end - ev.start) * PX_PER_HOUR, 20);
        const laneWidth = 100 / totalLanes;
        const left = ev.lane * laneWidth;
        const width = laneWidth;

        const typeClass = ev.type === "meal" ? "sg-ev-meal" : ev.type === "party" ? "sg-ev-party" : ev.type === "highlight" ? "sg-ev-highlight" : "";

        html += `<div class="sg-event ${typeClass}" style="top:${top}px;height:${height}px;left:${left}%;width:${width}%">`;
        html += `<span class="sg-ev-title">${ev.title}</span>`;
        if (ev.loc) html += `<span class="sg-ev-loc">@ ${ev.loc}</span>`;
        html += `</div>`;
      }

      html += "</div></div>";
    }

    grid.innerHTML = html;
  }

  // View toggle
  function setupViewToggle() {
    const btns = document.querySelectorAll(".view-btn");
    const scheduleView = document.getElementById("schedule-view");
    const listView = document.getElementById("list-view");
    if (!btns.length || !scheduleView || !listView) return;

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const view = btn.dataset.view;
        if (view === "schedule") {
          scheduleView.style.display = "";
          listView.style.display = "none";
        } else {
          scheduleView.style.display = "none";
          listView.style.display = "";
        }
      });
    });
  }

  renderGrid();
  setupViewToggle();
})();
