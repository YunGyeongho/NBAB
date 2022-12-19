package com.haheeho.adblock;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

public class TokenGenerator {

		public static void generate(HttpServletRequest req) {
			Date now = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSS");
			String token = sdf.format(now);
			req.setAttribute("token", token);
		}
		
}
