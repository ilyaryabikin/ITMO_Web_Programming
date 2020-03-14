<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
  <title>Lab 2</title>
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
      <div class="col-lg-6 col-md-9 col-sm-9 col-3 my-2">
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
            List<Double> xArray = new ArrayList<>();
            List<Double> yArray = new ArrayList<>();
            List<Double> rArray = new ArrayList<>();
            List<Boolean> checksArray = new ArrayList<>();

            if (!session.isNew() && session.getAttribute("xArray") != null) {
              xArray = (List<Double>) session.getAttribute("xArray");
              yArray = (List<Double>) session.getAttribute("yArray");
              rArray = (List<Double>) session.getAttribute("rArray");
              checksArray = (List<Boolean>) session.getAttribute("checksArray");

              for (int i = 0; i < xArray.size(); i++) {
          %>
          <tr>
            <td><%=xArray.get(i)%>
            </td>
            <td><%=yArray.get(i)%>
            </td>
            <td><%=rArray.get(i)%>
            </td>
            <td><%=checksArray.get(i) ? "Да" : "Нет"%>
            </td>
          </tr>
          <%      }
          }
          %>
        </table>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-5 col-5 align-self-center my-2">
        <canvas id="plot" width="250" height="250"></canvas>
        <% if(request.getServletContext().getAttribute("isCalculable") != null) {
          if (!(Boolean) request.getServletContext().getAttribute("isCalculable")) {
        %>
        <div class="text-center my-2">
          <span class="badge badge-danger">Невозможно вычислить</span>
        </div>
        <%  }
        }
        %>
      </div>
    </div>
    <form id="coordsForm" class="my-5 needs-validation" method="post" action="Controller" novalidate>
      <input type="hidden" id="xClick" name="xClick" value="">
      <input type="hidden" id="yClick" name="yClick" value="">
      <div class="form-row justify-content-center">
        <div class="form-group col-3 align-self-end">
          <label for="xCoordinate">Выберите координату X</label>
          <select class="form-control custom-select" id="xCoordinate" name="xCoordinate" required>
            <option disabled selected value="">Координата X</option>
            <option value="-2">-2</option>
            <option value="-1.5">-1.5</option>
            <option value="-1">-1</option>
            <option value="-0.5">-0.5</option>
            <option value="0">0</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
          </select>
          <div class="invalid-tooltip">Выберите значение</div>
        </div>
        <div class="form-group col-3 align-self-end">
          <label for="yCoordinate">Введите координату Y</label>
          <input class="form-control" id="yCoordinate" name="yCoordinate" type="text" autocomplete="off"
                 placeholder="Координата Y (от -3 до 3)" maxlength="17" required>
          <div class="invalid-tooltip" id="yTooltip">Введите значение</div>
        </div>
        <div class="form-group col-3 align-self-end">
          <label for="radius">Выберите радиус</label>
          <select class="form-control custom-select" id="radius" name="radius" required>
            <option disabled selected value="">Радиус</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
          </select>
          <div class="invalid-tooltip">Выберите значение</div>
        </div>
      </div>
      <div class="form-row justify-content-center">
        <button type="submit" class="btn btn-outline-primary" id="coordsSubmit">Проверить</button>
      </div>
    </form>
  </div>
</main>
<script src="js/drawGraph.js"></script>
<script src="js/submitClickCoords.js"></script>
<script src="js/validate.js"></script>
<script>
  let ctx = canvas.getContext('2d');
  let r;
  let x;
  let y;
  <% if (!session.isNew() && session.getAttribute("xArray") != null) {

  for (int i = 0; i < xArray.size(); i++) {
      %>
  r = <%=rArray.get(i)%>;

  x = ((<%=xArray.get(i)%> * xScale) / r) + 125;
  y = (-((<%=yArray.get(i)%> * yScale) / r) + 125);

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
  ctx.arc(x, y, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  <%
      }
  }
  %>
</script>
</body>
</html>