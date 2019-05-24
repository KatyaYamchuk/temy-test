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
  let theyear = new Date(time).getFullYear();
  let themonth = new Date(time).getMonth() + 1;
  let thetoday = new Date(time).getDate();
  return theyear+"."+themonth+"."+thetoday
}
