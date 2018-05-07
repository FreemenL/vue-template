let apiUrl = '';
let address = { domains:'http://172.17.5.117:8083'};
process.env.NODE_ENV=='development' ? apiUrl = '':apiUrl = address.domains;
module.exports = {
	apiUrl:apiUrl,
	address
};