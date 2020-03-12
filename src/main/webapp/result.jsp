<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
    <title>Results</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous">
</head>
<body class="d-flex flex-column h-100">
<div class="header bg-dark py-2">
    <h3 class="text-light text-center">P3210 Рябикин Илья - Вариант 6548</h3>
</div>
<main role="main" class="flex-shrink-0">
    <div class="container">
        <div class="row justify-content-center my-3">
            <canvas id="plot" width="250" height="250"></canvas>
        </div>
        <div class="row justify-content-center">
            <div class="col-6">
                <table class="table table-hover table-bordered my-2">
                    <thead class="thead-dark">
                    <tr>
                        <th>Координата X</th>
                        <th>Координата Y</th>
                        <th>Радиус</th>
                        <th>Попадание</th>
                    </tr>
                    </thead>
                    <%
                        List<Double> xArray = (List<Double>) session.getAttribute("xArray");
                        List<Double> yArray = (List<Double>) session.getAttribute("yArray");
                        List<Double> rArray = (List<Double>) session.getAttribute("rArray");
                        List<Boolean> checksArray = (List<Boolean>) session.getAttribute("checksArray");

                        int i = xArray.size() - 1; %>
                    <tr>
                        <td><%=xArray.get(i)%></td>
                        <td><%=yArray.get(i)%></td>
                        <td><%=rArray.get(i)%></td>
                        <td><%=checksArray.get(i) ? "Да" : "Нет"%></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="row justify-content-center my-2">
            <a href="index.jsp" class="badge badge-primary">Вернуться назад</a>
        </div>
    </div>
</main>
<script src="js/drawGraph.js"></script>
<script>
    let ctx = canvas.getContext('2d');
    let r = <%=rArray.get(i)%>;

    let x = ((<%=xArray.get(i)%> * xScale) / r) + 125;
    let y = (-((<%=yArray.get(i)%> * yScale) / r) + 125);

    if (x >= 250) {
        x = 248;
    }
    if (x <= 0) {
        x = 2;
    }
    if (y >= 250) {
        y = 248;
    }
    if (y <= 0) {
        y = 2;
    }

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#DC3545';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
</script>
</body>
</html>