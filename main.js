let errorMessage = "";
const mainDiv = document.getElementById("url-append");
const BASE_URL = "https://rel.ink/api/links/";
let clipboard = new ClipboardJS(".btn-copy");
let inputUrl = document.getElementById("url-input");

//clean input
const cleanInput = () => {
  inputUrl.value = "";
};

//reset the input border color
const resetInputBorder = () => {
  inputUrl.classList.remove("error");
  document.getElementById("error-message").classList.add("hidden");
};

//create div for successful response and append it to the DOM
const createDiv = (url) => {
  let div = document.createElement("div");
  div.innerHTML = `
  <div class="urlForm__success" id="url-result">
  <div><p>${url.url}</p></div>
          <div><a href="https://rel.ink/${url.hashid}">https://rel.ink/${url.hashid}</a></div>
          <div><button data-clipboard-text="https://rel.ink/${url.hashid}" class="btn-cta btn-submit btn-copy">Copy</button></div></div>
 `;
  mainDiv.appendChild(div);
};
//create div for error response and append it to the DOM
const errorMsg = (errorMessage) => {
  document.getElementById("error-message").classList.remove("hidden");
  document
    .querySelector(".urlForm__container-form form input[type=text]")
    .classList.add("error");
};

document.getElementById("urlForm__form").addEventListener("submit", (e) => {
  //prevent page from refreshing when click submit
  e.preventDefault();
  //take value of input
  const urlValue = inputUrl.value;
  //fire the get url post request
  console.log(urlValue);
  getUrl(urlValue).then((url) => {
    //if the request is successful
    if (url) {
      // append the respond to the DOM (in a div)
      createDiv(url);
      cleanInput();
      resetInputBorder();
    }
    //if there is an error
    else {
      //append the error message in a div

      errorMsg();
      cleanInput();
    }
  });
});

//AXIOS POST REQUEST
const getUrl = async (urlValue) => {
  try {
    //make the post request
    const res = await axios.post(`${BASE_URL}`, {
      url: `https://${urlValue}`,
    });
    const url = res.data;

    //if the request is successful, return the response
    return url;
  } catch (e) {
    //if there is an error, save it in a globe variable called errorMessage
    errorMessage = e.response.data.url[0];
  }
};

//COPY URL
clipboard.on("success", function (e) {
  console.log(e);
});

clipboard.on("error", function (e) {
  console.log(e);
});

////TOGGLE MOBILE MENU
document.getElementById("burger").addEventListener("click", () => {
  const navMenu = document.querySelector(".nav__mobile");
  navMenu.classList.toggle("menu__hidden");
});
