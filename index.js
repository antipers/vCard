const path = window.location.pathname.split("/")[1];
/* const tempPath = "bobr"; */

fetch(`./data/mock.json`)
  .then((response) => response.json())
  .then((data) => {
    const person = data.find((d) => d.vCard === path);
    if (person) {
      document.getElementById("avatar_img").src = person.avatar;
      document.getElementById("name").textContent = person.name;
      document
        .querySelectorAll(".title_change")
        .forEach((t) => (t.textContent = person.title));
      document.getElementById("tel").textContent = formatPhoneNumber(
        person.mobilePhone
      );
      document.querySelector(".office_link").textContent = formatPhoneNumber(
        person.officePhone
      );

      document.getElementById("mail").textContent = person.mail;

      document
        .querySelectorAll(".mobile_link")
        .forEach((m) => m.setAttribute("href", `tel:${person.mobilePhone}`));

      document
        .querySelector(".office_link")
        .setAttribute("href", `tel:${person.officePhone}`);

      document
        .querySelectorAll(".mail_link")
        .forEach((m) => m.setAttribute("href", `mailto:${person.mail}`));

      document
        .querySelector(".save_contact_link")
        .setAttribute("href", `./data/cards/${person.vCard}.vcf`);
    }
  })
  .catch((error) => console.error("Какая-то ошибка :(", error));

function formatPhoneNumber(number) {
  const cleaned = number.replace(/\D/g, "");
  return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(
    4,
    7
  )}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
}
