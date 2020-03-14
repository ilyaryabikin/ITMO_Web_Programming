package se.ifmo.web.controller;

class AreaChecker {

    private static boolean checkCircle(double x, double y, double radius) {
        return x <= 0 && y >= 0 &&
                radius >= Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    private static boolean checkTriangle(double x, double y, double radius) {
        return x <= 0 && x >= -radius && y <= 0 &&
                y >= (-0.5 * x) - (0.5 * radius);
    }

    private static boolean checkRectangle(double x, double y, double radius) {
        return x >= 0 && x <= radius &&
                y <= 0 && y >= radius * -0.5;
    }

    static boolean checkAreas(double x, double y, double radius) {
        return checkCircle(x, y, radius) || checkRectangle(x, y, radius) || checkTriangle(x, y, radius);
    }
}
