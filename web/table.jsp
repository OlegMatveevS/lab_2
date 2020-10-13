<%@ page import="Lab.Bean.Point" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Collections" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="pointsBean" class="Lab.Bean.PointsTableBean" scope="session"/>
<html>
<head>
    <title>Результат проверки</title>
    <link rel="stylesheet" href="style.css">
    <meta charset="utf-8">
</head>
<body>
<table class="results block centered">
    <tr> <th>N</th> <th>X</th> <th>Y</th> <th>R</th> <th><b>Результат</b></th></tr>
    <%
    List<Point> list = pointsBean.getPoints();

        while (list.size() > 10) {
            list.remove(0);
        }

        List<Point> reversed = new ArrayList<>(list);
        Collections.reverse(reversed);

        for (Point point : reversed) {
        %>
    <tr>
        <td><%=point.getN() %></td>
        <td><%=point.getX() %></td>
        <td><%=point.getY() %></td>
        <td><%=point.getR()%></td>
        <td><%=point.isHit() ? "True" : "False" %></td>
    </tr>
    <%}%>


</table>
</body>
</html>
