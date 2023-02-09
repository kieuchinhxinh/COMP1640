exports.response_status = function(res,msg,status) {
    var data = {
        status: status,
        message: msg
    }
    return res.status(status).json(data);
}

exports.response_data = function (res,msg,status,data) {
    var data = {
        status: status,
        message: msg,
        data: data
    }
    return res.status(status).json(data);
}
exports.response_error_500 = function (res,msg) {
    var data= {
        status: 500,
        message: msg
    }
    return res.status(500).json(data);
}
exports.notFoundResponse = function (res, msg) {
	var data = {
		status: 404,
		message: msg,
	};
	return res.status(404).json(data);
};
exports.response_token = function (res,msg,accessToken) {
    var data = {
        status: 200,
        message: msg,
        access_token: accessToken,
    }
    return res.status(200).json(data);
}
