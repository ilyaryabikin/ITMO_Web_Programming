package se.ifmo.web.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "points")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "x_coordinate")
    private double xCoordinate;

    @Column(name = "y_coordinate")
    private double yCoordinate;

    @Column(name = "radius")
    private double radius;

    @Column(name = "inside")
    private boolean inside;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getxCoordinate() {
        return xCoordinate;
    }

    public void setxCoordinate(double xCoordinate) {
        this.xCoordinate = xCoordinate;
    }

    public double getyCoordinate() {
        return yCoordinate;
    }

    public void setyCoordinate(double yCoordinate) {
        this.yCoordinate = yCoordinate;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public boolean isInside() {
        return inside;
    }

    public void setInside(boolean inside) {
        this.inside = inside;
    }
}
