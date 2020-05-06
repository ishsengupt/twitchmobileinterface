var socket = io();

/* socket.on("connect", function(data) {
  console.log("connected");
  fetch("http://localhost:7000/mods-api/channels/summit1g")
    .then(function(response) {
      // The API call was successful!
      return response.json();
    })
    .then(function(data) {
      // This is the JSON from our response
      console.log(data.moderators);
      for (mod in data.moderators) {
        $("#contact")
          .append(`<li class="left clearfix"><span class="chat-img pull-left">
                 <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle"></span>
                 <div class="chat-body clearfix">
                    <div class="header_sec">
                       <strong class="primary-font">${data.moderators[mod]}</strong> <strong class="pull-right">
                       09:45AM</strong>
                    </div>
                    <div class="contact_sec">
                       <strong class="primary-font">(123) 123-456</strong> <span class="badge pull-right">3</span>
                    </div>
                 </div>
              </li>`);
      }
    })
    .catch(function(err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}); */

/* document
  .querySelector(".thumb-icon")
  .addEventListener("click", () => grid.classList.toggle("grid--big-columns")); */

$("label").click(function() {
  $("label").addClass("without-after-element");
});

$(".thumb-icon").click(function() {
  $(".chapters-switch").toggleClass("chapters-grid");
  if ($(".show-chapters:visible").length == 0) {
    $(".show-chapters").animate(
      {
        opacity: 1
      },
      50
    );
    $(".show-chapters").show(50);
  } else {
    $(".show-chapters").animate(
      {
        opacity: 0
      },
      50
    );
    $(".show-chapters").hide(50);
  }
});

$(".bars-icons").click(function() {
  $(".chapters-switch").toggleClass("replay-grid");
});

$(".expand-icon").click(function() {
  $(".additional-size").toggleClass("smaller-size");
  $(".graph-original").toggleClass("right-collapse");
  $(".full-screen-grid").toggleClass("graph-extension");

  $(".charts-complete").removeClass("width-addition");
  $("div.elevate-padding.chart-row").removeClass("elavate-padding");

  $(".expand-dissapear").hide(300);
  $(".expand-dissapear").animate(
    {
      opacity: 0
    },
    300
  );

  $(".graphs-hide").show(300);
  $(".graphs-hide").animate(
    {
      opacity: 1
    },
    300
  );
  $(".play-bar").animate(
    {
      opacity: 0
    },
    50
  );
  $(".play-bar").hide(50);
  $(".right-top-settings").animate(
    {
      opacity: 0
    },
    50
  );
  $(".right-top-settings").hide(50);
  $(".right-bottom-icon").animate(
    {
      opacity: 0
    },
    50
  );

  $(".right-bottom-icon").hide(50);
});

$(".play-bar").click(function() {
  $(".full-screen-grid").toggleClass("full-screen-expand");
  $(".total-screen").toggleClass("total-screen-expand");

  if ($(".message_section:visible").length == 0) {
    $(".message_section").show(50);
    $(".message_section").animate(
      {
        opacity: 1
      },
      50
    );
    $(".right-options").show(50);
    $(".right-options").animate(
      {
        opacity: 1
      },
      50
    );

    $(".video-bar-container").show(50);
    $(".video-bar-container").animate(
      {
        opacity: 1
      },
      50
    );
  } else {
    $(".message_section").hide(50);
    $(".message_section").animate(
      {
        opacity: 0
      },
      50
    );
    $(".right-options").hide(50);
    $(".right-options").animate(
      {
        opacity: 0
      },
      50
    );

    $(".video-bar-container").hide(50);
    $(".video-bar-container").animate(
      {
        opacity: 0
      },
      50
    );
  }
});

$(".down-icon").click(function() {
  $(".middle-psuedo").toggleClass("middle-grid-expand");

  if ($(".form-hider:visible").length == 0) {
    console.log("not visibile");
    $(".form-hider").show(50);
    $(".form-hider").animate(
      {
        opacity: 1
      },
      50
    );
  } else {
    console.log("visible");
    $(".form-hider").hide(50);
    $(".form-hider").animate(
      {
        opacity: 0
      },
      50
    );
  }
});

