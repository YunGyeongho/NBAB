# -*- coding:utf-8 -*-
from flask.json import jsonify
from flask.helpers import make_response

class responseSet():
    
    def getResponse(self, result):
        
        return make_response(jsonify({"result" : result})), {"Access-Control-Allow-Origin": "*"}