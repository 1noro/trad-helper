this.json_decode = (json) => {
    try{
        return JSON.parse(json.replace(/"(([^\\"]+|\\.)*)"|'(([^\\']+|\\.)*)'|\/\/[^\r\n]+|\/\*(([^\*]+|\*[^\/])*)\*\//g, (...arguments) => {

            const string = arguments[arguments[1] !== undefined ? 1 : 3];

            if(string !== undefined)
                return '"' + string + '"';
            return "";
        }));
    }catch(error){console.log([json, error]);};
    return null;
};