$(".dots-icon").click(function() {
  $(".middle-psuedo").toggleClass("graph-expand");

  if ($(".form-hider:visible").length == 0) {
    if ($(".graph-hider:visible").length == 0) {
      console.log("not visibile");
      $(".graph-hider").show(50);
      $(".graph-hider").animate(
        {
          opacity: 1
        },
        50
      );
    } else {
      console.log("visible");
      $(".graph-hider").hide(50);
      $(".graph-hider").animate(
        {
          opacity: 0
        },
        50
      );
    }
  } else {
    $(".form-hider").hide(50);
    $(".form-hider").animate(
      {
        opacity: 0
      },
      50
    );
    if ($(".graph-hider:visible").length == 0) {
      console.log("not visibile");
      $(".graph-hider").show(50);
      $(".graph-hider").animate(
        {
          opacity: 1
        },
        50
      );
    } else {
      console.log("visible");
      $(".graph-hider").hide(50);
      $(".graph-hider").animate(
        {
          opacity: 0
        },
        50
      );
    }
  }
});

$("form").submit(function(e) {
  e.preventDefault();

  var grade_level = $("#grade-level").val();
  console.log(grade_level);
  socket.emit("messager", grade_level);
});

socket.on("tweet", function(message) {
  if (message.message.msgColor == null) {
    $("#list-unstyled").append(`<li class="messages-box">
               
                 <div class="messages-content">

                 <div style="color:rgba(255,255,255,0.5)">${
                   message.message.dispName
                 } | Readability: ${message.message.avgScore.toFixed(2)}</div> 
                    <div style="color:white">${message.message.message}</div> 
                 </div>
              </li>`);
  } else {
    $("#list-unstyled").append(`<li class="messages-box">
                 
                 <div class="messages-content">
                 <div style="color:rgba(255,255,255,0.5)">${
                   message.message.dispName
                 } | Readability:  ${message.message.avgScore.toFixed(
      2
    )} </div> 
                    <div style="color:${message.message.msgColor};">${
      message.message.message
    }</div> 
                 </div>
              </li>`);
  }
  var d = $(".chat_area");
  $(".chat_area").animate(
    { scrollTop: $(".chat_area").prop("scrollHeight") },
    100
  );
});

/* var numbers = [];
var context = $("#chart");
var config = {
  type: "doughnut",
  data: {
    datasets: [
      {
        backgroundColor: ["orange", "blue", "yellow"],
        data: numbers,
        borderWidth: 0
      }
    ]
  },
  options: {
    responsive: false
  }
};
var chart = new Chart(context, config); */
/* 
socket.on("pushdata", arr => {
  numbers = arr;
  console.log(numbers);
  chart.data.datasets.data = arr;
  chart.update();
}); */

new Chart(document.getElementById("canvas-psuedo2"), {
  type: "doughnut",
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "rgba(132,142,255,0.6)",
          "rgba(56,123,123,0.6)",
          "rgba(200,1,2,0.6)",
          "rgba(12,200,23,0.6)",
          "rgba(155,14,2,0.6)"
        ],
        data: [2478, 5267, 734, 784, 433],
        borderWidth: 0
      }
    ]
  },
  options: {
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false,
    elements: { point: { radius: 0 } },
    legend: {
      display: false
    },
    elements: {
      line: {
        tension: 0
      }
    },

    maintainAspectRatio: false,

    pointRadius: 0 // Add to prevent default behaviour of full-width/height
  }
});

var ctz = document.getElementById("canvas-psuedo").getContext("2d");
var gradient1 = ctz.createLinearGradient(0, 0, 0, 400);
gradient1.addColorStop(0, "rgba(99,255,132,0.7)");
gradient1.addColorStop(1, "rgba(99,255,132,0)");
var psuedoChart = new Chart(ctz, {
  type: "line",
  data: {
    labels: [
      "Tokyo",
      "Mumbai",
      "Mexico City",
      "Shanghai",
      "Sao Paulo",
      "New York",
      "Karachi",
      "Buenos Aires",
      "Delhi",
      "Moscow"
    ],
    datasets: [
      {
        label: "Series 1", // Name the series
        data: [50, 50, 24, 40, 11, 1, 44, 47, 55, 61], // Specify the data values array
        backgroundColor: gradient1,
        borderColor: "rgba(99,255,132,0.7)", // Add custom color border (Line)
        // Add custom color background (Points and Fill)
        borderWidth: 2,
        pointRadius: 0
        // Specify bar border width
      }
    ]
  },
  options: {
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false,
    elements: { point: { radius: 0 } },
    legend: {
      display: false
    },

    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            color: "rgba(255,99,132,0.05)"
          },
          ticks: {
            display: true,
            autoSkip: true,
            fontFamily: "'Roboto', sans-serif",
            fontColor: "rgba(255,255,255,0.5)",
            maxTicksLimit: "7",
            fontSize: "10",
            padding: 10,
            fontStyle: "500"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: "white",
            display: false
          }
        }
      ]
    },
    pointRadius: 0 // Add to prevent default behaviour of full-width/height
  }
});

var cty = document.getElementById("myChart").getContext("2d");

