// OVERLAY ANOTHER TRACE SET THAT IS JUST DOTS AND THE TEXT

const scores = [
  [
    2,
    0,
    `<b>Tom</b> Ep #-2<br>
   <i>"Black Ops will come up<br>
   with its own name for its<br>
   Battle Royale game mode"<br></i>
<b>CORRECT</b>`
  ],
  [
    -2,
    2,
    `<b>Tom</b> Ep #-1<br>
   <i>"Black Ops will be<br>
   the only battle royale at E3"<br></i>
<b>WRONG</b>`
  ],
  [
    -2,
    2,
    `<b>Ernie</b> Ep #-1<br>
   <i>"At this E3, Death Stranding<br>
   will just be a cinematic, but it<br>
   still wins E3"<br></i>
<b>WRONG</b>`
  ],
  [
    2,
    -2,
    `<b>Tom</b> Ep #-1<br>
   <i>"Valve will have nothing at E3,<br>
   they don't remember how to make<br>
   video games"<br></i>
<b>CORRECT</b>`
  ],
  [
    -2,
    2,
    `<b>Bea</b> Ep #-1<br>
   <i>"There will be a new portable<br>
   playstation console"<br></i>
<b>WRONG</b>`
  ],
  [
    2,
    2,
    `<b>Bea</b> Ep #-1<br>
   <i>"Microsoft won't bring back the<br>
   hololens"<br></i>
<b>CORRECT</b>`
  ],
  [
    -1,
    1,
    `<b>Tom</b> Ep #-1<br>
   <i>"AC Odyssey is going to be a white<br>
   dude fighting monsters on a ship with<br>
   a sword and shield"<br></i>
<b>MOSTLY WRONG</b>`
  ],
  [
    -2,
    2,
    `<b>Tom</b> Ep #-1<br>
   <i>"Skate 4 will be announced, will<br>
   be on PC, and won't have splitscreen"<br></i>
<b>WRONG</b>`
  ],
  [
    2,
    2,
    `<b>Bea</b> Ep #-1<br>
   <i>"Fallout 76 is going to be an MMO<br>
   with tower defense elements"<br></i>
<b>CORRECT</b>`
  ],
  [
    2,
    -2,
    `<b>Ernie</b> Ep #-1<br>
   <i>"At this E3, Nintendo will pretend<br>
   like they never mentioned Metroid Prime last year"<br></i>
<b>CORRECT</b>`
  ]
];

const nameMapping = { b: 0, e: 1, t: 2, 7: 3 };

const colors = ["#d571c7", "#777"];

const width = scores.length * 100;

traces = [
  {
    x: [],
    y: [],
    text: [],
    mode: "lines+markers",
    hoverinfo: "text",
    line: {
      shape: "spline",
      dash: "solid",
      width: 2,
      color: colors[0]
    },
    marker: {
      symbol: [],
      line: { width: 2, color: colors[0] },
      size: 10,
      color: "rgba(0,0,0,0)"
    },
    showlegend: false
  },
  {
    x: [],
    y: [],
    mode: "lines+markers",
    hoverinfo: "none",
    line: {
      shape: "spline",
      dash: "solid",
      width: 2,
      color: colors[1]
    },
    marker: {
      symbol: [],
      line: { width: 2, color: colors[1] },
      size: 10,
      color: "rgba(0,0,0,0)"
    },
    showlegend: false
  },

  {
    x: [0],
    y: [0],
    hoverinfo: "none",
    mode: "lines",
    color: colors[0],
    line: {
      shape: "spline",
      dash: "solid",
      width: 5,
      color: colors[0]
    },
    name: "Your Oracles",
    symbol: "none",
    legendgroup: "person",
    showlegend: true
  },
  {
    x: [0],
    y: [0],
    hoverinfo: "none",
    mode: "lines",
    color: colors[1],
    line: {
      shape: "spline",
      dash: "solid",
      width: 5,
      color: colors[1]
    },
    name: "The 7 Sphere",
    symbol: "none",
    legendgroup: "person",
    showlegend: true
  }
];

// Tally
scores.forEach(function(scoreRow, i) {
  scoreRow.forEach(function(d, p) {
    if (p <= 1) {
      if (scoreRow[p] > 0) {
        traces[p].marker.symbol[i] = "circle";
      } else {
        traces[p].marker.symbol[i] = "x-thin";
      }

      if (p === 0) {
        traces[p].text[i] = scoreRow[2];
      }
      if (i !== 0) {
        scores[i][p] = scores[i - 1][p] + d;
      }
    }
  });
});

scores.forEach(function(scoreRow, i) {
  for (let p = 0; p < 2; p++) {
    traces[p].x[i] = i;
    traces[p].y[i] = scoreRow[p];
  }
});

const prophetData = [{}];
const layout = {
  width: width,
  height: 200,
  margin: {
    l: 100,
    r: 200,
    b: 0,
    t: 0,
    pad: 0
  },
  paper_bgcolor: "#fff3cb",
  plot_bgcolor: "#fff3cb",
  displayModeBar: false,
  scrollZoom: false,
  staticPlot: true,
  hoverlabel: {
    font: { family: "Alegreya, cursive", size: 15 }
  },
  xaxis: {
    fixedrange: true,
    showgrid: false,
    // zeroline: false,
    showline: false,
    autotick: true,
    ticks: "",
    showticklabels: false
  },
  yaxis: {
    fixedrange: true,
    showgrid: false,
    zeroline: false,
    showline: false,
    autotick: true,
    ticks: "",
    showticklabels: false
  },
  legend: {
    font: {
      family: "Alegreya, cursive",
      size: 14
    },
    tracegroupgap: 20,
    x: .98,
    y: 0.5
  }
};

Plotly.newPlot("scoreBoard", traces, layout, { displayModeBar: false }).then(gd => {
  gd.on('plotly_legendclick', () => false)
}).then(
  function() {
    document.getElementById("scoreBoardContainer").scrollTo(5000, 0);
  }
);
