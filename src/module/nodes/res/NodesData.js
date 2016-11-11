/**
 	var str = '[';
	$("td > span[class='fade']").each(function(){
		str += '{ "node_name" : "' + $(this).text() + '","children" : [';
		var nodes = $(this).parent().next().children();
		var size = nodes.length;
		nodes.each(function(i){
			var name = $(this).attr('href').replace('/go/','');
			var title = $(this).text();
			str += '{"name": "'+ name +'", "title":"'+ title +'"}';
			if(i+1 != size)str += ','
		});
		str += ']},';
	})
	str += ']';
	console.log(str)
 */

export default nodes = [
  {
    "node_name": "分享与探索",
    "children": [
      {
        "name": "qna",
        "title": "问与答"
      },
      {
        "name": "share",
        "title": "分享发现"
      },
      {
        "name": "create",
        "title": "分享创造"
      },
      {
        "name": "in",
        "title": "分享邀请码"
      },
      {
        "name": "autistic",
        "title": "自言自语"
      },
      {
        "name": "ideas",
        "title": "奇思妙想"
      },
      {
        "name": "random",
        "title": "随想"
      },
      {
        "name": "design",
        "title": "设计"
      },
      {
        "name": "blog",
        "title": "Blog"
      }
    ]
  },
  {
    "node_name": "V2EX",
    "children": [
      {
        "name": "v2ex",
        "title": "V2EX"
      },
      {
        "name": "babel",
        "title": "Project Babel"
      },
      {
        "name": "dns",
        "title": "DNS"
      },
      {
        "name": "feedback",
        "title": "反馈"
      },
      {
        "name": "gae",
        "title": "Google App Engine"
      },
      {
        "name": "guide",
        "title": "使用指南"
      }
    ]
  },
  {
    "node_name": "iOS",
    "children": [
      {
        "name": "idev",
        "title": "iDev"
      },
      {
        "name": "icode",
        "title": "iCode"
      },
      {
        "name": "imarketing",
        "title": "iMarketing"
      },
      {
        "name": "iad",
        "title": "iAd"
      },
      {
        "name": "itransfer",
        "title": "iTransfer"
      }
    ]
  },
  {
    "node_name": "Geek",
    "children": [
      {
        "name": "programmer",
        "title": "程序员"
      },
      {
        "name": "python",
        "title": "Python"
      },
      {
        "name": "android",
        "title": "Android"
      },
      {
        "name": "linux",
        "title": "Linux"
      },
      {
        "name": "php",
        "title": "PHP"
      },
      {
        "name": "bb",
        "title": "宽带症候群"
      },
      {
        "name": "cloud",
        "title": "云计算"
      },
      {
        "name": "outsourcing",
        "title": "外包"
      },
      {
        "name": "hardware",
        "title": "硬件"
      },
      {
        "name": "server",
        "title": "服务器"
      },
      {
        "name": "java",
        "title": "Java"
      },
      {
        "name": "bitcoin",
        "title": "Bitcoin"
      },
      {
        "name": "mysql",
        "title": "MySQL"
      },
      {
        "name": "linode",
        "title": "Linode"
      },
      {
        "name": "programming",
        "title": "编程"
      },
      {
        "name": "designer",
        "title": "设计师"
      },
      {
        "name": "kindle",
        "title": "Kindle"
      },
      {
        "name": "car",
        "title": "汽车"
      },
      {
        "name": "markdown",
        "title": "Markdown"
      },
      {
        "name": "tornado",
        "title": "Tornado"
      },
      {
        "name": "ror",
        "title": "Ruby on Rails"
      },
      {
        "name": "mongodb",
        "title": "MongoDB"
      },
      {
        "name": "typography",
        "title": "字体排印"
      },
      {
        "name": "redis",
        "title": "Redis"
      },
      {
        "name": "ruby",
        "title": "Ruby"
      },
      {
        "name": "business",
        "title": "商业模式"
      },
      {
        "name": "math",
        "title": "数学"
      },
      {
        "name": "photoshop",
        "title": "Photoshop"
      },
      {
        "name": "lego",
        "title": "LEGO"
      },
      {
        "name": "sony",
        "title": "SONY"
      },
      {
        "name": "nlp",
        "title": "自然语言处理"
      }
    ]
  },
  {
    "node_name": "游戏",
    "children": [
      {
        "name": "games",
        "title": "游戏"
      },
      {
        "name": "steam",
        "title": "Steam"
      },
      {
        "name": "igame",
        "title": "iGame"
      },
      {
        "name": "lol",
        "title": "英雄联盟"
      },
      {
        "name": "ps4",
        "title": "PlayStation 4"
      },
      {
        "name": "bf3",
        "title": "Battlefield 3"
      },
      {
        "name": "sc2",
        "title": "StarCraft 2"
      },
      {
        "name": "ps3",
        "title": "PlayStation 3"
      },
      {
        "name": "wow",
        "title": "World of Warcraft"
      },
      {
        "name": "eve",
        "title": "EVE"
      },
      {
        "name": "xbox360",
        "title": "Xbox 360"
      },
      {
        "name": "bf4",
        "title": "Battlefield 4"
      },
      {
        "name": "gt",
        "title": "Gran Turismo"
      },
      {
        "name": "wii",
        "title": "Wii"
      }
    ]
  },
  {
    "node_name": "Apple",
    "children": [
      {
        "name": "macos",
        "title": "macOS"
      },
      {
        "name": "iphone",
        "title": "iPhone"
      },
      {
        "name": "mbp",
        "title": "MacBook Pro"
      },
      {
        "name": "ipad",
        "title": "iPad"
      },
      {
        "name": "accessory",
        "title": "配件"
      },
      {
        "name": "mba",
        "title": "MacBook Air"
      },
      {
        "name": "macbook",
        "title": "MacBook"
      },
      {
        "name": "imac",
        "title": "iMac"
      },
      {
        "name": "macmini",
        "title": "Mac mini"
      },
      {
        "name": "ipod",
        "title": "iPod"
      },
      {
        "name": "macpro",
        "title": "Mac Pro"
      },
      {
        "name": "mobileme",
        "title": "MobileMe"
      },
      {
        "name": "iwork",
        "title": "iWork"
      },
      {
        "name": "ilife",
        "title": "iLife"
      },
      {
        "name": "garageband",
        "title": "GarageBand"
      }
    ]
  },
  {
    "node_name": "生活",
    "children": [
      {
        "name": "all4all",
        "title": "二手交易"
      },
      {
        "name": "jobs",
        "title": "酷工作"
      },
      {
        "name": "afterdark",
        "title": "天黑以后"
      },
      {
        "name": "free",
        "title": "免费赠送"
      },
      {
        "name": "music",
        "title": "音乐"
      },
      {
        "name": "movie",
        "title": "电影"
      },
      {
        "name": "exchange",
        "title": "物物交换"
      },
      {
        "name": "tv",
        "title": "剧集"
      },
      {
        "name": "creditcard",
        "title": "信用卡"
      },
      {
        "name": "taste",
        "title": "美酒与美食"
      },
      {
        "name": "tuan",
        "title": "团购"
      },
      {
        "name": "invest",
        "title": "投资"
      },
      {
        "name": "travel",
        "title": "旅行"
      },
      {
        "name": "reading",
        "title": "阅读"
      },
      {
        "name": "photograph",
        "title": "摄影"
      },
      {
        "name": "soccer",
        "title": "绿茵场"
      },
      {
        "name": "baby",
        "title": "Baby"
      },
      {
        "name": "pet",
        "title": "宠物"
      },
      {
        "name": "coffee",
        "title": "咖啡"
      },
      {
        "name": "lohas",
        "title": "乐活"
      },
      {
        "name": "bike",
        "title": "骑行"
      },
      {
        "name": "diary",
        "title": "日记"
      },
      {
        "name": "love",
        "title": "非诚勿扰"
      },
      {
        "name": "plant",
        "title": "植物"
      },
      {
        "name": "mushroom",
        "title": "蘑菇"
      },
      {
        "name": "mileage",
        "title": "行程控"
      }
    ]
  },
  {
    "node_name": "Internet",
    "children": [
      {
        "name": "google",
        "title": "Google"
      },
      {
        "name": "twitter",
        "title": "Twitter"
      },
      {
        "name": "coding",
        "title": "Coding"
      },
      {
        "name": "facebook",
        "title": "Facebook"
      },
      {
        "name": "wikipedia",
        "title": "Wikipedia"
      },
      {
        "name": "reddit",
        "title": "reddit"
      }
    ]
  },
  {
    "node_name": "城市",
    "children": [
      {
        "name": "beijing",
        "title": "北京"
      },
      {
        "name": "shanghai",
        "title": "上海"
      },
      {
        "name": "shenzhen",
        "title": "深圳"
      },
      {
        "name": "hangzhou",
        "title": "杭州"
      },
      {
        "name": "guangzhou",
        "title": "广州"
      },
      {
        "name": "chengdu",
        "title": "成都"
      },
      {
        "name": "wuhan",
        "title": "武汉"
      },
      {
        "name": "kunming",
        "title": "昆明"
      },
      {
        "name": "tianjin",
        "title": "天津"
      },
      {
        "name": "nyc",
        "title": "New York"
      },
      {
        "name": "sanfrancisco",
        "title": "San Francisco"
      },
      {
        "name": "qingdao",
        "title": "青岛"
      },
      {
        "name": "la",
        "title": "Los Angeles"
      },
      {
        "name": "boston",
        "title": "Boston"
      }
    ]
  },
  {
    "node_name": "品牌",
    "children": [
      {
        "name": "uniqlo",
        "title": "UNIQLO"
      },
      {
        "name": "lamy",
        "title": "Lamy"
      },
      {
        "name": "ikea",
        "title": "宜家"
      },
      {
        "name": "muji",
        "title": "无印良品"
      },
      {
        "name": "gap",
        "title": "Gap"
      },
      {
        "name": "nike",
        "title": "Nike"
      },
      {
        "name": "moleskine",
        "title": "Moleskine"
      },
      {
        "name": "adidas",
        "title": "Adidas"
      },
      {
        "name": "gstar",
        "title": "G-Star"
      }
    ]
  }
];