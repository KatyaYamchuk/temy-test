//Secondary functions

//Find country/state/city by id 
export const GetById = (user, key, db) => {
	let finded;
	return finded = db.find( item => {
		if (user[key] === String(item.id)){
			return item.name
		}
	})
}

//Find unique id of country/state/city for request
export const Unique = (arr, search_id) => {
  let obj = {}; let arr_id = [];
  arr.forEach( item => {
  	let str = item[search_id];
  	obj[str] = true;
  })
  arr_id = Object.keys(obj);
  arr_id = arr_id.map( id => {
  	return `id=${id}`
  })
  return arr_id.join('&');
}

//Converting to a normal date format
export const ConvertDate = (time) => {
  let year = new Date(time).getFullYear();

  let month = new Date(time).getMonth() + 1;
  month = month < 10 ? "0"+month : month;

  let today = new Date(time).getDate();
  today = today < 10 ? "0"+today : today

  let hours = new Date(time).getHours();
  hours = hours < 10 ? "0"+hours : hours

  let minutes = new Date(time).getMinutes();
  minutes = minutes < 10 ? "0"+minutes : minutes

  let seconds = new Date(time).getSeconds();
  seconds = seconds < 10 ? "0"+seconds : seconds
  return `${today}-${month}-${year} ${hours}:${minutes}:${seconds}`
}
