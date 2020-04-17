function numberGrouping(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function renderHello() {
  var ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", "https://amadaxtreme.mn/product.json");
  // ourRequest.open("GET", "http://localhost:5500/amadaxtreme/product.json");
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    } else {
      console.log("We connected to the server, but it returned an error.");
    }
  };
  ourRequest.onerror = function () {
    console.log("Connection error");
  };
  ourRequest.send();
}
function renderHTML(data) {
  fetch('template.mustache')
    .then((response) => response.text())
    .then((template) => {
      let carsNames = Object.keys(data[0]);
      let tabsName = [];
      let tabContent = [];
      for (i = 0; i < carsNames.length; i++) {
        let aCarName = carsNames[i];
        let aCar = data[0][aCarName];
        var rendered = Mustache.render(template, {
          type: aCarName,
          make: aCar.make,
          model: aCar.model,
          year: aCar.year,
          detail: aCar.detail,
          mainImage: aCarName,
          advfprice: numberGrouping(aCar.adventure.front.price),
          advfsku: aCar.adventure.front.sku,
          advrprice: numberGrouping(aCar.adventure.rear.price),
          advrsku: aCar.adventure.rear.sku,
          expfprice: numberGrouping(aCar.explorerII.front.price),
          expfsku: aCar.explorerII.front.sku,
          exprprice: numberGrouping(aCar.explorerII.rear.price),
          exprsku: aCar.explorerII.rear.sku,
        });
        if (i === 0) {
          tabsName += `<a class="nav-item c-sidebar-nav-link px-4" id="nav-${aCarName}-tab" data-toggle="tab" href="#nav-${aCarName}" role="tab" aria-controls="nav-${aCarName}" aria-selected="true">${aCarName}</a>`;
          tabContent += `<div class="tab-pane fade active show" id="nav-${aCarName}" role="tabpanel" aria-labelledby="nav-${aCarName}-tab">${rendered}</div>`;
        } else {
          tabsName += `<a class="nav-item c-sidebar-nav-link px-4" id="nav-${aCarName}-tab" data-toggle="tab" href="#nav-${aCarName}" role="tab" aria-controls="nav-${aCarName}" aria-selected="true">${aCarName}</a>`;
          tabContent += `<div class="tab-pane fade" id="nav-${aCarName}" role="tabpanel" aria-labelledby="nav-${aCarName}-tab">${rendered}</div>`;
        }
      }
      document.getElementById("nav-tab").innerHTML = tabsName;
      document.getElementById("nav-tabContent").innerHTML = tabContent;
    });
}