let searchInput = null;
let searchBtn = null;
let boardSearchInput = null;
let boardsearchBtn = null;

if (document.querySelector("#mainSearch") != null){
	
	searchInput = document.querySelector("#mainSearch");
	searchBtn = document.querySelector("#mainSearchBtn");
	
	searchInput.addEventListener("keyup", connectMainPageSearchEvent);
	searchBtn.addEventListener("click", connectMainPageSearchBtnEvent);
	
} else {
	boardSearchInput = document.querySelector("#boardSearch");
	boardsearchBtn = document.querySelector("#boardSearchBtn");
	
	boardSearchInput.addEventListener("keyup", connectBoardPageSearchEvent);
	boardsearchBtn.addEventListener("click", connectBoardPageSearchBtnEvent);
}

// mainSearch 이벤트

// const nodeUrl = "http://192.168.0.141:6822/search.blog?query=";
const nodeUrl = "http://sdgn-djvemfu.tplinkdns.com:6776/search.blog?query=";
//const inDBUrl = "http://192.168.0.158:6833/judge.ai?url=";
const inDBUrl = "http://sdgn-djvemfu.tplinkdns.com:6767/judge.ai?url=";
//const notInDBUrl = "http://192.168.0.158:6833/filter.judge.ai?url=";
const notInDBUrl = "http://sdgn-djvemfu.tplinkdns.com:6767/filter.judge.ai?url=";



function getJudge(url, link, n){
	$.getJSON(url + link, (item) => {
		const result = item.result;
		$("#postLabel" + n).text(result);
		if (result == "광고 기재"){
			$("#postImg" + n).attr({'src':'resources/img/red.PNG', "class":"photo"});
		} else if (result == "광고 확률 높음"){
			$("#postImg" + n).attr({'src':'resources/img/yellow.PNG', "class":"photo"});
		} else if (result == "광고 확률 낮음"){
			$("#postImg" + n).attr({'src':'resources/img/green.PNG', "class":"photo"});
		} else {
			$("#postImg" + n).attr({'src':'resources/img/ready.PNG', "class":"photo"});
		}
	});
}


function appendTable(search){
	
	const loginID = document.getElementById("loginID").innerText;
	let queryID = "";

	if (loginID != null) {
		queryID = "&memberID=" + loginID;
	}
	
	const sort = $('input[name=sort]:checked').val();
	const sortQuery = "&sort=" + sort;
	
	const viewCountElement = document.getElementById("viewCount");
	const viewCount = viewCountElement.options[viewCountElement.selectedIndex].text
	
	const viewQuery = "&viewCount=" + viewCount;
	
	$("#guideTable").attr({"style":"display:none;"})
	
	$.getJSON(nodeUrl + search + sortQuery + viewQuery + queryID, (data) => {

		$(".posts").attr("style", "display: none;")
		$(".memo").attr("style", "display: none;")
		
		$.each(data.items, (n, item) => {
			let label = item.label;
			let link = item.link;
			let pushed = item.heartPushed;
			let showMemo = item.showMemo;
			const memo = document.getElementById('memo' + n);

			$("#post" + n).removeAttr("style");
			
			$("#postBlogName" + n).text(item.title).attr({'href':link, 'target':'_blank'});
			$("#postDate" + n).text(item.postdate);
			$("#postContent" + n).text(item.description);
			$("#postLabel" + n).text(label);
			
			if(pushed){
				$("#" + n).attr({"src": "resources/img/fullHeart.PNG"});
				$("#" + n).attr({"onclick":"clickLikeDownButton(this.id)"});
			}else{
				$("#" + n).attr({"src": "resources/img/emptyHeart.PNG"});
				$("#" + n).attr({"onclick":"clickLikeUpButton(this.id)"});
			}
			
			if(showMemo != ""){
				$("#memoButton" + n).attr({"src":"resources/img/closeMemoRed.png"});
				$("#memoButton" + n).attr({"onclick":"clickMemoButton(" + n + ")"});
			}else{
				$("#memoButton" + n).attr({"src":"resources/img/closeMemo.png"});
				$("#memoButton" + n).attr({"onclick":"clickMemoButton(" + n + ")"});
			}
			memo.value = showMemo;
			
			$("#likeCount" + n).text(item.likeCount);
			
			
			if(label != "광고 기재"){
				if(label == "판독중"){
					getJudge(notInDBUrl, link, n);
				} else {
					getJudge(inDBUrl, link, n);
				}
				$("#postImg" + n).attr({'src':'resources/img/ready.PNG', "class":"photo"});
				$("#postLabel" + n).text("판독중");
			} else {
				$("#postImg" + n).attr({'src':'resources/img/red.PNG', "class":"photo"});
				$("#postLabel" + n).text("광고 기재");
			} 
		});
	});
}

function connectMainPageSearchEvent(event) {
	if(event.keyCode == 13){
		const search = searchInput.value;
		
		if(emptyChk(searchInput)||!engOnly(searchInput)||!typoChk(searchInput)) {
			alert("검색어를 확인해주세요. 영문 금지, 오타 비허용");
			searchInput.focus();
		} else {
			document.getElementById("mainSearchResultDiv").innerText = `(${search}) 검색 결과`;
			document.getElementById("mainSearchResultDiv").style = "";
			appendTable(search);
		}
		searchInput.value = "";
	}
	
}

function connectMainPageSearchBtnEvent() {
	const search = searchInput.value;
	
	if(emptyChk(searchInput)||!engOnly(searchInput)||!typoChk(searchInput)) {
		alert("검색어를 확인해주세요. 영문 금지, 오타 비허용");
		searchInput.focus();
	} else {
		document.getElementById("mainSearchResultDiv").innerText = `(${search}) 검색 결과`;
		document.getElementById("mainSearchResultDiv").style = "";
		appendTable(search);
	}
	searchInput.value = "";
}


// boardSearch 이벤트

function connectBoardPageSearchEvent() {
	if(event.keyCode == 13){
		const sortValue = document.querySelector('input[name="sort"]:checked').value;
		const search = boardSearchInput.value;
		boardSearchInput.value = "";
		
		if (sortValue == "b_title"){
			location.href = `board.go?page=1&search=${search}`;
		} else if(sortValue == "b_m_username") {
			location.href = `board.search.username?page=1&search=${search}`;
		} else {
			alert("기능 구현 중입니다.");
			boardSearchInput.focus();
		}
	}
}

function connectBoardPageSearchBtnEvent() {
	const sortValue = document.querySelector('input[name="sort"]:checked').value;
	const search = boardSearchInput.value;
	boardSearchInput.value = "";

	if (sortValue == "b_title"){
		location.href = `board.go?page=1&search=${search}`;
	} else if(sortValue == "b_m_username") {
		location.href = `board.search.username?page=1&search=${search}`;
	} else {
		alert("기능 구현 중입니다.");
		boardSearchInput.focus();
	}
}
