package Lab.Servlet;

import Lab.Bean.Point;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class HitCheckServlet extends HttpServlet {

    private ServletConfig config;

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

    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try {
            double x = Double.parseDouble(request.getParameter("x_h").trim());
            double y = Double.parseDouble(request.getParameter("y_h").trim());
            double r = Double.parseDouble(request.getParameter("r_h").trim());

            response.getWriter().println(Point.checkArea(x, y, r));
        } catch (Exception e) {
            response.getWriter().println(false);
        }

        response.getWriter().close();
    }

}
