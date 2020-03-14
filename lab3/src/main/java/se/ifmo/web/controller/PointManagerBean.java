package se.ifmo.web.controller;

import se.ifmo.web.dao.PointDao;
import se.ifmo.web.model.Point;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.List;

@Named(value = "pointManager")
@SessionScoped
public class PointManagerBean implements Serializable {
    private Point point;
    private PointDao pointDao;

    public PointManagerBean() {
        point = new Point(0, 0, 1, false);
        pointDao = new PointDao();
    }

    public double getXCoordinate() {
        return point.getXCoordinate();
    }

    public void setXCoordinate(double xCoordinate) {
        point.setXCoordinate(xCoordinate);
    }

    public double getYCoordinate() {
        return point.getYCoordinate();
    }

    public void setYCoordinate(double yCoordinate) {
        point.setYCoordinate(yCoordinate);
    }

    public double getRadius() {
        return point.getRadius();
    }

    public void setRadius(double radius) {
        point.setRadius(radius);
    }

    public boolean isInside() {
        return point.isInside();
    }

    public void setInside(boolean inside) {
        point.setInside(inside);
    }

    public boolean checkAreas() {
        return AreaChecker.checkAreas(point.getXCoordinate(), point.getYCoordinate(), point.getRadius());
    }

    public void savePoint() {
        setInside(checkAreas());
        pointDao.save(point);
    }

    public void deleteAllPoints() {
        pointDao.deleteAllPoints();
    }

    public List<Point> getAllPoints() {
        return pointDao.getAllPoints();
    }
}