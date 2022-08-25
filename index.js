document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    var static_data = [{
        grad_year: 2014,
        student_count: 42
    }, {
        grad_year: 2015,
        student_count: 102
    }, {
        grad_year: 2016,
        student_count: 160
    }, {
        grad_year: 2017,
        student_count: 82
    }, {
        grad_year: 2018,
        student_count: 48
    }, {
        grad_year: 2019,
        student_count: 68
    }, {
        grad_year: 2020,
        student_count: 28
    }];
    var tip = d3.select(".chart-container")
        .append("div")
        .attr("class", "tip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");

    var svg = d3.select("svg").attr("class", "background-style"),
        margin = { top: 20, right: 20, bottom: 42, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.05),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("apiPlaceholderURL", function (error, data) {
        //if (error) throw error;

        data = static_data;

        x.domain(data.map(function (d) { return d.grad_year; }));
        y.domain([0, d3.max(data, function (d) { return d.student_count; })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("y", 6)
            .attr("dy", "2.5em")
            .attr("dx", width / 2 - margin.left)
            .attr("text-anchor", "start")
            .text("Grad Year");

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Student Count");


        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.grad_year); })
            .attr("y", function (d) { return y(d.student_count); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.student_count) })
            .on("mouseover", function (d) { return tip.text(d.student_count).style("visibility", "visible").style("top", y(d.student_count) - 13 + 'px').style("left", x(d.grad_year) + x.bandwidth() - 12 + 'px') })
            //.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
            .on("mouseout", function () { return tip.style("visibility", "hidden"); });
    });
})