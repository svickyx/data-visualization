const input = document.querySelector("input");
const cardContainer = document.querySelector(".card-container");
const loader = document.querySelector(".loader");
//item list
let itemArray = [];
//search
input.addEventListener("keyup", (e) => {
  const inputV = e.target.value.trim("");
  if (!inputV) {
    return;
  }
  if (!itemArray.length) {
    return;
  }
  const updatedArray = itemArray.filter((item) => {
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      ip_address,
      description,
    } = item;

    return (
      (id && id.includes(inputV)) ||
      (first_name && first_name.includes(inputV)) ||
      (last_name && last_name.includes(inputV)) ||
      (email && email.includes(inputV)) ||
      (gender && gender.toLowerCase() === inputV.toLowerCase()) ||
      (ip_address && ip_address.includes(inputV)) ||
      (description && description.includes(inputV))
    );
  });
  renderCards(updatedArray);
});

const showLoader = () => {
  loader.hidden = false;
  cardContainer.hidden = true;
};

const hideLoader = () => {
  if (!loader.hidden) {
    cardContainer.hidden = false;
    loader.hidden = true;
  }
};

function createCard(item) {
  const card = document.createElement("div");
  const container = document.createElement("div");
  container.className = "card-content";
  card.appendChild(container);
  card.className = "card";
  const idElement = document.createElement("span");
  idElement.textContent = `ID: ${item.id}`;
  idElement.className = "card-span card-100";
  const nameElement = document.createElement("span");
  nameElement.textContent = `Name: ${item.first_name} ${item.last_name}`;
  nameElement.className = "card-span card-50";

  const emailElement = document.createElement("span");
  emailElement.textContent = `Email: ${item.email}`;
  emailElement.className = "card-span card-100";

  const genderElement = document.createElement("span");
  genderElement.textContent = `Gender: ${item.gender}`;
  genderElement.className = "card-span card-50";

  const ipElement = document.createElement("span");
  ipElement.textContent = `IP Address: ${item.ip_address}`;
  ipElement.className = "card-span card-50";

  const logAtElement = document.createElement("span");
  logAtElement.textContent = `Login At: ${moment(item.login_at).format(
    "MM/DD/YYYY, h:mm:ss a"
  )}`;
  logAtElement.className = "card-span card-50";

  const descriptionElement = document.createElement("div");
  const descTitle = document.createElement("div");
  descTitle.className = "card-span card-100";
  descriptionElement.appendChild(descTitle);
  descTitle.textContent = "Description:";
  const descContent = document.createElement("div");
  descriptionElement.appendChild(descContent);
  descContent.textContent = item.description;
  descriptionElement.className = "card-span card-100";

  container.appendChild(idElement);
  container.appendChild(nameElement);
  container.appendChild(genderElement);
  container.appendChild(emailElement);
  container.appendChild(ipElement);
  container.appendChild(logAtElement);
  container.appendChild(descriptionElement);
  return card;
}
function renderCards(itemsArray) {
  cardContainer.innerHTML = "";
  itemsArray.forEach((item) => {
    const card = createCard(item);
    cardContainer.appendChild(card);
  });
}

async function getApi() {
  showLoader();

  const apiUrl = "https://run.mocky.io/v3/9d5f33ec-0d2f-4743-aac9-5aef32f7badf";
  try {
    const response = await fetch(apiUrl);
    itemArray = await response.json();
    renderCards(itemArray);
    hideLoader();
  } catch (error) {
    console.log(error);
  }
}
getApi();
