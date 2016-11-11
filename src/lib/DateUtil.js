

export function formatTimeStrByNow(time){
	const now = Math.round(Date.now() / 1000);
	const t = now - time;
	if(t <= 10){
		return '刚刚';
	}else if(t / 3600 < 1){
		return Math.floor(t/60) + '分钟前';
	}else if(t / 3600 / 24 < 1){
		return Math.floor(t / 3600) + '小时前';
	}else{
		return Math.floor(t / 3600 / 24) + '天前';
	}
}