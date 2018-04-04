const hostname = window && window.location && window.location.hostname;

let url = "";
if (hostname === "codemarker.uoa.abdn.ac.uk") {
    url = "https://codemarker.uoa.abdn.ac.uk/api/";
}
else {
    url = "http://127.0.0.1:8000/"
}

export default {
    API_URL: url
}