import Request from 'v2ex/src/lib/Request';
import cheerio from 'cheerio-without-node-native';
import CookieManager from 'react-native-cookies';
import Toast from 'react-native-root-toast';
import { apiDomain, apiHost } from 'v2ex/src/config';


export function allNodes(){
	return Request.get(`${apiDomain}/api/nodes/all.json`);
}

// api 只能取最新的10条
// export function latestTopics(){
// 	return Request.get(`${apiDomain}/api/topics/latest.json');
// }

export function latestTopics(page){
	return Request.ajax({
		url : `${apiDomain}/recent?p=${page}`,
		method: 'GET',
		returnType : 'text'
	}).then((data)=>{
		const items = parseHtml(data);
		return items;
	});
}

export function hotTopics(){
	return Request.get(`${apiDomain}/api/topics/hot.json`);
}

/* 
帖子详情 
data : {id: }
*/
export function topic(data){
	return Request.get(`${apiDomain}/api/topics/show.json`, data);
}

export function replies(topic_id, page, page_size){
	return Request.get(`${apiDomain}/api/replies/show.json`, {topic_id, page, page_size});
}

// 节点列表 和 最新列表 网页dom相同
function parseHtml(data){
	const items = [];
	const $ = cheerio.load(data);
	$('#Main .item').each((i, v)=>{
		const item = $(v);
		const avatar = item.find('.avatar').attr('src');
		const title = item.find('.item_title > a').text();
		const url = item.find('.item_title > a').attr('href');
		const node = item.find('.fade .node').text();
		const username = item.find('.fade .node').next().find('a').text();
		const replies = item.find('.count_livid').text();
		const timeStr = item.find('.fade').contents()[4];
		let time = undefined;
		if(timeStr){
			time = timeStr.data.match('•(.*)•')[1];
			if(time)time = time.replace(/\s/g,"");
		}
		const m = url.match(/^\/t\/(\d*)/)
		items.push({
			id : m ? m[1] : null,
			title,
			avatar,
			member:{
				username,
				avatar_normal : avatar
			},
			node :{
				title : node
			},
			replies,
			time
		});
	});
	return items;
}

export function tabTopics(tab='all'){
	return Request.getHtml(`${apiDomain}/?tab=${tab}`).then((data)=>{
		const items = parseHtml(data);
		return items;
	});
}

export function nodeTopics(node, page){
	return Request.getHtml(`${apiDomain}/go/${node}?p=${page}`).then((data)=>{
		const items = [];
		const $ = cheerio.load(data);
		$('#Main .cell[class^="cell from"]').each(function(i, v){
			var item = $(v);
			var avatar = item.find('.avatar').attr('src');
			var title = item.find('.item_title > a').text();
			var url = item.find('.item_title > a').attr('href');
			var username = item.find('.fade strong').first().find('a').text();
			var replies = item.find('.count_livid').text();
			var timeStr = item.find('.fade').contents()[1];
			let time = undefined;
			if(timeStr){
				time = timeStr.data.match('•([^•]*)')[1];
				if(time)time = time.replace(/\s/g,"");
			}
			var m = url.match(/^\/t\/(\d*)/)
			items.push({
				id : m ? m[1] : null,
				title,
				avatar,
				member:{
					username,
					avatar_normal : avatar
				},
				replies,
				time
			});
		});
		return items;
	});
}

function getCookieStrByDomain(domain){
	return new Promise((resolve, reject) => {
		CookieManager.get(domain, (err, res) => {
			if(err)reject(err);
			let cookies = '';
			for(const i in res){
				const cookie = res[i];
				cookies = `${cookies}${i}=${cookie}; `;
			}
			resolve(cookies);
		});
	});
}

function _login(loginKey, pswKey, once, loginId, password){
	return getCookieStrByDomain(`${apiDomain}/`).then((cookies) => {
		return Request.ajax({
			url : `${apiDomain}/signin`,
			method:'POST',
			headers : {
				// 保证登录的进行
				'Host' : apiHost,
				'Referer' : `${apiDomain}/signin`,
				'User-Agent' : 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36 QQBrowser/4.1.4132.400',
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Cookie': cookies
			},
			data : {
				[loginKey] : loginId,
				[pswKey]: password,
				next : '/',
				'once' : once
			},
			returnType : 'text'
		}).then((html)=>{
			const $ = cheerio.load(html);

			// 错误信息显示
			const problems = getProblems($);
			if(problems)
				return Promise.reject(problems);

			return getCurrUser().then((userInfo)=>{
				if(userInfo.username && userInfo.avatar)return userInfo;
				Toast.show('登录失败');
				return Promise.reject(new Error('登录失败'));
			});

		})
	});
}

function getProblems($){
	const problems = $('#Wrapper .content .problem li');
	if(problems && problems.length > 0){
		let message = '';
		problems.each((index, li)=>{
			message += $(li).text();
			if(index != problems.length - 1)message += '\n';
		});
		Toast.show(message);
		return message;
	}
}


export function login(loginId, password){
	return Request.getHtml(`${apiDomain}/signin`).then((data)=>{
		const $ = cheerio.load(data);
		const params = $('form input[type!="submit"]');
		if(params == undefined || params.length == 0){
			Toast.show('获取登录参数失败');
			return Promise.reject(new Error('获取登录参数失败'));
		}
		// 获取登录的表单字段
		return _login($(params[1]).attr('name'), $(params[2]).attr('name'), $(params[3]).attr('value'), loginId, password);
	})
}

// 用户信息提取
function getCurrUserFromHtml($){
	const avatar = $('#Rightbar .box:nth-child(2) a .avatar');
	const username = $('#Wrapper #Rightbar table .bigger a');
	if(avatar && username){
		return {
			username : username.text(),
			avatar : avatar.attr('src')
		}
	}
}

export function getCurrUser(){
	return Request.getHtml(`${apiDomain}/`).then((data)=>{
		const $ = cheerio.load(data);
		return getCurrUserFromHtml($);
	})
}


export async function reply(topicId, content, once){
	if(once == undefined)once = await getOnce();
	return Request.ajax({
		url : `${apiDomain}/t/${topicId}`,
		method:'POST',
		data : {
			"content": content,
			'once' : once
		},
		returnType : 'text'
	}).then((data)=>{
		const $ = cheerio.load(data);
		const problems = getProblems($);
		if(problems)
			return Promise.reject(problems);
		return true;
	});
}

export function getTopicToken(topicId){
	return Request.getHtml(`${apiDomain}/t/${topicId}`).then((data)=>{
		const $ = cheerio.load(data);
		const favorite = $('div.content div#Main .topic_buttons a.tb').first();
		if(favorite && favorite.text().indexOf('收藏')){
			return favorite.attr('href').match('t=(.*)$')[1];
		}
		return Promise.reject(new Error('token获取失败'));
	});
}

export function getOnce(){
	return Request.getHtml(`${apiDomain}/signin`).then((data)=>{
		const $ = cheerio.load(data);
		const once = $('input[name="once"]').first();
		if(once){
			return once.attr('value');
		}
		return Promise.reject(new Error('参数once获取失败'));
	});
}

export function thankReply(topicId, replyId) {
	return getTopicToken(topicId).then((_token)=>{
		return Request.ajax({
			url : `${apiDomain}/thank/reply/${replyId}?t=${_token}`,
			method:'POST',
			returnType :'text'
		}).then((data)=>{
			return true;
		});
	});
}