<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table class="mainSearchTable">
		<tr>
			<td class="mainSearchTd">
				<input id="mainSearch" placeholder="맛집 검색">
			</td>
			<td align="left" id="mainSearchBtn">
				Search!
			</td>
		</tr>
		<tr>
			<td align="center">
				<table>
					<tr>
						<td class="customizeTab">
							정렬
							<input type="radio" checked="checked" name="sort" value="sim">정확도순
							<input type="radio" name="sort" value="date">최신순
						</td>
						<td class="customizeTab">
							결과 조회
							<select id="viewCount">
								<option>20</option>
								<option>40</option>
								<option>60</option>
								<option>80</option>
								<option>100</option>
							</select>
							개씩
						</td>
					</tr> 
				</table>
			</td>
		</tr>
	</table>
</body>
</html>