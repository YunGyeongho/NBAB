<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="resources/js/jQuery.js"></script>
<script type="text/javascript">
	$(function() {
		/* 	
		$.ajax({
			url : "주소",
			data : {파라메터명 : 값, 파라메터명 : 값, 파라메터명 : 값, ... },
			success: function(받은거) {

			}
		});
 	*/
 	
 	/* 
		$.ajax({
			url : "ninknames.search.json",
			data : {page : 1},
			success: function(j) {
				alert(JSON.stringify(j)); //JSON => 문자열
			}
			
		});
	 */	

		// AJAX(Asynchronous Javascript And Xml)
		// A : 서버로 요청 보내놓고,
		//	응답 올 때까지 프로그램 사용가능
		setInterval(function() {
			$.ajax({
				url : "ninknames.get.xml",
				success : function(x) {
					$("table").empty();
					$(x).find("nickname").each(
							function(i, p) {
								// $(this) 써도 상관없음
								var nameTd = $("<td></td>").text(
										$(p).find("n_name").text());
								var nickTd = $("<td></td>").text(
										$(p).find("n_nickname").text());

								var tr = $("<tr></tr>").append(nameTd, nickTd);

								$("table").append(tr);
							});
				}
			});

		}, 1000);

	});
</script>
</head>
<body>
	<table border="1">
		<tr>
			<th>품명</th>
			<th>가격</th>
		</tr>
	</table>
	<hr>
	<input>
	<table border="1">
		<tr>
			<td>이름</td>
			<td>닉네임</td>
		</tr>
		<c:forEach var="n" items="${nicknames }">
			<tr>
				<td>${n.n_name }</td>
				<td>${n.n_nickname }</td>
			</tr>
		</c:forEach>
	</table>
	<a href="ninknames.get.xml">XML로 보기</a>
	<a href="ninknames.get.json">JSON으로 보기</a>
	<form action="ninknames.search.json">
		<input name="page">
		<button>JSON으로 보기</button>
	</form>
	<a href="index2.go">인덱스2</a>

</body>
</html>