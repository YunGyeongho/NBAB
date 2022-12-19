# -*- coding:utf-8 -*-
from pymongo.mongo_client import MongoClient


class ConMongo():
     
    def __init__(self, ip):
        self.ip = ip
        
        
    def insertUrl(self, url, label):
        try:
            con = MongoClient(self.ip)
            db = con.xe
            command = db.haheeho.insert_one({"_id": url, "cd_label": label, "cd_like_count": 0})
            
            if not command.acknowledged:
                print("%s,실패" % url)
        except Exception as e:
            print(e)
        finally:
            con.close()
    
    def insertWithContent(self, url, content, label):
        try:
            con = MongoClient(self.ip)
            db = con.xe
            command = db.haheeho.insert_one({"_id": url, "cd_content": content, "cd_label": label, "cd_like_count": 0})
            
            if not command.acknowledged:
                print("%s,실패" % url)
        except Exception as e:
            print(e)
        finally:
            con.close()
    
    def updateLabel(self, url, label):
        try:
            con = MongoClient(self.ip)
            db = con.xe
            command = db.haheeho.update_many({"_id": url}, {"$set":{"cd_label": label}})
            
            if not command.modified_count >= 1:
                print("%s,실패" % url)
        except Exception as e:
            print(e)
        finally:
            con.close()
    
    def getTrainContent(self):
        try:
            con = MongoClient(self.ip)
            db = con.xe
            blogDatas = list(db.haheehoEdu.find()) 
            # 기존 설계가 바뀜에 따라 Ai교육용 데이터를 쌓을 테이블을 따로 만들기로 했다.
            return blogDatas
        
        except Exception as e:
            print(e)
        finally:
            con.close()
        
        
    def findContent(self, url):    
        try:
            con = MongoClient(self.ip)
            db = con.xe
            blogData = list(db.haheeho.find({"_id": url})) 
            
            return blogData
        
        except Exception as e:
            print(e)
        finally:
            con.close() 