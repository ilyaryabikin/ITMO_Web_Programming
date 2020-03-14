package se.ifmo.web.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;
import se.ifmo.web.hibernate.HibernateSessionFactory;
import se.ifmo.web.model.Point;

import java.util.List;

public class PointDao {

    public Point findById(int id) {
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        Point point = session.get(Point.class, id);
        session.close();
        return point;
    }

    public void save(Point point) {
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.save(point);
        transaction.commit();
        session.close();
    }

    public void delete(Point point) {
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();
        session.delete(point);
        transaction.commit();
        session.close();
    }

    public List<Point> getAllPoints() {
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        List<Point> points = (List<Point>) session.createQuery("from Point").list();
        session.close();
        return points;
    }

    public void deleteAllPoints() {
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        List<Point> points = (List<Point>) session.createQuery("from Point").list();
        Transaction transaction = session.beginTransaction();
        for (Point current : points) {
            session.delete(current);
        }
        transaction.commit();
        session.close();
    }
}
