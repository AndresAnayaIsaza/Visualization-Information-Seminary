function graficar(){

    var svg = d3.select("svg"),
        margin = {top: 20, right: 60, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var div = d3.select('div.tooltip');

    var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1)
        .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#ff2a00", "#0078ff", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var stack = d3.stack()
        .offset(d3.stackOffsetExpand);

    d3.csv("data.csv", function(error, data) {
      if (error) throw error;

      d3.csv("data2.csv", function(error2, data2) {
        console.log(data2);
        data.sort(function(a, b) { return b[data.columns[1]] / b.total - a[data.columns[1]] / a.total; });

        x.domain(data.map(function(d) { return d.State; }));
        z.domain(data.columns.slice(1));

        var serie = g.selectAll(".serie")
          .data(stack.keys(data.columns.slice(1))(data))
          .enter().append("g")
            .attr("class", "serie")
            .attr("fill", function(d) { return z(d.key); });

        serie.selectAll("rect")
          .data(function(d) { return d; })
          .enter().append("rect")
            .attr("x", function(d) { return x(d.data.State); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth())
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseout', mouseout);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "%"));

        var legend = serie.append("g")
            .attr("class", "legend")
            .attr("transform", function(d) { var d = d[d.length - 1]; return "translate(" + (x(d.data.State) + x.bandwidth()) + "," + ((y(d[0]) + y(d[1])) / 2) + ")"; });


        legend.append("line")
            .attr("x1", -6)
            .attr("x2", 6)
            .attr("stroke", "#000");

        legend.append("text")
            .attr("x", 9)
            .attr("dy", "0.35em")
            .attr("fill", "#000")
            .style("font", "10px sans-serif")
            .text(function(d) { return d.key; });

        function mouseover(d, i) {
          div.transition()
            .duration(200)
            .style('opacity', 1);

          var datum = data2[i];
          var html = "<p>Municipio: " + datum.municipio + "</p>"
            + "<p>Departamento: " + datum.Departamento + "</p>"
            + "<p>Afectados: " + datum.afectados + "</p>"
            + "<p>Afectados: " + datum.porcentaje + "</p>";

          div.html(html)
            .style('left', (d3.event.pageX - 128) + 'px')
            .style('top', (d3.event.pageY - 170) + 'px');
        }

        function mousemove(d, i) {
          div
            .style('left', (d3.event.pageX - 128) + 'px')
            .style('top', (d3.event.pageY - 170) + 'px');
        }

        function mouseout(d, i) {
          div.transition()
            .duration(500)
            .style('opacity', 0);
        }

      });
    });

    function type(d, i, columns) {
      for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
      d.total = t;
      return d;
    }

}