var marksData = {
  labels: [
    "Flesch Ease",
    "Dale Chall",
    "Gunning Fog",
    "Coleman",
    "Smog",
    "Esssspache"
  ],
  datasets: [
    {
      label: "Student A",
      backgroundColor: "rgba(255,99,132,0.5)",
      data: [65, 75, 70, 80, 60, 80],

      borderWidth: 2,
      //hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,0.5)",

      pointRadius: 0
    },
    {
      label: "Student B",
      backgroundColor: "rgba(0,0,200,0.2)",
      data: [54, 65, 60, 70, 70, 75],
      borderWidth: 2,
      //hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,0.5)",

      pointRadius: 0
    }
  ]
};
// Define the data

var options = {
  legend: {
    display: false
  },

  scale: {
    ticks: {
      display: false
    },
    pointLabels: {
      display: true,
      autoSkip: true,
      fontFamily: "'Roboto', sans-serif",
      fontColor: "rgba(255,255,255,0.5)",
      maxTicksLimit: "7",
      fontSize: "10",
      padding: 10,
      fontStyle: "500"
    }
  },
  responsive: true, // Instruct chart js to respond nicely.
  maintainAspectRatio: false // Add to prevent default behaviour of full-width/height
};

$(document).ready(function() {
  Chart.defaults.global.legend.display = false;
});

// End Defining data
var myChart = new Chart(cty, {
  type: "radar",
  data: marksData,
  options: options
});

function MainViewModel(data) {
  var self = this;
  var ctz = $("#canvas")
    .get(0)
    .getContext("2d");
  var gradient = ctz.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(255,99,132,0.7)");
  gradient.addColorStop(1, "rgba(255,99,132,0)");

  self.lineChartData = ko.observable({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        backgroundColor: gradient,
        //backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,0.5)",
        borderWidth: 2,
        //hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,0.5)",
        data: [5, 6, 3, 2, 1, 0, 0, 0, 0, 0, 0],
        pointRadius: 0
      }
    ]
  });

  socket.on("pushdata", function(data) {
    self.lineChartData().datasets[0].data.shift();
    self.lineChartData().datasets[0].data.push(data);

    self.initLine();
  });

  self.initLine = function() {
    var options = {
      animation: false,
      scaleOverride: true,
      elements: {
        line: {
          tension: 0
        }
      },

      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.05)"
            },
            ticks: {
              display: true,
              autoSkip: true,
              fontFamily: "'Roboto', sans-serif",
              fontColor: "rgba(255,255,255,0.5)",
              maxTicksLimit: "7",
              fontSize: "10",
              padding: 10,
              fontStyle: "500"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "white",
              display: false
            }
          }
        ]
      },
      responsive: false,
      pointRadius: 0,
      scaleSteps: 20,
      scaleStepWidth: 1,
      scaleStartValue: -10,
      elements: { point: { radius: 0 } },
      legend: {
        display: false
      }
    };

    var ctx = $("#canvas")
      .get(0)
      .getContext("2d");
    var myLine = new Chart(ctx, {
      type: "line",
      data: vm.lineChartData(),
      options: options
    });
  };
}

var vm = new MainViewModel();
ko.applyBindings(vm);
vm.initLine();

function BarViewModel(data) {
  var self = this;

  self.barChartData = ko.observable({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Dataset #1",
        backgroundColor: "rgba(255,99,132,0.7)",
        borderColor: "rgba(255,99,132,1)",
        orderWidth: 0.4,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [15, 10, 2, 8, 16, 15, 13]
      }
    ]
  });

  socket.on("bardata", function(data) {
    self.barChartData().datasets[0].data.shift();
    self.barChartData().datasets[0].data.push(data);

    self.initBar();
  });

  self.initBar = function() {
    var options = {
      animation: false,
      scaleOverride: true,
      maintainAspectRatio: false,
      scaleSteps: 20,
      scaleStepWidth: 1,
      scaleStartValue: -10,
      elements: { point: { radius: 0 } },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: true,

              color: "rgba(255,99,132,0.05)"
            },
            ticks: {
              display: true,
              autoSkip: true,

              fontFamily: "'Roboto', sans-serif",
              fontColor: "rgba(255,255,255,0.5)",
              maxTicksLimit: "7",
              fontSize: "10",

              padding: 10
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "white",
              display: false
            }
          }
        ]
      }
    };

    var ctx = $("#canvas1")
      .get(0)
      .getContext("2d");
    var myBarChart = new Chart(ctx, {
      type: "bar",
      data: vr.barChartData(),
      options: options
    });
  };
}

var vr = new BarViewModel();

ko.applyBindings(vr);
vr.initBar();
