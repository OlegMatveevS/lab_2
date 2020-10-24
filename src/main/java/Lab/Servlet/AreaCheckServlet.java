package Lab.Servlet;

import Lab.Bean.Point;
import Lab.Bean.PointsTableBean;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {

    private ServletConfig config;

    private PointsTableBean bean;

    @Override
    public void init(ServletConfig config) {
        this.config = config;
    }

    @Override
    public void destroy() {}

    @Override
    public ServletConfig getServletConfig()
    {
        return config;
    }

    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        bean = (PointsTableBean) request.getSession().getAttribute("pointsBean");

        boolean load;

        try {
            load = request.getParameter("load").equals("1");
        } catch (NullPointerException e) {
            load = false;
        }

        if (!load) {
            try {
                double x = Double.parseDouble(request.getParameter("x_h").trim());
                double y = Double.parseDouble(request.getParameter("y_h"));
                int r = Integer.parseInt(request.getParameter("r_h"));

                Point p = new Point(x, y, r, bean.getN());

                bean.addPoint(p);
            } catch (Exception e) {
                //throw e;
                request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
            }
        }

        response.setContentType("text/html; charset=UTF-8");

        request.getServletContext().getRequestDispatcher("/table.jsp").include(request, response);

    }

}
