import { withPluginApi } from "discourse/lib/plugin-api";
import { iconHTML } from "discourse-common/lib/icon-library";

export default {
  name: "custom-details",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.decorateCookedElement(
        (element) => {
          const cookedDetails = element.querySelectorAll("details");

          if (!cookedDetails.length) {
            return;
          }

          cookedDetails.forEach((details) => {
            details.setAttribute("open", "");

            const detailsFooter = document.createElement("div");
            detailsFooter.classList.add("details-footer");
            details.appendChild(detailsFooter);

            const detailsShowMoreSpan = document.createElement("span");
            detailsShowMoreSpan.classList.add("details-show-more");
            detailsFooter.appendChild(detailsShowMoreSpan);

            const createButtonContent = (textKey, iconName) => {
              const textSpan = document.createElement("span");
              textSpan.textContent = I18n.t(themePrefix(textKey));
              detailsShowMoreSpan.appendChild(textSpan);

              const iconSpan = document.createElement("span");
              iconSpan.innerHTML = iconHTML(iconName);
              detailsShowMoreSpan.appendChild(iconSpan);
            };

            createButtonContent('expand_details', 'angle-down');

            detailsShowMoreSpan.addEventListener("click", () => {
              details.toggleAttribute("expanded");
              detailsShowMoreSpan.innerHTML = ""; // Clear previous content

              createButtonContent(
                details.hasAttribute("expanded") ? 'collapse_details' : 'expand_details',
                details.hasAttribute("expanded") ? 'angle-up' : 'angle-down'
              );
            });
          });
        },
        { id: "custom-details" }
      );
    });
  },
};
