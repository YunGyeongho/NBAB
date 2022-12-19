var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var express = require("express");
var app = express();

var request = require("request");
var mjs = require("mongojs");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.listen(6822);

const client_id = "T05U5CeloGiC2y22atq3";
const client_secret = "4rVSxCBh96";
const db = mjs("192.168.0.100/xe", ["haheeho"]);

app.get("/search.blog", (req, res) => {
  const query = encodeURI(req.query.query + "맛집");
  const apiUrl = `https://openapi.naver.com/v1/search/blog?display=20&query=${query}`;
  const options = {
    url: apiUrl,
    headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let items = JSON.parse(body).items;
      const length = items.length;
      let count = 0;
      let list = [];
      items.forEach((i) => {
        url = i.link;
        db.haheeho.find({ _id: url }, (e, result) => {
          
        	try {
        		let cd_label = result[0]["cd_label"]
        		if (cd_label == "광고") {
        			i["label"] = "광고 기재";
				}else{
					i["label"] = cd_label;
				}
        		i["likeCount"] = result[0]["cd_like_count"]
        	} catch (e) {
        		i["label"] = "판독중"
        		i["likeCount"] = 0;
			}
        	
          const year = i["postdate"].substr(0,4);
          const month = i["postdate"].substr(4,2);
          const day = i["postdate"].substr(6,2);
          
          i["postdate"] = year + "-" + month + "-" + day;
          
          i["title"] = i["title"].replaceAll(/<[^>]*>?/g, "").replaceAll("&quot;", "\"").replaceAll("&amp;", "&").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&apos;", "\'").replaceAll("&apos;", "\'");
          i["description"] = i["description"].replaceAll(/<[^>]*>?/g, "").replaceAll("&quot;", "\"").replaceAll("&amp;", "&").replaceAll("&gt;", ">").replaceAll("&lt;", "<").replaceAll("&apos;", "\'").replaceAll("&apos;", "\'");
          
          url = i.link;
          let memberID = req.query.memberID;
          
          if (memberID != null) {

        	  db.haheehoUserPage.find({
        		  "$and": [
        			  {u_m_id : memberID},
        			  {u_url : url},
        			  ]
        	  }, (e, result) => {
        		  try {
        			  if(result[0]["u_like"]){
        				  i["heartPushed"] = true;
        			  }else{
        				  i["heartPushed"] = false;
        			  }

        			  i["showMemo"] = result[0]["u_memo"];
        			  
				} catch (e) {
					
					i["heartPushed"] = false;
					i["showMemo"] = "";
					
				}
        			  
        		  list.push(i);
        		  count++;
        		  
        		  if (count == length){
        			  res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
        			  res.write(JSON.stringify({ items: list }));
        			  res.end();
        		  }// if
        	  });//함수
			
		} else {

			i["heartPushed"] = false;
			list.push(i);
			
			count++;
			
			if (count == 20){
				res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
				res.write(JSON.stringify({ items: list }));
				res.end();
			}// if

		}
          
        });
      });
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});



app.get("/like.up", (req, res) => {
	// 해야하는 기능) 해당 글 좋아요 count올리고 userpage에 해당글이 없으면 하나 생성 
	const url = req.query.url;
	
	const myQuery = {_id : url };
	const newValue = { "$inc" : {cd_like_count : 1}};
	
	db.haheeho.updateOne(
			myQuery, newValue, (e, result) => {
				
				const memberID = req.query.memberID;
				
				db.haheehoUserPage.find({
					"$and": [
						{u_m_id : memberID},
						{u_url : url}
						]
				}).count((e, result) => {
					
					if (result == 0) {
						const title = req.query.title;
						const label = req.query.label;
						const date = new Date();
						
						db.haheehoUserPage.insertOne({
							u_m_id : memberID,
							u_url : url,
							u_like : true,
							u_memo : "",
							u_title : title,
							u_label : label,
							u_date : date
						}, (e, result) => {
							console.log("insert complete");

							res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
							res.write(JSON.stringify({ temp: "t" }));
							res.end();
						});
						
					}else{
						db.haheehoUserPage.updateOne({
							u_m_id : memberID,
							u_url : url
						},{
							"$set" : {u_like : true}
						}, (e, result) => {
							console.log("update complete");
							
							res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
							res.write(JSON.stringify({ temp: "t" }));
							res.end();
						});
					}
					
					
				});
			});
		
});


app.get("/like.down", (req, res) => {
	// 해야하는 기능) 해당 글 좋아요 count올리고 userpage에 해당글이 없으면 하나 생성 
	const url = req.query.url;
		
		const myQuery = { _id : url };
		const newValue = {"$inc" : { cd_like_count : -1 }};
		
		db.haheeho.updateOne(
				myQuery, newValue, (e, result) => {
					
					const memberID = req.query.memberID;
					
					db.haheehoUserPage.find({
						"$and": [
							{u_m_id : memberID},
							{u_url : url}
							]
					}, (e, result) => {


						if (result[0]["u_memo"] == "") {
							
							db.haheehoUserPage.remove({
								"$and": [
									{u_m_id : memberID},
									{u_url : url}
									]
							}, (e, result) => {
								console.log("remove complete");

								res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
								res.write(JSON.stringify({ temp: "t" }));
								res.end();
							});
							
						}else{
							db.haheehoUserPage.updateOne({
								u_m_id : memberID,
								u_url : url
							},{
								"$set" : {u_like : false}
							}, (e, result) => {
								console.log("update complete");

								res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
								res.write(JSON.stringify({ temp: "t" }));
								res.end();
							});
						}
							
						
					});
				});
});


app.get("/memo.save", (req, res) => {
	
	const url = req.query.url;
	const memberID = req.query.memberID;
	
	db.haheehoUserPage.find({
		"$and": [
			{u_m_id : memberID},
			{u_url : url}
			]
	}, (e, result) => {
		
		const memo = req.query.memo;
		try {
			if (result[0]["u_like"]) {
				db.haheehoUserPage.updateOne({
					u_m_id : memberID,
					u_url : url
				},{
					"$set" : {u_memo : memo}
				}, (e, result) => {
					console.log("update complete");
					
					res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
					res.write(JSON.stringify({ temp: "t" }));
					res.end();
				});
			}else{
				db.haheehoUserPage.remove({
					"$and": [
						{u_m_id : memberID},
						{u_url : url}
						]
				}, (e, result) => {
					console.log("remove complete");

					res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
					res.write(JSON.stringify({ temp: "t" }));
					res.end();
				});
			}
			
		} catch (e) {

			const title = req.query.title;
			const label = req.query.label;
			const date = new Date();
			
			db.haheehoUserPage.insertOne({
				u_m_id : memberID,
				u_url : url,
				u_like : false,
				u_memo : memo,
				u_title : title,
				u_label : label,
				u_date : date
			}, (e, result) => {
				console.log("insert complete");
				
				res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
				res.write(JSON.stringify({ temp: "t" }));
				res.end();
			});

		}
		
		
	});
	
});





app.get("/like.info.get", (req, res) =>{
	
	const memberID = req.query.memberID;
	
	db.haheehoUserPage.find({
			u_m_id : memberID
	}).sort({u_date : -1}, (e, result) =>{
		
		res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
		res.write(JSON.stringify({ info : result }));
		res.end();
	});
	
});


app.post("/board.get.content", (req, res) => {
	
	const number = req.body.b_number;

	db.haheehoBoard.find({
		b_number : number
	}, (e, result) => {
		
		res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
		res.write(JSON.stringify({ content: result[0]["b_content"] }));
		res.end();
		
	});
	
});



app.post("/board.submit", (req, res) => {
	
	const b_number = req.body.b_number;
	const b_content = req.body.b_content;
	
	db.haheehoBoard.insertOne({
		b_number : b_number,
		b_content : b_content
	}, (e, result) => {
		console.log("insert complete");
		
		res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
		res.write(JSON.stringify({ temp: "t" }));
		res.end();
	});
});

app.post("/board.modify", (req, res) => {
	
	const b_number = req.body.b_number;
	const b_content = req.body.b_content;
	
	db.haheehoBoard.updateOne({
		b_number : b_number
	},{
		"$set": {b_content : b_content}
	}, (e, result) => {
		console.log("update complete");
		
		res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
		res.write(JSON.stringify({ temp: "t" }));
		res.end();
	});
});


app.post("/board.delete", (req, res) => {
	
	const b_number = req.body.b_number;
	
	db.haheehoBoard.remove({
		b_number : b_number
	}, (e, result) => {
		console.log("remove complete");
		
		res.writeHead(200, { "Content-Type": "application/json;charset=utf-8", "Access-Control-Allow-Origin": "*" });
		res.write(JSON.stringify({ temp: "t" }));
		res.end();
	});
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;