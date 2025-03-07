$(document).ready(function() {
    var dataPoints = [];

    var options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Datos de Ventas Diarias"
        },
        axisX: {
            title: "Fecha",
            valueFormatString: "YYYY-MM-DD"
        },
        axisY: {
            title: "Monto en USD",
            titleFontSize: 24
        },
        data: [{
            type: "spline",
            yValueFormatString: "$#,###.##",
            dataPoints: dataPoints
        }]
    };

    function addData(data) {
        for (var i = 0; i < data.length; i++) {
            dataPoints.push({
                x: new Date(data[i].x),  
                y: data[i].y
            });
        }
        $("#chartContainer").CanvasJSChart(options);
    }

    $.getJSON("api/datos.php", addData);  // Aquí se usa el script PHP

});