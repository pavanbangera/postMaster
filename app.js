// addParamsCount
let addParamsCount = 0;

// getParamsString
function getParamsString (string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

// logic for requestBox
document.getElementById("requestParamsBox").style.display = "none";
document.getElementById("requestJsonBox").style.display = "none";
document.getElementById("requestTypeBox").style.display = "none";
let methodTypePost = document.getElementById("post");
methodTypePost.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "block";
  document.getElementById("requestTypeBox").style.display = "block";
});
let methodTypeGet = document.getElementById("get");
methodTypeGet.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("requestTypeBox").style.display = "none";
});

let requestParamsRadio = document.getElementById("requestParamsRadio");
requestParamsRadio.addEventListener("click", () => {
  document.getElementById("requestParamsBox").style.display = "block";
  document.getElementById("requestJsonBox").style.display = "none";
});
let requestJsonRadio = document.getElementById("requestJsonRadio");
requestJsonRadio.addEventListener("click", () => {
  document.getElementById("requestParamsBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});
// ---------------------------

// logic for Params add/delete Box
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
  let params = document.getElementById("params");
  string = ` <div class="d-flex flex-col  mb-1">
                <label for="requestParamsBox" class="col-sm-2 col-form-label ">PARAMS${addParamsCount + 2
    }</label>
                <div class="form-group col-md-4">
                    <input type="text" class="form-control" id="requestParamsKey${addParamsCount + 2
    }" placeholder="Params Key${addParamsCount + 2}" >
                </div>
                <div class="form-group col-md-4">
                    <input type="text" class="form-control" id="requestParamsValue${addParamsCount + 2
    }" placeholder="Params Value${addParamsCount + 2}"
                        >
                </div>
                
                    <button  class="btn btn-danger deleteParam">-</button>
               
            </div>`;
  let paramsElement = getParamsString(string);
  params.appendChild(paramsElement);
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addParamsCount++;
});

// logic for SunmitBtn
let submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  // let responseText = (document.getElementById("responseText").value =
  //   "Please wait......Fectching.....");
  let responseText = (document.getElementById("responseText").innerHTML =
    "Please wait......Fectching.....");
  let url = document.getElementById("url").value;
  let method = document.querySelector(
    "input[name=requestMethod]:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name=requestType]:checked"
  ).value;

  // if checked params
  if (contentType == "params") {
    data = {};
    for (i = 0; i < addParamsCount + 1; i++) {
      // this condition skip the deleted params
      if (document.getElementById("requestParamsKey" + (i + 1)) != undefined) {
        let key = document.getElementById("requestParamsKey" + (i + 1)).value;
        let value = document.getElementById(
          "requestParamsValue" + (i + 1)
        ).value;
        data[key] = value;
      }
    }
    // data covert to string
    data = JSON.stringify(data);
  }
  // else checked json
  else {
    data = document.getElementById("requestJsonText").value;
  }
  // debugging
  console.log("URL is :" + url);
  console.log("Method is :" + method);
  console.log("type is :" + contentType);
  console.log("Data is :" + data);

  if (method == "GET") {
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        // document.getElementById("responseText").value = text;
        document.getElementById("responseText").innerHTML = text;
      });
  } else {
    let post = {
      method: "POST",
      Headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: data,
    };
    fetch(url, post)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        // document.getElementById("responseText").value = text;
        document.getElementById("responseText").innerHTML = text;
      });
  }
});
