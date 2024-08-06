import { withPluginApi } from "discourse/lib/plugin-api";
import { iconHTML } from "discourse-common/lib/icon-library";

export default {
  name: "custom-details",

  initialize() {
    withPluginApi("0.8.7", (api) => {

      api.decorateCookedElement(
        element => {
          const cookedDetails = element.querySelectorAll("details");

          if (!cookedDetails.length) {
            return;
          }

          cookedDetails.forEach((details) => {
            details.setAttribute("open", "");

            const detailsShowMoreDiv = document.createElement("div");
            detailsShowMoreDiv.classList.add("details-footer");
            details.appendChild(detailsShowMoreDiv);

            const detailsShowMoreSpan = document.createElement("span");
            detailsShowMoreSpan.classList.add("details-show-more");
            detailsShowMoreDiv.appendChild(detailsShowMoreSpan);

            let showMoreText = `<span>${I18n.t(themePrefix('expand_details'))}</span>`;
            let showMoreIcon = iconHTML("angle-down");
            detailsShowMoreSpan.innerHTML = showMoreText;
            detailsShowMoreSpan.innerHTML += showMoreIcon;
            
            detailsShowMoreSpan.addEventListener("click", () => {
              details.toggleAttribute("expanded");

              if (details.hasAttribute("expanded")) {
                let showLessText = `<span>${I18n.t(themePrefix('collapse_details'))}</span>`;
                let showLessIcon = iconHTML("angle-up");
                detailsShowMoreSpan.innerHTML = showLessText;
                detailsShowMoreSpan.innerHTML += showLessIcon;
              } else {
                let showMoreText = `<span>${I18n.t(themePrefix('expand_details'))}</span>`;
                let showMoreIcon = iconHTML("angle-down");
                detailsShowMoreSpan.innerHTML = showMoreText;
                detailsShowMoreSpan.innerHTML += showMoreIcon;
              }
            });
          });
        },
        { id: "custom-details" }
      );
    });
  },
};
