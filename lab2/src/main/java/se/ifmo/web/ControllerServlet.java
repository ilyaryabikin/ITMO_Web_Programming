package se.ifmo.web;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ControllerServlet", urlPatterns = {"/Controller"})
public class ControllerServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String urlPattern;

        if (request.getParameter("radius") == null &&
                (!request.getParameter("xClick").isEmpty() ||
                        !request.getParameter("yClick").isEmpty())) {
            request.getServletContext().setAttribute("isCalculable", false);
            urlPattern = "/index.jsp";
        } else if (request.getParameter("radius") == null && request.getParameter("xCoordinate") == null &&
                request.getParameter("yCoordinate").isEmpty() && request.getParameter("xClick").isEmpty() &&
                request.getParameter("yClick").isEmpty()) {
            request.getServletContext().setAttribute("isCalculable", false);
            urlPattern = "/index.jsp";
        }
        else {
            request.getServletContext().setAttribute("isCalculable", true);
            urlPattern = "/AreaCheck";
        }

        RequestDispatcher requestDispatcher = request.getRequestDispatcher(urlPattern);
        requestDispatcher.forward(request, response);
    }
}
