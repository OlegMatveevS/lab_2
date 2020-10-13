package Lab.Bean;

import Lab.Bean.Point;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PointsTableBean implements Serializable {

    private int n = 1;
    private List<Point> points;

    public PointsTableBean() {
        points = new ArrayList<>();
    }

    public int getN() {
        return n;
    }

    public void addPoint(Point point) {
        n++;
        points.add(point);
    }

    public static void clear(List a) {
            a.clear();
    }

    public List getPoints() {
        return points;
    }
}
