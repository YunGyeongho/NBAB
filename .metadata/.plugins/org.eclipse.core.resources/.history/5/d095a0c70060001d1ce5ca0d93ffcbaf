const memoSaveURL = "http://sdgn-djvemfu.tplinkdns.com:6776/memo.save"

function clickMemoButton(memoIndex) {
	const memberID = document.getElementById("loginID").innerText;
	
	if(memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else{
		$("#memoButton" + memoIndex).attr({"onclick":
			"clickMemoSaveButton(" + memoIndex + ")"});
		$("#memoButton" + memoIndex).attr({"src":"resources/img/openMemo.png"});
		$("#memo" + memoIndex).removeAttr("style");
		
	}
}


function clickMemoSaveButton(memoIndex) {
	const memberID = document.getElementById("loginID").innerText;
	const label = document.getElementById("postLabel" + memoIndex).innerHTML;
	
	if(memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else if(label == "판독중"){
		alert("글이 판독중입니다");
	}else if(likeAndMemoFinish){
		likeAndMemoFinish = false;
		
		let memo = document.getElementById("memo" + memoIndex);
		let memoContent = memo.value; 
		
		const url = document.getElementById("postBlogName" + memoIndex);
		const query = "?memberID=" + memberID + "&url=" + url + 
		"&memo=" + memoContent + "&label=" + label + "&title=" + url.text; 
		
		$.getJSON(memoSaveURL + query, (end) => {
			likeAndMemoFinish = true;
			$("#memoButton" + memoIndex).attr({"onclick":
				"clickMemoButton(" + memoIndex + ")"});
			$("#memo" + memoIndex).attr({"style":"display :none;"});
			if (memoContent == "") {
				$("#memoButton" + memoIndex).attr({"src":"resources/img/closeMemo.png"});
			}else{
				$("#memoButton" + memoIndex).attr({"src":"resources/img/closeMemoRed.png"});
				if (whereUserPage == "like") {
					userPageLikeLoad();
				}
			}
		});

	}else{
		alert("이미 글을 DB저장 중입니다")
	}
}


function clickMemoButtonLikeUserPage(memoIndex) {
	const memberID = document.getElementById("loginID").innerText;
	
	if(memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else{
		$("#memoButtonLikeUserPage" + memoIndex).attr({"onclick":
			"clickMemoSaveButtonLikeUserPage(" + memoIndex + ")"});
		$("#memoButtonLikeUserPage" + memoIndex).attr({"src":"resources/img/openMemo.png"});
		$("#memoAreaLikeUserPage" + memoIndex).removeAttr("style");
		
	}
}


function clickMemoSaveButtonLikeUserPage(memoIndex) {
	const memberID = document.getElementById("loginID").innerText;
	
	if(memberID == ""){
		alert("로그인 안함 또는 로그인 시간 만료");
	}else if(likeAndMemoFinish){
		likeAndMemoFinish = false;
		
		let memo = document.getElementById("memoLikeUserPage" + memoIndex);
		let memoContent = memo.value; 
		
		const url = document.getElementById("likeUserPageTitle" + memoIndex);
		const label = document.getElementById("labelLikeUserPage" + memoIndex).innerHTML;
		
		const query = "?memberID=" + memberID + "&url=" + url + 
		"&memo=" + memoContent + "&label=" + label + "&title=" + url.text; 
		
		$.getJSON(memoSaveURL + query, (end) => {
			likeAndMemoFinish = true;
			$("#memoButtonLikeUserPage" + memoIndex).attr({"onclick":
				"clickMemoButtonLikeUserPage(" + memoIndex + ")"});
			$("#memoAreaLikeUserPage" + memoIndex).attr({"style":"display : none"});
			
			
			try {
				var mainATagID = $("[href=\"" + url +"\"]").attr("id");
				var mainIndex = mainATagID.replace("postBlogName", "");
				
				$("#memoButton" + mainIndex).attr({"onclick":
					"clickMemoButton(" + mainIndex + ")"});
				$("#memo" + mainIndex).attr({"style":"display :none;"});
				
				let mainMemo = document.getElementById("memo" + mainIndex);	
				mainMemo.value = memoContent;
			} catch (e) {
				// TODO: handle exception
			}
			
			if (memoContent == "") {
				if($("#likeImgLikeUserPage" + memoIndex).attr("src") == "resources/img/emptyHeart.PNG"){
					$("#userPageLikeTable" + memoIndex).remove();
				}else{
					$("#memoButtonLikeUserPage" + memoIndex).attr({"src":"resources/img/closeMemo.png"});
				}
				$("#memoButton" + mainIndex).attr({"src":"resources/img/closeMemo.png"});
			}else{
				$("#memoButtonLikeUserPage" + memoIndex).attr({"src":"resources/img/closeMemoRed.png"});
				$("#memoButton" + mainIndex).attr({"src":"resources/img/closeMemoRed.png"});
			}
		});

	}else{
		alert("이미 글을 DB저장 중입니다")
	}
}