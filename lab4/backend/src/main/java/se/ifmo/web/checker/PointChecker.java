package se.ifmo.web.checker;

public class PointChecker {

    private static boolean checkCircle(double x, double y, double radius) {
        return x >= 0 && x <= radius/2 && y >= 0 && y <= radius/2 &&
                radius/2 >= Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    private static boolean checkTriangle(double x, double y, double radius) {
        return x <= 0 && x >= -radius && y >= 0 &&
                y <= 0.5*(x + radius);
    }

    private static boolean checkRectangle(double x, double y, double radius) {
        return x <= 0 && x >= -radius &&
                y <= 0 && y >= -radius;
    }

    public static boolean checkAreas(double x, double y, double radius) {
        return checkCircle(x, y, radius) || checkRectangle(x, y, radius) || checkTriangle(x, y, radius);
    }
}
