package Lab.Servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class ControllerServlet extends HttpServlet {

	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String xString = request.getParameter("x_h");
		String yString = request.getParameter("y_h");
		String RString = request.getParameter("r_h");
		String hit = request.getParameter("hit");

		if (xString == null || yString == null || RString == null) {
			if (hit != null && hit.equals("true"))
				request.getServletContext().getRequestDispatcher("/hit").forward(request, response);
			else
				request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
		}
	}

}
