var tr = document.getElementsByTagName('tr');
var info = document.getElementById("info");

for (_i = 1; _i < tr.length; _i++) {
    tr[_i].onclick = function(e) {
        str = "/danhsach/capduoi/?id=" + this.getElementsByTagName('td')[1].innerHTML;
        info.innerHTML = "đang tải...";
        fet = fetch(str).then(response => response.json()).then(res => {
            info.innerHTML = "";
            console.log(res);
            for (i in res) {
                var item = document.createElement('p');
                item.innerHTML =i + ": " + res[i];
                info.appendChild(item);
            }
        });
    }
}