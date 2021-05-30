$.get('./data.json', function(data) {
    myChart(data)
})

function myChart(data) {
    const ctx = $("#kolo")[0].getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [
                {
                    data: data.chartData,
                    backgroundColor:data.color
                }]
        },
        options: {
            cutoutPercentage: 40
        }
    });
}