    
    let dataset;
    let dataperpage = 6;
    let currentpage;
    let totalpage;
    let numofitem;
    let spawnhere = document.getElementById("itemlist");
    let paglist = document.getElementById("paglist");
    let paglistlength = 2;


    async function getData() {
      const response = await fetch('/pdata.json');
      const data = await response.json()
      return data;
    }

    async function initPage() {
      dataset = await getData();
      console.log("executed")
      for (let i = 0; i < dataperpage; i++) {
        spawnItem(i);
      }
      numofitem = dataset.length
      console.log("Length of json object : " + numofitem)
      totalpage = Math.ceil(numofitem / dataperpage)

      paglist.innerHTML += `<li class="page-item active"><a class="page-link" href="#" onclick="toPage(1)">1</a></li>`
      for (let i = 2; i <= totalpage; i++) {
        if (i == paglistlength * 2 + 2) {
          break;
        }
        paglist.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="toPage(${i})">${i}</a></li>`
      }
      currentpage = 1;
    }

    async function initColforIndex() {
        dataset = await getData();
        console.log("executed")
        for (let i = 0; i < 6; i++) {
          spawnItem(i);
        }
       
      }

    function toPage(j) {
      clearItem(spawnhere);
      let i = ((j - 1) * dataperpage)
      for (i; i <= ((j * dataperpage) - 1); i++) {
        if (i >= numofitem) {
          break;
        }
        spawnItem(i);
      }
      currentpage = j;
      console.log("Current Page: " + currentpage)
      centralizeCurrentPage();
    }



    function clearItem(target) {
      target.innerHTML = ""
      console.log("Clear")
    }


    function spawnItem(i) {
      spawnhere.innerHTML +=
        `
        <div class="col">
        <div class="card shadow p-3 mb-5 bg-body-tertiary rounded mx-auto" style="width: 18rem;">
            <a href="${dataset[i].link}" target="_blank">
            <img src="${dataset[i].imgpath}" class="card-img-top" alt="...">
            </a>
        </div>
        </div>
        `
    }

    function centralizeCurrentPage() {

      console.log("centralize")
      clearItem(paglist);
      let leftlength = currentpage - paglistlength
      let rightlength = currentpage + paglistlength

      if (rightlength > totalpage) {
        leftlength -= (rightlength - totalpage)

        if(leftlength < 1){
          leftlength = 1
        }
        rightlength = totalpage
      }
      if (leftlength <= 0) {
        rightlength += (1 + Math.abs(leftlength))

        if (rightlength > totalpage) {
        rightlength = totalpage
      }
        leftlength = 1
      }

      for (let i = leftlength; i <= rightlength; i++) {
        if (i == currentpage) {
          paglist.innerHTML += `<li class="page-item active"><a class="page-link" href="#" onclick="toPage(${i})">${i}</a></li>`
        } else {
          paglist.innerHTML += `<li class="page-item"><a class="page-link" href="#" onclick="toPage(${i})">${i}</a></li>`

        }
      }
    }





