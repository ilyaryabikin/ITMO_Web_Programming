package se.ifmo.web;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "AreaCheckServlet", urlPatterns = {"/AreaCheck"})
public class AreaCheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        double x = parseXRequest(request);
        double y = parseYRequest(request);
        double r = Double.parseDouble(request.getParameter("radius"));

        List<Double> xArray = new ArrayList<>();
        List<Double> yArray = new ArrayList<>();
        List<Double> rArray = new ArrayList<>();
        List<Boolean> checksArray = new ArrayList<>();

        HttpSession httpSession = request.getSession();
        if (httpSession.getAttribute("xArray") != null) {
            xArray = (List<Double>) httpSession.getAttribute("xArray");
            yArray = (List<Double>) httpSession.getAttribute("yArray");
            rArray = (List<Double>) httpSession.getAttribute("rArray");
            checksArray = (List<Boolean>) httpSession.getAttribute("checksArray");
        } else {
            httpSession.setMaxInactiveInterval(300);
        }

        xArray.add(x);
        yArray.add(y);
        rArray.add(r);
        checksArray.add(checkAreas(x, y, r));

        httpSession.setAttribute("xArray", xArray);
        httpSession.setAttribute("yArray", yArray);
        httpSession.setAttribute("rArray", rArray);
        httpSession.setAttribute("checksArray", checksArray);

        RequestDispatcher requestDispatcher = request.getRequestDispatcher("/result.jsp");
        requestDispatcher.forward(request, response);
    }

    private Double parseXRequest(HttpServletRequest request) {
        if (!request.getParameter("xClick").isEmpty()) {
            return Double.parseDouble(request.getParameter("xClick"));
        } else {
            return Double.parseDouble(request.getParameter("xCoordinate"));
        }
    }

    private Double parseYRequest(HttpServletRequest request) {
        if (!request.getParameter("yClick").isEmpty()) {
            return Double.parseDouble(request.getParameter("yClick"));
        } else {
            return Double.parseDouble(
                    request.getParameter("yCoordinate")
                            .trim().replaceAll(",", "."));
        }
    }

    private boolean checkAreas(double x, double y, double r) {
        return checkTriangle(x, y, r) || checkRectangle(x, y, r) || checkCircle(x, y, r);
    }

    private boolean checkTriangle(double x, double y, double r) {
        return x <= 0 && x >= -0.5 * r && y >= 0 && y <= x + 0.5 * r;
    }

    private boolean checkRectangle(double x, double y, double r) {
        return x >= 0 && x <= 0.5 * r && y <= 0 && y >= -r;
    }

    private boolean checkCircle(double x, double y, double r) {
        return x >= 0 && x <= r && y >= 0 && y <= Math.sqrt(r * r - x * x);
    }
}