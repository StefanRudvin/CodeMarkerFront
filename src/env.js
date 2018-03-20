const hostname = window && window.location && window.location.hostname;

let url = "";
if (hostname === "codemarker.uoa.abdn.ac.uk") {
    url = "http://codemarker.uoa.abdn.ac.uk:8000/api/";
}
else {
    url = "http://127.0.0.1:8000/api/"
}

export default {
    API_URL: url
}