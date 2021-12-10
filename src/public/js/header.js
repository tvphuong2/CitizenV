var root_id = localStorage.getItem("id");
var token = localStorage.getItem("token");

var ds = document.getElementById("ds");
var tc = document.getElementById("tc");
var ql = document.getElementById("ql");
var nl = document.getElementById("nl");

if(root_id.length == 8) {
    ds.parentNode.removeChild(ds);
    ql.parentNode.removeChild(ql);
} 
if([2,3,4].includes(root_id.length)) {
    nl.parentNode.removeChild(nl);
}
