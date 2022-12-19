let whereUserPage = "";
let likeAndMemoFinish = true;
//const likeUpURL = "http://192.168.0.141:6822/like.up"
const likeUpURL = "http://sdgn-djvemfu.tplinkdns.com:6776/like.up"
//const likeDownURL = "http://192.168.0.141:6822/like.down"
const likeDownURL = "http://sdgn-djvemfu.tplinkdns.com:6776/like.down"
	
function clickLikeUpButton(buttonID) {

	const memberID = document.getElementById("loginID").innerText;
	const label = document.getElementById("postLabel" + buttonID).innerHTML;
	
	if (memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else if(label == "판독중"){
		alert("글이 판독중입니다");
	}else if(likeAndMemoFinish){
		likeAndMemoFinish = false;
		
		$("#" + buttonID).attr({"src": "resources/img/fullHeart.PNG"});
		$("#" + buttonID).attr({"onclick":"clickLikeDownButton(this.id)"});

		let likeCount = document.getElementById('likeCount' + buttonID).innerHTML;
		likeCount++;
		$("#likeCount" + buttonID).text(likeCount);
	
		const title = document.getElementById("postBlogName" + buttonID);

		const query = "?url=" + title + "&title=" + title.text 
			+ "&memberID=" + memberID + "&label=" + label;
		
		$.getJSON(likeUpURL + query, (end) => {
			likeAndMemoFinish = true;
			if (whereUserPage == "like") {
				userPageLikeLoad();
			}
		});

	}else{
		alert("아직 DB로딩중입니다");
	}
	
}

function clickLikeDownButton(buttonID) {
	
	const memberID = document.getElementById("loginID").innerText;

	if(memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else if(likeAndMemoFinish){
		likeAndMemoFinish = false;

		$("#" + buttonID).attr({"src": "resources/img/emptyHeart.PNG"});
		$("#" + buttonID).attr({"onclick":"clickLikeUpButton(this.id)"});
		
		let likeCount = document.getElementById('likeCount' + buttonID).innerHTML;
		likeCount--;
		$("#likeCount" + buttonID).text(likeCount);

		const title = document.getElementById("postBlogName" + buttonID);
		
		// title = url, title.text = title
		const query = "?url=" + title + "&memberID=" + memberID;
		
		$.getJSON(likeDownURL + query, (end) => {
			likeAndMemoFinish = true;
			if (whereUserPage == "like") {
				userPageLikeLoad();
			}
		});

	}else{
		alert("아직 DB로딩중입니다");
	}
}


function clickLikeDownButtonLikeUserPage(buttonNumber) {
	
	const memberID = document.getElementById("loginID").innerText;

	if(memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else if(likeAndMemoFinish){
		likeAndMemoFinish = false;

		const title = document.getElementById("likeUserPageTitle" + buttonNumber);
		// title = url, title.text = title
		const query = "?url=" + title + "&memberID=" + memberID;
		
		if($("#memoButtonLikeUserPage" + buttonNumber).attr("src") == "resources/img/closeMemo.png"){
			$("#userPageLikeTable" + buttonNumber).remove();
		}else{
			$("#likeImgLikeUserPage" +buttonNumber).attr({"src": "resources/img/emptyHeart.PNG"});
			$("#likeImgLikeUserPage" +buttonNumber).attr({"onclick":"clickLikeUpButtonLikeUserPage(" + buttonNumber + ")"});
		}

		try {
			var mainATagID = $("[href=\"" + title +"\"]").attr("id");
			var mainIndex = mainATagID.replace("postBlogName", "");
			
			$("#" + mainIndex).attr({"src": "resources/img/emptyHeart.PNG"});
			$("#" + mainIndex).attr({"onclick":"clickLikeUpButton(this.id)"});

			let likeCount = document.getElementById('likeCount' + mainIndex).innerHTML;
			likeCount--;
			$("#likeCount" + mainIndex).text(likeCount);
		} catch (e) {
			// TODO: handle exception
		}
		
		$.getJSON(likeDownURL + query, (end) => {
			likeAndMemoFinish = true;
		});

	}else{
		alert("아직 DB로딩중입니다");
	}
}

function clickLikeUpButtonLikeUserPage(buttonNumber) {
	
	const memberID = document.getElementById("loginID").innerText;
	
	if(memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else if(likeAndMemoFinish){
		likeAndMemoFinish = false;
		
		const title = document.getElementById("likeUserPageTitle" + buttonNumber);
		// title = url, title.text = title
		const query = "?url=" + title + "&memberID=" + memberID;
		$("#likeImgLikeUserPage" +buttonNumber).attr({"src": "resources/img/fullHeart.PNG"});
		$("#likeImgLikeUserPage" +buttonNumber).attr({"onclick":"clickLikeDownButtonLikeUserPage(" + buttonNumber + ")"});

		try {
			var mainATagID = $("[href=\"" + title +"\"]").attr("id");
			var mainIndex = mainATagID.replace("postBlogName", "");
			
			$("#" + mainIndex).attr({"src": "resources/img/fullHeart.PNG"});
			$("#" + mainIndex).attr({"onclick":"clickLikeDownButton(this.id)"});

			let likeCount = document.getElementById('likeCount' + mainIndex).innerHTML;
			likeCount++;
			$("#likeCount" + mainIndex).text(likeCount);
		} catch (e) {
			// TODO: handle exception
		}
		
		$.getJSON(likeUpURL + query, (end) => {
			likeAndMemoFinish = true;
		});
		
	}else{
		alert("아직 DB로딩중입니다");
	}
}