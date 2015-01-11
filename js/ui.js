/**
 * @author Bartosz Henryk Iwaniuk
 * mail: b.iwaniuk@campus.tu-berlin.de
 * ui control
 */

$(window).resize(function(){
    myNewChart.destroy();
    canvas.width = $("#canvasContainer").width();
    canvas.height = $("#canvasContainer").height();
    myNewChart = new Chart(ctx).Bar(data, options);
    myNewChart.update();
});

var step = 0;

function updateCaptureChance () {
    $("#captureChanceLable").text(state[step][100] + "%");
    $("#captureChanceLine").removeClass();
    if (state[step][100] > 0 && state[step][100] < 100) {
        $("#captureChanceLine").addClass("warning");
    } else if (state[step][100] == 100) {
        $("#captureChanceLine").addClass("success");
    } else {
        $("#captureChanceLine").addClass("danger");
    }
}

function prevStep () {
    step = (Math.max(0, step - 1));
    updateChart(step);
    $(".zsLabel").each (function () {
        $(this).text(step);
    });
    updateCaptureChance();
}

function nextStep () {
    step = (Math.min(step + 1, 5));
    updateChart(step);
    $(".zsLabel").each (function () {
        $(this).text(step);
    });
    updateCaptureChance();
}

function updateChart(step) {
    for (var i=0; i<state[step].length; i++) {
        myNewChart.datasets[0].bars[i].value = state[step][i];
    }
    myNewChart.update();
}

function toggleYAxis (cb) {
    options.scaleOverride = cb.checked;
    data.datasets[0].data = state[step];
    myNewChart.destroy();
    myNewChart = new Chart(ctx).Bar(data, options);
}

function changeInitialValue () {
    var val = parseInt($("#initialValueInput").val());
    state = initMarkox(val);
    updateChart(step);
}