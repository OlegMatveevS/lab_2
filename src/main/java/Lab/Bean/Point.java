package Lab.Bean;

import java.io.Serializable;

public class Point implements Serializable {
    private double x;
    private double y;
    private double R;
    private boolean hit;
    private int n;

    public Point(double x, double y, double r, int n){
        this.x = x;
        this.y = y;
        this.R = r;
        this.n = n;
        hit = checkArea(x, y, R);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return R;
    }

    public boolean isHit() {
        return hit;
    }

    public int getN() {
        return n;
    }

    public static boolean checkArea(double x, double y, double r){

        boolean circle = ((Math.pow(x, 2) + Math.pow(y, 2) <= (Math.pow(r , 2))) && y >= 0 && x <= 0);
        boolean square = (-x >= (-r) && y >= (-r) && y <= 0 && x >= 0);
        boolean triangle = (y <= 0 && x <= 0 && x + y >= -r);;

        return square || triangle || circle;
    }
}
