const FS = require('fs');
const restos_list = require('./restaurants_list.json');
const info = require('./restaurants_info.json');
const keys = Object.keys(info[0])[0].split(';');
const len = keys.length;

function mergeObj(obj1, obj2) {
  let ob1 = obj1.sort((a, b) => parseInt(a.objectID) - parseInt(b.objectID));
  let ob2 = obj2.sort((a, b) => parseInt(a.objectID) - parseInt(b.objectID));
  return ob1.map((ob, i) => Object.assign(ob, ob2[i]));
}

let restos_info = [];
info.map((row) => {
	const cur = Object.values(row)[0].split(';');
	let obj = {}, k;
	for(var i=0; i<len; i++) {
		k = keys[i];
		obj[k] = ((k==='reviews_count'||k==='objectID'||k==='postal_code')?
			parseInt(cur[i]):((k==='stars_count')?parseFloat(cur[i]):cur[i])
		);
	}
	restos_info.push(obj);
});

const restos_merge = mergeObj(
  restos_info,
  restos_list
);

if (restos_merge) {
	FS.writeFile(
		'restaurants_merge.json',
		JSON.stringify(restos_merge),
		'utf8', (e) => console.warn(e)
	);
}
