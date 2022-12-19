<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
		<div id="mainSearchResultDiv" style="display: none;"></div>
		<table id="guideTable">
			<tr>
				<td>
					<h1>하희호 맛집 검색 사이트에 오신 것을 환영합니다!</h1>
					<br>
					Naver blog 검색 API를 사용하고 있으며 검색 기능 이용 방법은 다음과 같습니다.<br>
					<br>
					<h3>1. 지역과 음식을 키워드로 검색합니다.</h3>
					검색 창 아래에서 정렬순과 표기할 결과 갯수를 설정할 수 있습니다.<br>
					ex) 강남, 강남 마라탕, 부산, 부산 국밥<br>
					<br>
					<h3>2. 영어, 특수문자, 오타는 입력할 수 없습니다.</h3>
					ex) 강남 맛집!!, 홍대 pizza 맛집, 호ㅇ대 ㅁ샂비<br>
					<br>
					<h3>3. 판독 결과는 3가지로 분류 됩니다.</h3>
					<h4 style="color: red;">광고 기재</h4>
					블로그 하단 부에 기재된 광고 문구, 이미지가 있을 경우 해당 판독 결과를 나타냅니다.<br>
					90% 이상의 성능을 갖고 있어 드물게 광고임에도 광고 기재가 아니거나 광고가 아님에도 광고 기재로 나오는 경우가 있습니다.<br>
					<br>
					광고가 기재되어 있지 않은 경우 Ai에게 판독을 맡깁니다.<br>
					<br>
					Ai에겐 2가지 대조 데이터가 있습니다.<br>
					<br>
					1) 광고가 기재된 블로그들의 데이터<br>
					2) 광고가 기재되어 있지 않으며 전체 글을 읽었을 때 광고에 대한 위화감이 없는 글들만 엄선하여 쌓은 데이터<br>
					<h4 style="color: #FFE164;">광고 확률 높음</h4>
					위 데이터 중 1.과 유사할 경우 해당 판독 결과를 나타냅니다.<br>
					<h4 style="color: green;">광고 확률 낮음</h4>
					위 데이터 중 2.과 유사할 경우 해당 판독 결과를 나타냅니다.<br>
					<br>
					<h3>4. 회원가입을 하면 마음에 드는 검색 결과물에 기록을 남겨 저장할 수 있습니다.</h3>
					좋아요 혹은 메모 기능 이용 시 즉시 개인 페이지(Like & Memo) 탭으로 콘텐츠가 넘어갑니다.<br>
					좋아요는 클릭만 하면 되며 메모는 클릭 후 수첩을 열어 기록을 남기고 다시 메모를 닫아주세요.<br>
					이미 메모가 있는 경우엔 빨간 점으로 표기해 드린답니다.<br>
					(개인 페이지에서 콘텐츠를 지우고 싶다면 좋아요와 메모 전부 없애 주시면 됩니다.)<br>
					<br>
					<h3>5. 마음에 드는 검색 결과물을 게시판에서 유저들과 공유할 수 있습니다.</h3>
					게시판에서는 블로그를 보고 직접 방문한 후기를 작성하거나 블로그에서 소개하는 음식점이 정말 괜찮은지 질문하는 용도로 이용시 더욱 좋지만 기본적으로 게시판은 자유로운 공간이기에 주제에 대한 제약은 없습니다.<br>
					(아직 버튼을 눌러서 공유 하는 기능은 없지만 추후 개발 예정이며 완성 시 게시판 또한 분류할 예정입니다.)<br>
					<br>
					또한 본인이 작성했던 글과 댓글은 개인 페이지(Post, Reply)에서 확인 가능합니다.
				</td>
			</tr>
		</table>
		<table id="postArea" >
			<tr>
				<td>
					<c:forEach var="p" begin="0" end="100">
						<table id="post${p }" class="posts" style="display: none;">
							<tr>
								<td class="adAlertTd" align="center" id="postLabel${p }">
									판독중
								</td>
								<td class="imgTd" align="left">
									<img id="postImg${p }" src="resources/img/ready.PNG" class="photo">
								</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td class="mpTitle" colspan="4" align="center" class="blogName">
									<a id="postBlogName${p }"></a>
								</td>
							</tr>
							<tr>
								<td class="mpDate" colspan="4" align="right" id="postDate${p }">
								</td>
							</tr>
							<tr>
								<td class="mpContent" colspan="4"  id="postContent${p }">
								</td>
							</tr>
							<tr>
								<td class="mptd" colspan="2">
									<textarea class="memo" id="memo${p }" style="display: none;"></textarea>
								</td>
								<td class="mpMemo" align="right">
									<img src="resources/img/closeMemo.png" onclick="clickMemoButton(${p })" id="memoButton${p }" style="max-width: 70px;">
								</td>
								<td class="mpHeart" align="right">
									<img onclick="clickLikeUpButton(this.id)" id="${p }" class="likeButton"
										src="resources/img/emptyHeart.PNG" style="max-width: 50px;">
									<span id="likeCount${p }"></span>
								</td>
							</tr>
						</table>
					</c:forEach>
				</td>
			</tr>
		</table>
</body>