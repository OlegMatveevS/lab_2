package Lab.Filter;

import javax.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

public class AreaCheckFilter implements Filter {

    private int[] xValues = {-3, -2, -1, 0, 1, 2, 3, 4, 5};
    private double[] rValues = {1,2,3,4,5};

    public void init(FilterConfig arg0) {}

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException {

        resp.setContentType("text/html; charset=UTF-8");

        PrintWriter out = resp.getWriter();

        try {
            double x = Double.parseDouble(req.getParameter("x_h").trim());
            double y = Double.parseDouble(req.getParameter("y_h"));
            int r = Integer.parseInt(req.getParameter("r_h"));

            if (validate(x, y, r))
                chain.doFilter(req, resp);
            else
                throw new Exception("validation failed");
        } catch (Exception e) {
            out.println(("<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "</head>\n" +
                    "<body>" +
                    "<div class=\"centered\">" +
                    "ВЫХОД ЗА ДОПСУТИМЫЕ ЗНАЧЕНИЯ" +
                    "</div>" +
                    "</body> </html>"));
        }

    }

    private boolean validate(double x, double y, double r) {
        boolean checkX = Arrays.binarySearch(xValues, (int) x) > -1;
        boolean checkY = y >= -5 && y <= 3;
        boolean checkR = Arrays.binarySearch(rValues, r) > -1;
        return checkX && checkY && checkR;
    }

    public void destroy() {}

}

